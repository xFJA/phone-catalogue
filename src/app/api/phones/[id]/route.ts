import { NextResponse } from 'next/server';
import { phoneService } from '@/services/phoneService';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const phone = await phoneService.getPhoneById(id);

    if (!phone) {
      return NextResponse.json({ error: 'Phone not found' }, { status: 404 });
    }

    return NextResponse.json(phone);
  } catch (error) {
    console.error('Error in GET /api/phones/[id]:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
