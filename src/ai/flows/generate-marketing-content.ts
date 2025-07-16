'use server';

/**
 * @fileOverview AI-powered content generation for social media platforms.
 *
 * - generateMarketingContent - A function that generates marketing content based on the selected platform.
 * - GenerateMarketingContentInput - The input type for the generateMarketingContent function.
 * - GenerateMarketingContentOutput - The return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingContentInputSchema = z.object({
  platform: z
    .string()
    .describe('The social media platform for which content should be generated (e.g., Instagram, Facebook, LinkedIn).'),
});
export type GenerateMarketingContentInput = z.infer<typeof GenerateMarketingContentInputSchema>;

const GenerateMarketingContentOutputSchema = z.object({
  content: z.string().describe('AI-suggested content tailored to the specified social media platform.'),
});
export type GenerateMarketingContentOutput = z.infer<typeof GenerateMarketingContentOutputSchema>;

export async function generateMarketingContent(input: GenerateMarketingContentInput): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: {schema: GenerateMarketingContentInputSchema},
  output: {schema: GenerateMarketingContentOutputSchema},
  prompt: `You are a social media marketing expert. Generate content tailored for {{platform}}.

  Consider trending topics, common marketing strategies for that platform, and what type of content performs best on the platform.
  Suggest a post that will maximize engagement and reach.
  Give a few options. Always include relevant hashtags.
  Ensure that the generated content is engaging and platform-appropriate.
  `,
});

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
