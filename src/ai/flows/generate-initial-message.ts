'use server';

/**
 * @fileOverview A flow that generates an initial greeting message for new users.
 *
 * - generateInitialMessage - A function that generates the greeting message.
 * - GenerateInitialMessageInput - The input type for the generateInitialMessage function (empty).
 * - GenerateInitialMessageOutput - The return type for the generateInitialMessage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';


const GenerateInitialMessageInputSchema = z.object({});
export type GenerateInitialMessageInput = z.infer<typeof GenerateInitialMessageInputSchema>;

const GenerateInitialMessageOutputSchema = z.object({
  message: z.string().describe('The initial greeting message.'),
});
export type GenerateInitialMessageOutput = z.infer<typeof GenerateInitialMessageOutputSchema>;

export async function generateInitialMessage(
  input: GenerateInitialMessageInput
): Promise<GenerateInitialMessageOutput> {
  return generateInitialMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialMessagePrompt',
  input: {
    schema: z.object({}),
  },
  output: {
    schema: z.object({
      message: z.string().describe('The initial greeting message.'),
    }),
  },
  prompt: `You are a helpful assistant for a messaging platform.

  Generate a friendly and informative initial greeting message for a new user.
  The message should introduce the assistant and explain its capabilities, such as answering FAQs and simple commands.
  Keep the message concise and engaging.

  Output the message in a single string in the 'message' field.`,
});

const generateInitialMessageFlow = ai.defineFlow<
  typeof GenerateInitialMessageInputSchema,
  typeof GenerateInitialMessageOutputSchema
>(
  {
    name: 'generateInitialMessageFlow',
    inputSchema: GenerateInitialMessageInputSchema,
    outputSchema: GenerateInitialMessageOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
