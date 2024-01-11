'use client';

import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DeleteServerMutationVariables } from '@/graphql/gql/graphql';

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

import { DELETE_SERVER } from '@/graphql/mutations/server/delete-server';

export function DeleteServerModal() {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteServer';

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { getToken } = useAuth();

  const { server } = data;

  const fileId = server?.imageUrl?.split('/').pop();

  const onConfirm = async () => {
    try {
      setIsLoading(true);

      const token = await getToken({ template: 'acedia' });

      const client = createApolloClient(token);

      const variables: DeleteServerMutationVariables = {
        id: server?.id!,
      };

      await client.mutate({
        mutation: DELETE_SERVER,
        variables,
      });

      await axios.delete(`/api/uploadthing/${fileId}`);

      onClose();
      router.refresh();
      router.push('/');
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
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            Server &quot;
            <span className="font-semibold text-indigo-500">
              {server?.name}
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
