import { GetBatchMessagesQueryVariables } from '@/graphql/gql/graphql';
import { GET_BATCH_MESSAGES } from '@/graphql/queries/message/get-batch-messages';
import { createApolloClient } from '@/lib/apollo-client';
import { useAuth } from '@clerk/nextjs';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ChatQueryProps {
  queryKey: string;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
}

export function useChatQuery({
  queryKey,
  paramKey,
  paramValue,
}: ChatQueryProps) {
  const { getToken } = useAuth();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const token = await getToken({ template: 'acedia' });

    const client = createApolloClient(token);

    const variables: GetBatchMessagesQueryVariables = {
      cursor: pageParam,
      channelId: paramValue,
    };

    const { data: messageQueryData } = await client.query({
      query: GET_BATCH_MESSAGES,
      variables,
    });

    const messages = messageQueryData?.getBatchMessages;

    return messages;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: lastpage => lastpage?.nextCursor,
      initialPageParam: undefined,
      refetchInterval: 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}
