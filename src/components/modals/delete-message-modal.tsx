'use client';

import { useState } from 'react';

import { useModal } from '@/hooks/use-modal-store';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DeleteDmDto, DeleteMessageDto } from '@/graphql/gql/graphql';
import { DELETE_DM } from '@/graphql/mutations/dm/delete-dm';
import { DELETE_MESSAGE } from '@/graphql/mutations/message/delete-message';
import { createApolloClient } from '@/lib/apollo-client';
import { useAuth } from '@clerk/nextjs';

export function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteMessage';

  const [isLoading, setIsLoading] = useState(false);

  const { query } = data;

  const { getToken } = useAuth();

  const onConfirm = async () => {
    try {
      setIsLoading(true);

      const token = await getToken({ template: 'acedia' });

      const client = createApolloClient(token);

      let input: DeleteMessageDto | DeleteDmDto;

      if (query?.paramKey === 'channelId') {
        input = {
          channelId: query?.paramValue!,
          memberId: query?.memberId!,
          messageId: query?.messageId!,
          serverId: query?.serverId!,
        };
      } else {
        input = {
          conversationId: query?.paramValue!,
          dmId: query?.messageId!,
        };
      }

      await client.mutate({
        mutation: query?.channelId ? DELETE_MESSAGE : DELETE_DM,
        variables: {
          input,
        },
      });

      onClose();
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            The message will be deleted permanently.
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
