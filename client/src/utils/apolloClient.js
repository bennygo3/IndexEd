import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import configFront from '../config.js';

const httpLink =  createHttpLink({
    uri: configFront.REACT_APP_GRAPHQL_ENDPOINT,
    credentials: 'include',
});

console.log('httpLink', httpLink);

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('access_token'); 
//     // Return the headers to the context so httpLink can read them
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//         },
//     };
// });

// const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
// });

export default client;