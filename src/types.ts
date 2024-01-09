import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

import { Member, Profile, Server } from '@/graphql/gql/graphql';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

/* export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};
 */
