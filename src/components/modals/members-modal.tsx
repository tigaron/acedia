'use client';

import { useAuth } from '@clerk/nextjs';
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MemberRoleEnum, Profile, Server } from '@/graphql/gql/graphql';
import { ServerWithMembersWithProfiles } from '@/types';

import { useModal } from '@/hooks/use-modal-store';
import { createApolloClient } from '@/lib/apollo-client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/user-avatar';

import { DELETE_MEMBER } from '@/graphql/mutations/member/delete-member';
import { UPDATE_MEMBER_ROLE } from '@/graphql/mutations/member/update-member-role';
import { GET_PROFILE_BY_USER_ID } from '@/graphql/queries/profile/get-profile-by-user-id';

const roleIconMap = {
  [MemberRoleEnum.Guest]: null,
  [MemberRoleEnum.Moderator]: (
    <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />
  ),
  [MemberRoleEnum.Admin]: (
    <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />
  ),
};

export function MembersModal() {
  const [loadingId, setLoadingId] = useState('');

  const router = useRouter();

  const { userId, getToken } = useAuth();

  const { isOpen, onOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'members';

  const { server } = data as { server: ServerWithMembersWithProfiles };

  const onRoleChange = async (memberId: string, role: MemberRoleEnum) => {
    try {
      setLoadingId(memberId);

      const token = await getToken({ template: 'acedia' });

      const client = createApolloClient(token);

      const { data: profileQueryData } = await client.query({
        query: GET_PROFILE_BY_USER_ID,
        variables: {
          userId,
        },
      });

      const profile: Profile = profileQueryData?.getProfileByUserId;

      const { data: serverMutationData } = await client.mutate({
        mutation: UPDATE_MEMBER_ROLE,
        variables: {
          input: {
            profileId: profile.id,
            serverId: server?.id,
            memberId,
            role,
          },
        },
      });

      const serverWithNewMemberRole: Server =
        serverMutationData?.updateMemberRole;

      router.refresh();
      onOpen('members', { server: serverWithNewMemberRole });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId('');
    }
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);

      const token = await getToken({ template: 'acedia' });

      const client = createApolloClient(token);

      const { data: profileQueryData } = await client.query({
        query: GET_PROFILE_BY_USER_ID,
        variables: {
          userId,
        },
      });

      const profile: Profile = profileQueryData?.getProfileByUserId;

      const { data: serverMutationData } = await client.mutate({
        mutation: DELETE_MEMBER,
        variables: {
          input: {
            profileId: profile.id,
            serverId: server?.id,
            memberId,
          },
        },
      });

      const serverWithoutDeletedMember: Server =
        serverMutationData?.deleteMember;

      router.refresh();
      onOpen('members', { server: serverWithoutDeletedMember });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId('');
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map(member => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc 500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, MemberRoleEnum.Guest)
                                }
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Guest
                                {member.role === MemberRoleEnum.Guest && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, MemberRoleEnum.Guest)
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Moderator
                                {member.role === MemberRoleEnum.Moderator && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="w-4 h-4 ml-auto animate-spin text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
