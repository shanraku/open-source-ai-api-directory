# Sources and methodology

## Source priority
1. Provider API documentation and official changelogs.
2. Official model cards, model repositories and license files.
3. Official status pages and incident histories.
4. Standards bodies and primary research for technical claims.
5. Independent evaluations only when their methodology and date are visible.

## Initial official sources
- OpenAI: https://platform.openai.com/docs
- Anthropic: https://docs.anthropic.com/
- Google Gemini: https://ai.google.dev/gemini-api/docs
- Mistral: https://docs.mistral.ai/
- Cohere: https://docs.cohere.com/
- Hugging Face: https://huggingface.co/docs
- Ollama: https://docs.ollama.com/
- llama.cpp: https://github.com/ggml-org/llama.cpp
- vLLM: https://docs.vllm.ai/
- ModelScope: https://www.modelscope.cn/

## Automated check meaning
The scheduled script sends an unauthenticated HTTP HEAD request to a listed status page, or official documentation if no status page is listed. It records response category, timestamp and URL. It does not authenticate, call inference endpoints, measure latency, validate content, scrape prices or infer model availability. Some servers do not support HEAD; failures are inconclusive.

## Data quality rules
- Never infer a model license from provider general terms.
- Link model-level cards and license files when adding individual models.
- Do not label a model open source unless license and artifact availability support that wording; use open-weight when appropriate.
- Do not publish prices without currency, unit, modality, effective date and direct official pricing source.
- Do not call something free without specifying eligibility, quota and region.
- Distinguish provider uptime from public website reachability.
- Date-stamp reviews and remove dead or misleading entries.

This is a community discovery directory, not a benchmark authority, uptime monitor, legal opinion or endorsement.

## Additional official provider documentation
- Groq: https://console.groq.com/docs
- Together AI: https://docs.together.ai/
- Fireworks AI: https://docs.fireworks.ai/
- DeepSeek: https://api-docs.deepseek.com/
- OpenRouter: https://openrouter.ai/docs
- Replicate: https://replicate.com/docs
- Cloudflare Workers AI: https://developers.cloudflare.com/workers-ai/
- Amazon Bedrock: https://docs.aws.amazon.com/bedrock/
- Microsoft Azure AI Foundry: https://learn.microsoft.com/azure/ai-foundry/
- NVIDIA NIM: https://docs.nvidia.com/nim/
- xAI API: https://docs.x.ai/docs
- Perplexity API: https://docs.perplexity.ai/

## Discovery cross-checks (not primary evidence)
- Hugging Face Inference Providers partner overview: https://huggingface.co/docs/inference-providers/en/index
- Vercel AI Gateway provider catalogue: https://vercel.com/ai-gateway/models/providers

These cross-check pages help discover additional providers and integrations. Individual entries should still link to the provider's own official documentation. Partner listings do not establish price, uptime, model rights or universal feature support.


## Global discovery registries and provider ecosystems
These are discovery inputs, not substitutes for primary provider evidence:

- Models.dev live catalogue and API: https://models.dev/ — open-source structured provider/model database; API examples include https://models.dev/api.json?type=all, https://models.dev/models.json?type=all and https://models.dev/catalog.json?type=all.
- Hugging Face Inference Providers: https://huggingface.co/docs/inference-providers/en/providers — provider integration index; each provider's own docs remain the authority for its terms.
- OpenRouter model catalogue and rankings: https://openrouter.ai/models and https://openrouter.ai/rankings — useful for model/provider discovery and usage-based rankings, not universal market share.
- Hugging Face Hub API: https://huggingface.co/docs/hub/api — model, dataset and organization discovery; repository metadata and model cards must be checked individually.
- Artificial Analysis: https://artificialanalysis.ai/ — independent model evaluations and comparisons; methodology, coverage and access conditions must be reviewed.
- LMArena: https://lmarena.ai/ — human-preference evaluation context; rankings are not a substitute for task-specific testing.

### Additional provider documentation discovered through the Hugging Face ecosystem
- Baseten: https://docs.baseten.co/
- Cerebras: https://inference-docs.cerebras.ai/
- CoreWeave: https://docs.coreweave.com/
- DeepInfra: https://deepinfra.com/docs
- DigitalOcean Gradient AI: https://docs.digitalocean.com/products/gradient-ai/
- Featherless AI: https://docs.featherless.ai/
- Liquid AI: https://docs.liquid.ai/
- Moonshot AI: https://platform.moonshot.ai/docs/
- Nebius AI: https://docs.nebius.com/
- Novita AI: https://novita.ai/docs
- Parasail: https://docs.parasail.io/
- Prime Intellect: https://docs.primeintellect.ai/
- Reka AI: https://docs.reka.ai/
- Tencent Hunyuan: https://cloud.tencent.com/document/product/1729
- Z.ai / Zhipu AI: https://docs.z.ai/

Do not infer a provider's country, ownership, legal jurisdiction, model license or data residency from its name. Add those fields only when supported by a direct authoritative source.
