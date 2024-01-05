import { currentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

export async function DELETE(
  req: Request,
  { params }: { params: { fileId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    const utapi = new UTApi();

    await utapi.deleteFiles(params.fileId);

    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (error) {
    console.error('[Uploadthing_FileId][DELETE]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}
