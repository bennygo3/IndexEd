import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import configFront from '../config.js';

const errorLink = onError(({ networkError, operation, forward }) => {
    if (networkError?.statusCode === 401 || networkError?.statusCode === 500) {
        console.warn("🔁 Apollo retrying failed operation:", operation.operationName);
        return forward(operation);
    }
});

const httpLink =  createHttpLink({
    uri: configFront.REACT_APP_GRAPHQL_ENDPOINT,
    credentials: 'include',
});

console.log('httpLink', httpLink);

const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
})

export default client;