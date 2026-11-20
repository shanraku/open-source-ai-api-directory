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
