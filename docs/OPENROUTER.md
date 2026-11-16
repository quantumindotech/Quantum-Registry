# OpenRouter integration

This repository uses the official TypeScript SDK, `@openrouter/sdk`, from the server-side Node.js runtime.

## Configure credentials

1. Create an API key at https://openrouter.ai/keys.
2. Copy `.env.example` to `.env`.
3. Set `OPENROUTER_API_KEY` in `.env`.
4. Keep `.env` local. It is ignored by Git; only the empty `.env.example` template is tracked.

Optional model override:

```dotenv
OPENROUTER_MODEL=openai/gpt-5.2
```

Use a model slug from https://openrouter.ai/models.

## Install and run

Requires Node.js 22 or newer.

```bash
npm install
npm run typecheck
npm run test:openrouter
```

The smoke test sends one prompt through OpenRouter and prints the returned text. It exits non-zero with a diagnostic message if the key is missing, the request fails, or no text is returned.

## Security

- The API key is read only from `process.env.OPENROUTER_API_KEY`.
- Do not hard-code, log, commit, or expose the key to browser/client-side code.
- Never enable SDK request debug logging in production; request logs can contain authorization headers.
- Set a usage limit for the key in the OpenRouter dashboard.
