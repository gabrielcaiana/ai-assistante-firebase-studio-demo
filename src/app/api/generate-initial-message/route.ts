'use server';

import { generateInitialMessage } from '@/ai/flows/generate-initial-message';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Generating initial message'); // Log that the function is running
    const initialMessage = await generateInitialMessage({});
    console.log('Generated message:', initialMessage.message); // Log the generated message
    return NextResponse.json({ message: initialMessage.message });
  } catch (error) {
    console.error('Error generating initial message:', error); // Log any errors
    return new NextResponse('Error generating initial message', { status: 500 });
  }
}

