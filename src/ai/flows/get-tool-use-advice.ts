'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing tool use advice.
 *
 * - getToolUseAdvice - A function that returns advice on how to use the tools on the platform.
 * - GetToolUseAdviceInput - The input type for the getToolUseAdvice function.
 * - GetToolUseAdviceOutput - The return type for the getToolUseAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetToolUseAdviceInputSchema = z.object({
  goal: z.string().describe('The marketing goal the user wants to achieve.'),
});
export type GetToolUseAdviceInput = z.infer<typeof GetToolUseAdviceInputSchema>;

const GetToolUseAdviceOutputSchema = z.object({
  advice: z.string().describe('Advice on how to use the tools on the platform to achieve the goal.'),
});
export type GetToolUseAdviceOutput = z.infer<typeof GetToolUseAdviceOutputSchema>;

export async function getToolUseAdvice(input: GetToolUseAdviceInput): Promise<GetToolUseAdviceOutput> {
  return getToolUseAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getToolUseAdvicePrompt',
  input: {schema: GetToolUseAdviceInputSchema},
  output: {schema: GetToolUseAdviceOutputSchema},
  prompt: `You are a digital marketing expert. A user wants to achieve the following goal: {{{goal}}}.  Based on the tools available on the platform, provide detailed advice on how to achieve this goal. Include the names of the tool categories in your advice, and names of specific tools in each category when appropriate.`,
});

const getToolUseAdviceFlow = ai.defineFlow(
  {
    name: 'getToolUseAdviceFlow',
    inputSchema: GetToolUseAdviceInputSchema,
    outputSchema: GetToolUseAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
