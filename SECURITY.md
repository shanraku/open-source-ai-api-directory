# Security Policy

Do not publish exploitable vulnerabilities, private information or secrets in public issues. Use GitHub private vulnerability reporting for this repository if available; otherwise contact the maintainer privately through GitHub.

## Security boundaries
- This static directory must never request provider API keys.
- Never commit tokens, passwords, private keys or personal data.
- External links should use HTTPS where supported and safe rel attributes.
- Source checks remain unauthenticated and limited to public URLs.
- Do not send user prompts, files or credentials to third parties.
- Treat catalogue content as untrusted text and escape it before rendering.

Reports should include affected path, impact and safe reproduction details.