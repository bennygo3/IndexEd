import { ApolloClient, InMemoryCache, createHttpLink, from, fromPromise, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import configFront from '../config.js';
import Auth from './auth.js';

const httpLink = createHttpLink({
  uri: configFront.REACT_APP_GRAPHQL_ENDPOINT,
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await Auth.getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Refresh-then-retry on 401
let isRefreshing = false;
let pendingResolvers = [];

const addPending = (cb) => pendingResolvers.push(cb);
const resolvePending = () => {
  pendingResolvers.forEach((cb) => cb());
  pendingResolvers = [];
};

const refresh = async () => {
    const response = await fetch(`${configFront.API_BASE_URL}/token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }
  };

const errorLink = onError(({ networkError, operation, forward }) => {
  const status = 
    networkError?.statusCode ||
    networkError?.status;

  if (status !== 401) {
    return;
  }

  // If a refresh is already in flight, wait for it, then retry
  if (isRefreshing) {
    return fromPromise(
      new Promise((resolve) => addPending(resolve))
    ).flatMap(() => forward(operation));
  }

  // First 401 triggers the refresh
  isRefreshing = true;

  return fromPromise(
    refresh()
      .then(() => {
        resolvePending(); // allow queued ops to proceed
      })
      .finally(() => {
        isRefreshing = false;
      })
  ).flatMap(() => forward(operation));
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;