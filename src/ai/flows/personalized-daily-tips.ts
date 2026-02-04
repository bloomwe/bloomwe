'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized daily health and wellness tips.
 *
 * The flow takes user preferences and activity levels as input and outputs a list of 5-10 personalized tips.
 *
 * @exports generateDailyTips - A function to trigger the daily tips generation flow.
 * @exports DailyTipsInput - The input type for the generateDailyTips function.
 * @exports DailyTipsOutput - The output type for the generateDailyTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const DailyTipsInputSchema = z.object({
  motivation: z.array(z.string()).describe('The user\'s motivations for caring for their well-being.'),
  activities: z.array(z.string()).describe('The types of activities the user enjoys.'),
  timeCommitment: z.string().describe('The amount of time the user can dedicate to their well-being each day (e.g., 10 minutes, 30 minutes, 1 hour).'),
  hobbies: z.record(z.object({
    level: z.string().describe('The user\'s level of experience in the hobby (e.g., new, medium, advanced, expert).'),
  })).describe('The user\'s selected hobbies and their corresponding levels.'),
  completedTips: z.array(z.string()).optional().describe('List of IDs of tips completed by the user.'),
});
export type DailyTipsInput = z.infer<typeof DailyTipsInputSchema>;

// Define the output schema for the flow
const DailyTipsOutputSchema = z.array(z.object({
  id: z.string().describe('Unique ID for the tip.'),
  title: z.string().describe('The title of the tip.'),
  description: z.string().describe('A detailed description of the tip.'),
  category: z.string().describe('The category of the tip (e.g., hydration, exercise, nutrition, mental).'),
  activities: z.array(z.string()).describe('Related activities for the tip.'),
  level: z.string().describe('The level of difficulty or expertise required for the tip.'),
  timeEstimate: z.number().describe('Estimated time in minutes to complete the tip.'),
}));
export type DailyTipsOutput = z.infer<typeof DailyTipsOutputSchema>;

// Exported function to call the flow
export async function generateDailyTips(input: DailyTipsInput): Promise<DailyTipsOutput> {
  return dailyTipsFlow(input);
}

// Define the prompt for generating the tips
const dailyTipsPrompt = ai.definePrompt({
  name: 'dailyTipsPrompt',
  input: {schema: DailyTipsInputSchema},
  output: {schema: DailyTipsOutputSchema},
  prompt: `You are a wellness expert generating personalized daily health and wellness tips for users.

  Based on the user's onboarding preferences and activity levels, create 5-10 unique tips.

  The user's motivations are: {{motivation}}
  The user enjoys these activities: {{activities}}
  The user can dedicate this much time each day: {{timeCommitment}}
  The user\'s hobbies and levels are: {{#each hobbies}}{{@key}}: {{this.level}}{{/each}}

  Completed tips (avoid duplicates if possible): {{completedTips}}

  Each tip should include:
  - id: A unique identifier for the tip.
  - title: A concise title for the tip.
  - description: A detailed explanation of the tip and its benefits.
  - category: The category of the tip (e.g., hydration, exercise, nutrition, mental).
  - activities: A list of related activities.
  - level: The level of difficulty or expertise required.
  - timeEstimate: The estimated time in minutes to complete the tip.

  Format the output as a JSON array of tips.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

// Define the Genkit flow
const dailyTipsFlow = ai.defineFlow({
    name: 'dailyTipsFlow',
    inputSchema: DailyTipsInputSchema,
    outputSchema: DailyTipsOutputSchema,
  },
  async input => {
    const {output} = await dailyTipsPrompt(input);
    return output!;
  }
);
