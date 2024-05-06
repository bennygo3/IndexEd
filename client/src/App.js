import React from 'react';
import { ApolloProvider } from '@apollo/client';
// import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from './utils/apolloClient.js';
import ThemeProvider from './context/ThemeProvider.js';
// import AuthCheck from './utils/AuthCheck.js';

import Landing from './pages/Landing/Landing.js';
import Home from './pages/Home/Home.js';
import CardCreate from './pages/CardCreate/CardCreate.js';
import MyCards from './pages/MyCards/MyCards.js';
import TriviaDecks from './pages/TriviaDecks/TriviaDecks.js';
import PokemonTrivia from './pages/TriviaGenres/Pokemon/PokemonTrivia.js';
import NbaLogos from './pages/TriviaGenres/Sports/NBA/NbaLogos.js';
import USAStates from './pages/TriviaGenres/Geography/USAStates.js';
// import authService from './utils/auth.js';

function App() {
    return (
        <ThemeProvider>
            {/* < AuthCheck /> */}
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
                            path='/card-create'
                            element={<CardCreate />}
                        />
                        <Route
                            path='/my-cards'
                            element={<MyCards />}
                        />
                        <Route
                            path='trivia-decks'
                            element={<TriviaDecks />}
                        />
                        <Route
                            path='pokemon-trivia'
                            element={<PokemonTrivia />}
                        />
                        <Route
                            path='nba-logos'
                            element={<NbaLogos />}
                        />
                        <Route
                            path='usa-states'
                            element={<USAStates />}
                        />
                    </Routes>
                </Router>
            </ApolloProvider>
        </ThemeProvider>

    );

}

export default App;