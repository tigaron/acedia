import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`)
      return new NextResponse('Unauthorized', { status: 401 });

    await db.$queryRaw`SELECT 1`;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Cron][GET]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}
