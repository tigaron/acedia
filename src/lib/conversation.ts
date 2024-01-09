/* import { db } from '@/lib/db';

async function findConversation(memberOneId: string, memberTwoId: string) {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId }, { memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

async function createNewConverstation(
  memberOneId: string,
  memberTwoId: string,
) {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function fetchConversation(
  memberOneId: string,
  memberTwoId: string,
) {
  const conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (conversation) return conversation;

  return await createNewConverstation(memberOneId, memberTwoId);
}
 */
