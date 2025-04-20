'use server';
/**
 * @fileOverview A flow to answer user queries.
 *
 * - answerUserQuery - A function that handles the user query and returns an answer.
 * - AnswerUserQueryInput - The input type for the answerUserQuery function.
 * - AnswerUserQueryOutput - The return type for the answerUserQuery function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnswerUserQueryInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type AnswerUserQueryInput = z.infer<typeof AnswerUserQueryInputSchema>;

const AnswerUserQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query in Markdown format.'),
});
export type AnswerUserQueryOutput = z.infer<typeof AnswerUserQueryOutputSchema>;

export async function answerUserQuery(input: AnswerUserQueryInput): Promise<AnswerUserQueryOutput> {
  return answerUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerUserQueryPrompt',
  input: {
    schema: z.object({
      query: z.string().describe('The user query.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the user query in Markdown format.'),
    }),
  },
  prompt: `You are a helpful assistant. Please answer the following user query, format your response using markdown:\n\nQuery: {{{query}}}`,
});

const answerUserQueryFlow = ai.defineFlow<
  typeof AnswerUserQueryInputSchema,
  typeof AnswerUserQueryOutputSchema
>({
  name: 'answerUserQueryFlow',
  inputSchema: AnswerUserQueryInputSchema,
  outputSchema: AnswerUserQueryOutputSchema,
},
async input => {
  try {
    const {output} = await prompt(input);
    return output!;
  } catch (e) {
    console.error('First attempt to answer query failed, retrying', e);
    // Retry once
    const {output} = await prompt(input);
    return output!;
  }
});


