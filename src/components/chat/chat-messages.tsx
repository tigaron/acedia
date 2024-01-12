'use client';

import { format } from 'date-fns';
import { Loader2, ServerCrash } from 'lucide-react';
import { ElementRef, Fragment, useRef } from 'react';

import { Member, Message } from '@/graphql/gql/graphql';

import { ChatItem } from '@/components/chat/chat-item';
import { ChatWelcome } from '@/components/chat/chat-welcome';
import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatScroll } from '@/hooks/use-chat-scroll';
// import { useChatSubscription } from '@/hooks/use-chat-subscription';
// import { useChatSocket } from '@/hooks/use-chat-socket';

const DATE_FORMAT = 'dd MMM yyyy, HH:mm';

interface ChatInputProps {
  name: string;
  member: Member;
  chatId: string;
  token: string;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  type: 'channel' | 'conversation';
}

export function ChatMessages({
  name,
  member,
  chatId,
  token,
  paramKey,
  paramValue,
  type,
}: ChatInputProps) {
  const queryKey = `chat:${chatId}`;
  // const addKey = `chat:${chatId}:messages`;
  // const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  const {
    // client,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useChatQuery({
    queryKey,
    paramKey,
    paramValue,
    token,
  });

  // useChatSubscription({ client, queryKey, paramKey, paramValue });

  // useChatSocket({ queryKey, addKey, updateKey });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.messages?.length ?? 0,
  });

  if (status === 'pending') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome name={name} type={type} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.messages.map((message: Message) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                content={message.content}
                fileUrl={message.fileUrl ?? null}
                deleted={message.deleted}
                paramKey={paramKey}
                paramValue={paramValue}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
