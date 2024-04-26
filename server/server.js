import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import { typeDefs, resolvers } from './schemas/index.js';
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.js';
import nbaRouter from './routes/nbaRoutes.js';

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
});

await server.start();

// Apply middleware to the Express app
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    authMiddleware({ req }); // This modifies request to add user
    next(); // Proceed to next middleware
});

app.use('/api', nbaRouter);

// Apply Apollo GraphQL middleware
app.use(
    '/graphql',
    expressMiddleware(server)
);

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

// Start the HTTP server
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);