import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { typeDefs, resolvers } from './schemas/index.js';
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.js';
import nbaRouter from './routes/nbaRoutes.js';

const PORT = process.env.PORT || 3001;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleware,
    
// });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        authMiddleware(req, {}, () => {});
        console.log("User after middleware", req.user);
        return { user: req.user };
    },
});

await server.start();

// Apply Apollo GraphQL middleware
app.use(
    '/graphql',
    expressMiddleware(server)
    // server.getMiddleware({ path: '/' })
);

app.use('/api', nbaRouter);

// Serve static files and the React app
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

const httpServer = http.createServer(app);
// Start the HTTP server
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);