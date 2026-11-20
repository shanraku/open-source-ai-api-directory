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


## Model discovery sync
The scheduled model sync currently uses three public discovery endpoints:
- OpenRouter public model catalogue: https://openrouter.ai/api/v1/models
- Hugging Face Hub public model metadata: https://huggingface.co/api/models?limit=100&sort=downloads&direction=-1&full=true

The first is a gateway-specific catalogue; the second is a bounded sample of popular Hub models, not a complete export. Neither source is a universal inventory. The sync stores source IDs, upstream IDs, source URLs, selected public metadata, refresh timestamps and explicit discovery-only confidence. It does not infer open-source status, legal compatibility, safety, quality, regional availability or current price.

License metadata is only copied from a public model card field when present. Missing metadata remains explicitly unknown. Model cards and linked license files must still be reviewed. If an upstream source fails, prior records from that source are retained with a stale marker; successful source refreshes replace that source's snapshot.

Do not add endpoints that require private tokens to a public workflow without a security review. Do not store credentials in the data catalogue. Respect provider terms, API rate limits, pagination and attribution requirements.


## Source health dashboard
The website's Source health section separates two different signals:
- Model-discovery results from each adapter in `data/discovered-models.json`, including success/failure, record count and check timestamp.
- Provider URL reachability from `data/source-status.json`, which is an HTTP HEAD check against configured provider URLs.

A registry entry without a discovery result is shown as “Not checked”; it must not be interpreted as offline. A failed HTTP request may reflect a blocked HEAD method, rate limit, CI network restriction or temporary outage. These signals do not verify API functionality, pricing correctness, model quality, regional access or account entitlements. Always follow the upstream source link for authoritative details.
