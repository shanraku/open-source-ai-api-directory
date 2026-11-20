# Open Source AI & Model Intelligence

**ModelAtlas** is a source-first directory for discovering hosted AI APIs, open model ecosystems and local inference runtimes.

It differs from a consumer AI-tools list: the focus is technical decision-making—official API documentation, model ecosystems, local runtimes, source provenance and transparent source reachability checks.

## Principles
- Prefer official documentation, model cards and license texts.
- Never invent prices, quotas, benchmarks, uptime claims or license conclusions.
- Link to authoritative sources so users can verify changing details.
- Include local inference options alongside hosted APIs.
- No API proxy, account system, tracking pixels or credential collection.

## Automatic source checks
A GitHub Actions workflow runs weekly and can also be started manually from the Actions tab. It checks a public status page when listed, otherwise official documentation, using HTTP HEAD requests. It writes a timestamped snapshot to data/source-status.json.

A reachable webpage is not proof that an API is operational, that a model is available to your account, or that latency/quality is good. Some sites reject HEAD requests or block CI networks. A failed check is inconclusive. This workflow does not scrape pricing or make model API calls.

GitHub may delay scheduled workflows. No paid service is required by this repository, but GitHub service limits apply.

## Run locally
Requires Node.js 20 or newer. Serve this folder using a static file server; browser fetch may not work with file:// URLs. Refresh the snapshot manually with:

    node scripts/check-sources.mjs

## Contributing
See CONTRIBUTING.md, SECURITY.md and docs/SOURCES-AND-METHODOLOGY.md. Add providers only with authoritative links. Model-level licenses must be checked individually.

## License
MIT applies to original project code. Provider names, models, documentation and trademarks belong to their respective owners. Inclusion is not endorsement; model and dataset licenses are separate.

This is a community-maintained discovery directory, not a benchmark authority, uptime monitor, legal opinion or endorsement.

## Global discovery coverage
The project maintains a machine-readable registry of upstream discovery sources in `data/discovery-sources.json`. It includes structured model/provider catalogues, model hubs, inference-provider indexes, cloud model gardens and independent evaluation sources.

These sources are deliberately not merged into one unqualified "complete world list": their coverage overlaps, schemas differ, and many are not primary sources. Use them to discover entries, deduplicate by canonical model/provider identifiers, and verify pricing, licenses, availability and technical claims against official documentation.

The catalogue currently contains **37 manually curated provider/platform entries**. The upstream registries expand discovery beyond this starter set; they are not all represented as individual entries yet.


## Global model discovery and automatic sync
The model catalogue is refreshed by `.github/workflows/refresh-model-catalogue.yml` every Monday and can be started manually from GitHub Actions. The workflow currently imports public discovery metadata from:
- OpenRouter public model catalogue: `https://openrouter.ai/api/v1/models`
- Models.dev structured model catalogue: `https://models.dev/models.json?type=all`
- Hugging Face Hub public model metadata: `https://huggingface.co/api/models?limit=100&sort=downloads&direction=-1&full=true`

The script writes `data/discovered-models.json`; the website displays a searchable snapshot. Hugging Face's current query is a bounded popular-model sample, **not the entire Hub**. OpenRouter is only the catalogue available through OpenRouter, not every model worldwide.

Records are labelled discovery-only. Missing license metadata is shown as unknown/unverified; context length and modality appear only when returned by upstream metadata. A model appearing in a catalogue does not mean it is free, open source, safe, available in every country, or available through every provider. Verify license, model card, pricing, data handling, region and terms at the original source before use.

The workflow needs no API key for these public endpoints. Upstream rate limits, network restrictions and GitHub Actions scheduling can delay or prevent updates. If a source temporarily fails, its previous records are retained and marked stale; a successful refresh replaces that source's current snapshot. No user prompts, credentials, private files or API keys are sent to discovery sources.

Run manually with Node.js 20 or newer:

    node scripts/discover-models.mjs

This command makes public HTTP requests; it is separate from the static website. Do not run it in an offline environment.
