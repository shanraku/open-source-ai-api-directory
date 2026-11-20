import { readFile, writeFile } from "node:fs/promises";
const providers = JSON.parse(await readFile(new URL("../data/providers.json", import.meta.url), "utf8"));
const sources = {};
for (const p of providers) {
  const url = p.status_url || p.source_url;
  if (!url) continue;
  const checkedAt = new Date().toISOString();
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(12000), headers: { "user-agent": "ModelAtlas-SourceChecker/1.0" } });
    sources[p.id] = { result: response.ok ? "Reachable" : "HTTP " + response.status, http_status: response.status, checked_at: checkedAt, checked_url: url };
  } catch (error) {
    sources[p.id] = { result: "Check failed", error: error.name === "TimeoutError" ? "Timeout" : "Network or endpoint restriction", checked_at: checkedAt, checked_url: url };
  }
}
const output = { generated_at: new Date().toISOString(), note: "HTTP reachability only; this does not establish API uptime, model availability or service quality.", sources };
await writeFile(new URL("../data/source-status.json", import.meta.url), JSON.stringify(output, null, 2) + "\n");
console.log("Updated source reachability for " + Object.keys(sources).length + " URLs.");