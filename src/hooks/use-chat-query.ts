import {
  GetBatchDMsQueryVariables,
  GetBatchMessagesQueryVariables,
} from '@/graphql/gql/graphql';
import { GET_BATCH_DMS } from '@/graphql/queries/dm/get-batch-dms';
import { GET_BATCH_MESSAGES } from '@/graphql/queries/message/get-batch-messages';
import { createApolloClient } from '@/lib/apollo-client';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ChatQueryProps {
  queryKey: string;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  token: string;
}

export function useChatQuery({
  queryKey,
  paramKey,
  paramValue,
  token,
}: ChatQueryProps) {
  const client = createApolloClient(token);

  const fetchMessages = async ({ pageParam = undefined }) => {
    let variables: GetBatchMessagesQueryVariables | GetBatchDMsQueryVariables;

    if (paramKey === 'channelId') {
      variables = {
        cursor: pageParam,
        [paramKey]: paramValue,
      } as GetBatchMessagesQueryVariables;
    } else {
      variables = {
        cursor: pageParam,
        [paramKey]: paramValue,
      } as GetBatchDMsQueryVariables;
    }

    const { data: messageQueryData } = await client.query({
      query: paramKey === 'channelId' ? GET_BATCH_MESSAGES : GET_BATCH_DMS,
      variables,
    });

    const messages =
      paramKey === 'channelId'
        ? messageQueryData?.getBatchMessages
        : messageQueryData?.getBatchDMs;

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
    // client,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}
