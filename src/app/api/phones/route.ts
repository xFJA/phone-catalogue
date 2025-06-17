import { NextResponse } from 'next/server';
import { phoneService } from '@/services/phoneService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const limitNum = limit ? parseInt(limit, 10) : 20;
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const phones = await phoneService.getAllPhones(limitNum, offsetNum);
    return NextResponse.json(phones);
  } catch (error) {
    console.error('Error in GET /api/phones:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
