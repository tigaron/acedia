'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, SendHorizonal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useModal } from '@/hooks/use-modal-store';

import { EmojiPicker } from '@/components/emoji-picker';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreateDmDto, CreateMessageDto } from '@/graphql/gql/graphql';
import { CREATE_DM } from '@/graphql/mutations/dm/create-dm';
import { CREATE_MESSAGE } from '@/graphql/mutations/message/create-message';
import { createApolloClient } from '@/lib/apollo-client';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface ChatInputProps {
  query: Record<string, any>;
  name: string;
  type: 'conversation' | 'channel';
}

const formSchema = z.object({
  content: z.string().min(1),
});

export function ChatInput({ query, name, type }: ChatInputProps) {
  const { onOpen } = useModal();

  const router = useRouter();

  const { getToken } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = await getToken({ template: 'acedia' });

      const client = createApolloClient(token);

      let input: CreateMessageDto | CreateDmDto;

      if (type === 'channel') {
        input = {
          channelId: query.channelId,
          content: values.content,
          fileUrl: null,
          memberId: query.memberId,
          serverId: query.serverId,
        } as CreateMessageDto;
      } else {
        input = {
          conversationId: query.conversationId,
          content: values.content,
          fileUrl: null,
        } as CreateDmDto;
      }

      await client.mutate({
        mutation: type === 'channel' ? CREATE_MESSAGE : CREATE_DM,
        variables: {
          input,
        },
      });

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen('messageFile', { query })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    disabled={isLoading}
                    placeholder={`Message ${
                      type === 'conversation' ? name : `#${name}`
                    }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                    />
                    <button
                      type="button"
                      className="ml-2 h-[24px] w-[24px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                      disabled={isLoading}
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      <SendHorizonal />
                    </button>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
