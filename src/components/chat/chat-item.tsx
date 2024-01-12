'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Member,
  MemberRoleEnum,
  Profile,
  UpdateDmDto,
  UpdateMessageDto,
} from '@/graphql/gql/graphql';

import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';

import { ActionTooltip } from '@/components/action-tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/user-avatar';
import { UPDATE_DM } from '@/graphql/mutations/dm/update-dm';
import { UPDATE_MESSAGE } from '@/graphql/mutations/message/update-message';
import { createApolloClient } from '@/lib/apollo-client';
import { useAuth } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
}

const roleIconMap = {
  [MemberRoleEnum.Guest]: null,
  [MemberRoleEnum.Moderator]: (
    <ShieldCheck className="h-4 w-4 text-indigo-500" />
  ),
  [MemberRoleEnum.Admin]: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

export function ChatItem({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  paramKey,
  paramValue,
}: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { onOpen } = useModal();

  const params = useParams();

  const router = useRouter();

  const { getToken } = useAuth();

  const onMemberClick = () => {
    if (member.id === currentMember.id) return;

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsEditing(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = await getToken({ template: 'acedia' });

      const client = createApolloClient(token);

      let input: UpdateMessageDto | UpdateDmDto;

      if (paramKey === 'channelId') {
        input = {
          [paramKey]: paramValue,
          content: values.content,
          memberId: currentMember.id,
          messageId: id,
          serverId: params?.serverId as string,
        } as UpdateMessageDto;
      } else {
        input = {
          [paramKey]: paramValue,
          content: values.content,
          dmId: id,
        } as UpdateDmDto;
      }

      await client.mutate({
        mutation: params?.channelId ? UPDATE_MESSAGE : UPDATE_DM,
        variables: {
          input,
        },
      });

      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    form.reset({
      content,
    });
  }, [form, content]);

  const isAdmin = currentMember.role === MemberRoleEnum.Admin;
  const isModerator = currentMember.role === MemberRoleEnum.Moderator;
  const isMessageOwner = currentMember.id === member.id;

  const canDeleteMessage =
    !deleted && (isAdmin || isModerator || isMessageOwner);
  const canEditMessage = !deleted && isMessageOwner && !fileUrl;

  const isPDF = fileUrl && fileUrl.toLowerCase().endsWith('.pdf');
  const isImage = !isPDF && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={onMemberClick}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                sizes="192px"
                priority
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                'text-sm text-zinc-600 dark:text-zinc-300',
                deleted &&
                  'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1',
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className="flex items-center gap-x-2 w-full pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edit your message..."
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen('deleteMessage', {
                  query: {
                    paramKey,
                    paramValue,
                    messageId: id,
                    serverId: params?.serverId,
                    memberId: currentMember.id,
                  },
                })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
}
