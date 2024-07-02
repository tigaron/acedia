import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

function handleAuth(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) throw new Error('Unauthorized');
  return { userId: userId };
}

export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async ({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
  messageFile: f({
    image: { maxFileSize: '16MB', maxFileCount: 1 },
    pdf: { maxFileSize: '128MB', maxFileCount: 1 },
  })
    .middleware(async ({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
