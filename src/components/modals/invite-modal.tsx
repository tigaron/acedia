'use client';

import { useAuth } from '@clerk/nextjs';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useState } from 'react';

import { Profile, Server } from '@/graphql/gql/graphql';

import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';
import { createApolloClient } from '@/lib/apollo-client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { CREATE_INVITE_CODE } from '@/graphql/mutations/server/create-invite-code';
import { GET_PROFILE_BY_USER_ID } from '@/graphql/queries/profile/get-profile-by-user-id';

export function InviteModal() {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'invite';

  const { server } = data;

  const { userId, getToken } = useAuth();

  const origin = useOrigin();

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopyUrl = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const onNewUrl = async () => {
    try {
      setIsLoading(true);
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
        mutation: CREATE_INVITE_CODE,
        variables: {
          input: {
            profileId: profile.id,
            serverId: server?.id,
          },
        },
      });

      const serverWithNewCode: Server = serverMutationData?.createInviteCode;

      onOpen('invite', { server: serverWithNewCode });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
              readOnly
            />
            <Button disabled={isLoading} onClick={onCopyUrl} size="icon">
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={onNewUrl}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
