import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

loadDevMessages();
loadErrorMessages();

export const createApolloClient = (token: string | null, useWS = false) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  });

  const wsLink = () => {
    return new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL as string,
        connectionParams: {
          authToken: token,
        },
      }),
    );
  };

  /*   const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ); */

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${
            locations?.map(
              ({ line, column }) => `[Line: ${line}, Column: ${column}]`,
            ) || []
          }, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: useWS
      ? from([authLink, errorLink, wsLink()])
      : from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
