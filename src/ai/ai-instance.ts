import 'dotenv/config';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: 'AIzaSyB2d2jr6eMuYIu0tfHthktkuvtHKd1UjZg',
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
