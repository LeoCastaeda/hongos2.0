import { salesAgentFlow } from '@/ai/salesAgent';
// import { runFlow } from 'genkit/beta/server'; 
// Note: runFlow might be needed depending on how the flow is exported or called in the specific genkit version. 
// However, looking at standard docs, we might invoke it differently. 
// Let's stick to the flow method if possible, or use the direct invocation.
// Actually, with the new genkit syntax 'salesAgentFlow' is a callable function if defined with ai.defineFlow ??
// Let's check imports. standard usage: await salesAgentFlow(input);

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages } = body;

        const response = await salesAgentFlow({ messages });

        return NextResponse.json({ message: response });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
