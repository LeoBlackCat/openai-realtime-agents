import { AgentConfig } from "@/app/types";
import { injectTransferTools } from "./utils";

const malayLanguageLearning: AgentConfig = {
  name: "Malay Language Learning Assistant",
  publicDescription: "A helpful assistant for learning Bahasa Melayu (Malay language), providing translations, explanations, and practice exercises.",
  instructions: `You are a friendly and patient Malay language learning assistant. Your role is to help users learn Bahasa Melayu (Malay language) through:
1. Providing accurate translations between English and Malay
2. Explaining grammar rules and sentence structures
3. Teaching common phrases and vocabulary
4. Creating practice exercises
5. Explaining cultural context when relevant
6. Correcting mistakes gently and providing explanations

Always maintain a supportive and encouraging tone. When users make mistakes, explain the correct usage and why it's important. Include pronunciation guides using phonetic spelling when introducing new words.

For translations, always provide:
- The word/phrase in Malay
- The pronunciation guide
- The English translation
- Example usage in a sentence (if applicable)
- Any relevant grammar notes

Remember that Malay has formal and informal registers, so indicate the appropriate context for each phrase.`,
  tools: [
    {
      type: "function",
      name: "translate",
      description: "Translate text between English and Malay, with pronunciation guide and usage examples",
      parameters: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "The text to translate",
          },
          direction: {
            type: "string",
            description: "Translation direction",
            enum: ["english_to_malay", "malay_to_english"],
          },
          includePronunciation: {
            type: "boolean",
            description: "Whether to include pronunciation guide",
          },
          includeExamples: {
            type: "boolean",
            description: "Whether to include example sentences",
          },
        },
        required: ["text", "direction"],
      },
    },
    {
      type: "function",
      name: "explainGrammar",
      description: "Explain Malay grammar rules and structures",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "The grammar topic to explain (e.g., 'tenses', 'pronouns', 'sentence structure')",
          },
          level: {
            type: "string",
            description: "Difficulty level",
            enum: ["beginner", "intermediate", "advanced"],
          },
        },
        required: ["topic", "level"],
      },
    },
    {
      type: "function",
      name: "createExercise",
      description: "Create a practice exercise for learning Malay",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: "Type of exercise",
            enum: ["translation", "fill_in_blank", "multiple_choice", "conversation"],
          },
          topic: {
            type: "string",
            description: "Topic or theme of the exercise",
          },
          difficulty: {
            type: "string",
            description: "Difficulty level",
            enum: ["beginner", "intermediate", "advanced"],
          },
        },
        required: ["type", "topic", "difficulty"],
      },
    },
    {
      type: "function",
      name: "explainCulturalContext",
      description: "Explain cultural context and usage of Malay phrases or expressions",
      parameters: {
        type: "object",
        properties: {
          phrase: {
            type: "string",
            description: "The Malay phrase or expression to explain",
          },
          context: {
            type: "string",
            description: "The specific cultural context to explain",
          },
        },
        required: ["phrase"],
      },
    },
  ],
};

// Create a practice partner agent
const malayPracticePartner: AgentConfig = {
  name: "Malay Practice Partner",
  publicDescription: "A conversational partner for practicing Malay language skills",
  instructions: `You are a friendly Malay language practice partner. Your role is to:
1. Engage in natural conversations in Malay
2. Help users practice their speaking and comprehension skills
3. Provide gentle corrections and explanations
4. Adjust your language level based on the user's proficiency
5. Introduce new vocabulary and phrases naturally in conversation

Always maintain a supportive and encouraging tone. When users make mistakes, explain the correct usage and why it's important.`,
  tools: [],
  downstreamAgents: [malayLanguageLearning],
};

// Add the transfer tool to point to downstream agents
const agents = injectTransferTools([malayPracticePartner, malayLanguageLearning]);

export default agents; 