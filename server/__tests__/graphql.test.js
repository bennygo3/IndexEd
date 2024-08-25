import { ApolloServer, createTestClient } from '@apollo/server';
import { typeDefs } from '../graphql/typeDefs.js';
import resolvers from '../graphql/resolvers/index.js';

const server = newApolloServer({ 
    typeDefs,
    resolvers,
});

describe('GraphQL Queries', () => {
    it('fetches the current user', async () => {
        const { query } = createTestClient(server);

        const GET_CURRENT_USER = `
            query {
                currentUser {
                    username
                    email
                }
            }
        `;

        const res = await query({ query: GET_CURRENT_USER });
        expect(res.data).toBeDefined();
    })
})