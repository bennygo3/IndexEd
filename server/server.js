import 'dotenv/config';
import config from '../config.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.js';

import nbaRouter from './routes/nbaRoutes.js';

const PORT = config.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: ({ req }) => {
            const user = authMiddleware({ req }).user;
            return { user };
        },
    }),
);

app.use('/api', nbaRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    });
}

// Connect to the database
db.once('open', () => {
    console.log('MongoDB connected.')
});

await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);



console.log('TypeDefs:', typeDefs);
console.log('Resolvers:', resolvers);