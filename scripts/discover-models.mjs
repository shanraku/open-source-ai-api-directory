import { readFile, writeFile } from "node:fs/promises";

const outputUrl = new URL("../data/discovered-models.json", import.meta.url);
const previous = await readFile(outputUrl, "utf8").then(JSON.parse).catch(() => ({ models: [] }));
const byId = new Map((previous.models || []).map(model => [model.id, model]));
const results = [];
const now = new Date().toISOString();

async function getJson(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "ModelAtlas-Discovery/1.0", accept: "application/json" },
    signal: AbortSignal.timeout(25000)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
function safeUrl(value) {
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : ""; }
  catch { return ""; }
}
function put(model) {
  if (!model.id || !model.name || !model.source_url) return;
  const existing = byId.get(model.id);
  results.push({ ...existing, ...model, discovered_at: existing?.discovered_at || now, refreshed_at: now });
}

const sourceStatus = {};
try {
  const payload = await getJson("https://openrouter.ai/api/v1/models");
  const list = Array.isArray(payload.data) ? payload.data : [];
  for (const item of list) {
    const id = String(item.id || "");
    if (!id) continue;
    put({
      id: "openrouter:" + id.toLowerCase(),
      name: item.name || id,
      provider: (id.split("/")[0] || "OpenRouter"),
      source: "openrouter",
      source_url: "https://openrouter.ai/models/" + encodeURIComponent(id),
      upstream_id: id,
      description: String(item.description || "").slice(0, 500),
      context_length: Number.isFinite(item.context_length) ? item.context_length : null,
      modality: item.architecture?.modality || null,
      license: "Not specified by this discovery record; verify upstream model terms",
      license_url: "",
      pricing_reference: "Check the provider and model page for current pricing",
      evidence: "OpenRouter public model catalogue",
      confidence: "discovery-only"
    });
  }
  sourceStatus.openrouter = { ok: true, records: list.length, checked_at: now };
} catch (error) {
  sourceStatus.openrouter = { ok: false, error: error.message, checked_at: now };
}

try {
  const list = await getJson("https://huggingface.co/api/models?limit=100&sort=downloads&direction=-1&full=true");
  if (!Array.isArray(list)) throw new Error("Unexpected API response");
  for (const item of list) {
    const id = String(item.modelId || item.id || "");
    if (!id) continue;
    const card = item.cardData || {};
    const modelUrl = safeUrl("https://huggingface.co/" + id);
    put({
      id: "huggingface:" + id.toLowerCase(),
      name: id,
      provider: id.includes("/") ? id.split("/")[0] : "Hugging Face community",
      source: "huggingface-hub",
      source_url: modelUrl,
      upstream_id: id,
      description: String(card.description || "").slice(0, 500),
      context_length: null,
      modality: item.pipeline_tag || null,
      license: card.license || "Not declared in API metadata; inspect model card and files",
      license_url: "",
      pricing_reference: "Repository may be downloadable; hosted inference availability is separate",
      evidence: "Hugging Face Hub public model metadata",
      confidence: "discovery-only",
      downloads: Number.isFinite(item.downloads) ? item.downloads : null,
      likes: Number.isFinite(item.likes) ? item.likes : null,
      last_modified: item.lastModified || null
    });
  }
  sourceStatus["huggingface-hub"] = { ok: true, records: list.length, checked_at: now };
} catch (error) {
  sourceStatus["huggingface-hub"] = { ok: false, error: error.message, checked_at: now };
}

// Keep previously discovered records when an upstream temporarily fails.
// Mark their source state so stale records are not mistaken for fresh ones.
for (const [id, model] of byId) {
  if (!results.some(item => item.id === id)) {
    const source = model.source;
    if (sourceStatus[source]?.ok === false) results.push({ ...model, stale: true });
  }
}
results.sort((a, b) => a.name.localeCompare(b.name));
const output = {
  schema_version: 1,
  generated_at: now,
  refresh_policy: "Weekly discovery snapshot. Records are discovery leads, not endorsements or legal/license verification.",
  source_status: sourceStatus,
  total: results.length,
  models: results
};
await writeFile(outputUrl, JSON.stringify(output, null, 2) + "\n");
console.log(`Saved ${results.length} discovered model records.`);
if (!Object.values(sourceStatus).some(status => status.ok)) {
  console.error("All discovery sources failed; previous records were retained where available.");
  process.exitCode = 1;
}
