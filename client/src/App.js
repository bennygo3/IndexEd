import React from "react";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import NewCard from "./pages/NewCard"
import Study from "./pages/Study"
import User from "./pages/User"
import Landing from "./pages/Landing/Landing.js";
import Home from "./pages/Home";
import DeckCreate from "./components/DeckCreate";
import NewDeck from "./pages/NewDeck";
import FlashcardCreate from "./components/Flashcard_Create";

const httpLink = createHttpLink({
    // uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    uri: 'http://localhost:4000/graphql',
    // uri: process.env.PORT,
});

// console.log("GraphQL Endpoint:", process.env.REACT_APP_GRAPHQL_ENDPOINT);


const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('id_token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({

    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Landing />}
                    />
                    <Route
                        path='/home'
                        element={<Home />}
                    />
                    <Route
                        path='/study'
                        element={<Study />}
                    />
                    <Route
                        path='/user'
                        element={<User />}
                    />
                    <Route
                        path='/deck_create'
                        element={<DeckCreate />}

                    />
                    <Route
                        path='/deck_create'
                        element={<NewDeck />}
                    />
                    <Route
                        path='/addFlashCard'
                        element={<FlashcardCreate />}
                    />




                </Routes>



            </Router>
        </ApolloProvider>
    );

}

export default App;