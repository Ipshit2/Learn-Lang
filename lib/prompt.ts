import { MODES } from "@/lib/modes";

type PromptInput = {
  language: string
  mode: string
  filters: Record<string, string[]>
}

export function buildPrompt({
  language,
  mode,
  filters,
}: PromptInput) {
  const modeConfig = MODES[mode as keyof typeof MODES]

  if (!modeConfig) {
    throw new Error(`Invalid mode: ${mode}`)
  }

  const outputFields = modeConfig.output
    .map((field) => `"${field}": "<${field}>"`)
    .join(",\n    ");

  return `
You are an expert language learning assistant.

Your task is to generate high-quality practice content for language learners.

INPUT:
- Language: ${language}
- Mode: ${mode}
- Filters: ${JSON.stringify(filters)}

MODE BEHAVIOR:
${modeConfig.smallprompt}

GENERAL INSTRUCTIONS:
- Generate useful, real-world vocabulary or sentences
- Content should feel natural and commonly used
- Avoid rare, outdated, or overly complex words unless filters specify
- Respect filters strictly (level, script, difficulty, etc.)
- If multiple filters are provided, satisfy ALL of them

OUTPUT RULES (VERY STRICT):
- Return ONLY valid JSON
- Do NOT include markdown (no \`\`\`)
- Do NOT include explanations or extra text
- Do NOT include comments
- Do NOT include trailing commas
- Use EXACT field names as defined
- Maintain consistent structure for every item

QUANTITY:
- Generate at least 10 items

OUTPUT FORMAT:

[
  {
    ${outputFields}
  }
]

QUALITY RULES:
- Keep meanings clear and concise
- Keep pronunciation accurate and readable in Latin script (if applicable)
- Avoid duplicate entries
- Ensure all items are unique
- Prefer beginner-friendly words unless filters specify otherwise

FINAL CHECK BEFORE OUTPUT:
- Is it valid JSON? (No markdown, no text outside JSON)
- Does every object follow the exact structure?
- Are there at least 10 items?
`;
}