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
console.log(process.env.JWT_SECRET);
console.log(process.env.MONGODB_URI);
const PORT = process.env.PORT || 3001;
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

// import 'dotenv/config';
// import { ApolloServer } from '@apollo/server';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { expressMiddleware } from '@apollo/server/express4';
// import express from 'express';
// import cors from 'cors';
// import http from 'http';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { typeDefs, resolvers } from './schemas/index.js';
// import { authMiddleware } from './utils/auth.js';
// import db from './config/connection.js';
// import nbaRouter from './routes/nbaRoutes.js';

// const PORT = process.env.PORT || 3001;
// const app = express();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const httpServer = http.createServer(app);

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//     // context: ({ req }) => {
//     //     authMiddleware(req, {}, () => {});
//     //     console.log("User after middleware", req.user);
//     //     return { user: req.user };
//     // },
// });

// await server.start();

// // app.use(cors());
// // app.use(express.json());

// app.use('/api', nbaRouter);

// // Apply Apollo GraphQL middleware
// app.use(
//     '/graphql',
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
//         context: async ({ req }) => ({
//             token: req.headers.token 
//         }),
//     }),
// );

// // Serve static files and the React app
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../client/build/index.html'))
//     });
// }

// // Connect to the database
// db.once('open', () => {
//     console.log('MongoDB connected.')
// });

// // Start the HTTP server
// await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
// console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
