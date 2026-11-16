import { askOpenRouter } from "../src/openrouter.js";

async function main(): Promise<void> {
  const answer = await askOpenRouter(
    'Reply with exactly: "Quantum Registry connected to OpenRouter."'
  );

  console.log("OpenRouter response:");
  console.log(answer);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unexpected OpenRouter error";
  console.error(`[openrouter] ${message}`);
  process.exitCode = 1;
});
