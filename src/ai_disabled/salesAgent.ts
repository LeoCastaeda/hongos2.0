import { z } from 'zod';
import { ai } from './genkit';

export const salesAgentFlow = ai.defineFlow(
    {
        name: 'salesAgentFlow',
        inputSchema: z.object({
            messages: z.array(
                z.object({
                    role: z.string(),
                    content: z.string(),
                })
            ),
        }),
        outputSchema: z.string(),
    },
    async (input) => {
        const { messages } = input;

        // Filter history: exclude initial model messages (greeting) and only include messages after first user message
        const firstUserIndex = messages.findIndex(m => m.role === 'user');
        const relevantMessages = firstUserIndex >= 0 ? messages.slice(firstUserIndex, -1) : [];

        const history = relevantMessages.map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            content: [{ text: m.content }],
        }));

        const lastMessage = messages[messages.length - 1];

        const { text } = await ai.generate({
            prompt: lastMessage.content,
            messages: history as any,
            system: `You are a friendly and knowledgeable sales assistant for "Boulet Mushrooms" (bouletmushrooms.com). 
      Your goal is to help customers find the best mushroom products for their needs.
      
      IMPORTANT: Detect the language of the user's message.
      - If the user speaks Spanish, respond in Spanish.
      - If the user speaks English, respond in English.
      - If the user switches languages, switch with them.
      
      Emphasize that our products are slowly extracted in Barcelona using ultrasonic-assisted extraction (UAE) technology.
      Our products are 100% locally sourced mushroom fruiting body double extracts.
      If you don't know the answer, suggest contacting human support.`,
        });

        return text;
    }
);
