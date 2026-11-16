import { OpenRouter } from "@openrouter/sdk";

const DEFAULT_MODEL = "openai/gpt-5.2";

export function createOpenRouterClient(): OpenRouter {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Create a key at https://openrouter.ai/keys, " +
      "then place it in your local .env file. Never commit that file."
    );
  }

  return new OpenRouter({ apiKey });
}

export async function askOpenRouter(prompt: string): Promise<string> {
  const client = createOpenRouterClient();
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  try {
    const response = await client.chat.send({
      chatGenerationParams: {
        model,
        messages: [{ role: "user", content: prompt }],
      },
    });

    const text = response.choices?.[0]?.message?.content;
    if (typeof text !== "string" || text.length === 0) {
      throw new Error("OpenRouter returned no text content.");
    }

    return text;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`OpenRouter request failed (model: ${model}): ${detail}`);
  }
}
