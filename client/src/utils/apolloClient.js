import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';
console.log('GraphQL Endpoint:', graphqlEndpoint);



const httpLink =  createHttpLink({
    // uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/graphql' || 'http://localhost:4000/graphql',
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

// console.log(`${process.env.REACT_APP_GRAPHQL_ENDPOINT}`);
console.log(process.env.REACT_APP_GRAPHQL_ENDPOINT);

const authLink = setContext((_, { headers }) => {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('id_token');
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;