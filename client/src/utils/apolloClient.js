// client/src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { fromPromise } from '@apollo/client';
import configFront from '../config.js';

// Your existing http link (unchanged)
const httpLink = createHttpLink({
  uri: configFront.REACT_APP_GRAPHQL_ENDPOINT, // e.g. '/graphql' or 'http://localhost:4000/graphql'
  credentials: 'include',
});

console.log('httpLink', httpLink);

// --- Refresh-then-retry on 401 (single-flight) ---
let isRefreshing = false;
let pendingResolvers = [];

const addPending = (cb) => pendingResolvers.push(cb);
const resolvePending = () => {
  pendingResolvers.forEach((cb) => cb());
  pendingResolvers = [];
};

const refresh = () =>
  fetch(`${configFront.API_BASE_URL}/token`, {
    method: 'POST',
    credentials: 'include',
  }).then((r) => {
    if (!r.ok) throw new Error('refresh failed');
  });

const errorLink = onError(({ networkError, operation, forward }) => {
  const status = networkError && (networkError.statusCode || networkError.status);
  if (status !== 401) {
    // let non-401 errors flow normally
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
      .catch((e) => {
        // bubble the error to all queued requests
        pendingResolvers = [];
        throw e;
      })
      .finally(() => {
        isRefreshing = false;
      })
  ).flatMap(() => forward(operation));
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

// import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
// import { onError } from '@apollo/client/link/error';
// import configFront from '../config.js';

// const errorLink = onError(({ networkError, operation, forward }) => {
//     if (networkError?.statusCode === 401 || networkError?.statusCode === 500) {
//         console.warn("🔁 Apollo retrying failed operation:", operation.operationName);
//         return forward(operation);
//     }
// });

// const httpLink =  createHttpLink({
//     uri: configFront.REACT_APP_GRAPHQL_ENDPOINT,
//     credentials: 'include',
// });

// console.log('httpLink', httpLink);

// const client = new ApolloClient({
//     link: from([errorLink, httpLink]),
//     cache: new InMemoryCache(),
// })

// export default client;