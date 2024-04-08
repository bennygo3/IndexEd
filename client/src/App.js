import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider.js';

import Landing from "./pages/Landing/Landing.js";
import Home from "./pages/Home/Home.js";
import CardCreate from "./pages/CardCreate/CardCreate.js";
import MyCards from "./pages/MyCards/MyCards.js";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000/',
});

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
            <ThemeProvider>
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
                            path='/card-create'
                            element={<CardCreate />}
                        />
                        <Route
                            path='/my-cards'
                            element={<MyCards />}
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    );

}

export default App;