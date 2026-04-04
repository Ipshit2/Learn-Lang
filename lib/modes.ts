export const MODES = {
  reading: {
    id: "reading",
    type: "word",

    title: "Reading",
    description: "Convert words to pronunciation",

    output: ["word", "meaning","pronunciation"],

    smallprompt: `
    The user will see a word in target language and must type it's pronunciation.

    - "word" = word in target language
    - "meaning" = English meaning
    -"pronunciation" = phonetic pronunciation in Latin script
    `,
  },

  recognition: {
    id: "recognition",
    type: "word",

    title: "Recognition",
    description: "Understand meanings",

    output: ["word", "meaning"],

    smallprompt: `
    The user will see a word and must identify its meaning.

    - "word" = word in target language
    - "meaning" = translation in native language
    `,
    },

  recall: {
    id: "recall",
    type: "word",

    title: "Recall",
    description: "Test your memory",

    output: ["meaning", "word"],

    smallprompt: `
    The user will see a meaning and must recall the correct word.

    - "meaning" = English meaning
    - "word" = correct word in target language
    `,
  },

  sentence: {
    id: "sentence",
    type: "sentence",

    title: "Sentence",
    description: "Understand full sentences",
    example: "Sentence → Meaning",

    input: "sentence",

    output: ["sentence", "meaning"],

    smallprompt: `
The user will practice full sentences.

- "sentence" = sentence in target language
- "meaning" = English translation
`,
  },
}