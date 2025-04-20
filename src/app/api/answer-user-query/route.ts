'use server';

import { answerUserQuery } from '@/ai/flows/answer-user-query';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    console.log('Received query:', query); // Log the received query

    const response = await answerUserQuery({ query });
    console.log('Generated answer:', response.answer); // Log the generated answer

    return NextResponse.json({ answer: response.answer });
  } catch (error) {
    console.error('Error processing query:', error); // Log any errors

    return new NextResponse('Error processing query', { status: 500 });
  }
}

