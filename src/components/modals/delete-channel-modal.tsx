'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Profile } from '@/graphql/gql/graphql';

import { useModal } from '@/hooks/use-modal-store';
import { createApolloClient } from '@/lib/apollo-client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DELETE_CHANNEL } from '@/graphql/mutations/channel/delete-channel';
import { GET_PROFILE_BY_USER_ID } from '@/graphql/queries/profile/get-profile-by-user-id';

export function DeleteChannelModal() {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteChannel';

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { userId, getToken } = useAuth();

  const { server, channel } = data;

  const onConfirm = async () => {
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

      await client.mutate({
        mutation: DELETE_CHANNEL,
        variables: {
          input: {
            channelId: channel?.id,
            profileId: profile?.id,
            serverId: server?.id,
          },
        },
      });

      onClose();
      router.push(`/servers/${server?.id}`);
      router.refresh();
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
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            Channel &quot;
            <span className="font-semibold text-indigo-500">
              {channel?.name}
            </span>
            &quot; will be deleted permanently.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
