import dotenv from 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { typeDefs, resolvers } from './schemas/index.js';
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.js';
import path from 'path';

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

app.use(cors());
// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
        console.log('Serving index.html for path:', req.path);
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    });
}

await startStandaloneServer(server, {
    app,
    context: ({ req }) => {
        const user = authMiddleware({ req }).user;
        return { user };
    },
    listen: { port: PORT },
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});

db.once('open', () => {
    console.log('MongoDB connected.')
});

