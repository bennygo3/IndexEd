import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from './utils/apolloClient.js';
import ThemeProvider from './context/ThemeProvider.js';

import Landing from './pages/Landing/Landing.js';
import Home from './pages/Home/Home.js';
import MyCards from './pages/MyCards/MyCards.js';
import CardCreate from './pages/CardCreate/CardCreate.js';
import Games from './pages/Games/Games.js';

import TriviaDecks from './pages/TriviaDecks/TriviaDecks.js';
import PokemonTrivia from './pages/TriviaGenres/Pokemon/PokemonTrivia.js';
import NbaLogos from './pages/TriviaGenres/Sports/NBA/NbaLogos.js';
import USAStates from './pages/TriviaGenres/Geography/USAStates.js';
import Basketball from './components/Trivia/Basketball/Basketball.js';
import Snake from './pages/Games/Snake/Snake.js';
import TTT from './pages/Games/TTT/TTT.js';
import FallDown from './pages/Games/FallDown/FallDown.js';
import SimonSays from './pages/Games/SimonSays/SimonSays.js';


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
                            path='games'
                            element={<Games />}
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
                        <Route
                            path='basketball'
                            element={<Basketball />}
                        />
                        <Route
                            path='snake'
                            element={<Snake />}
                        />
                        <Route 
                            path='ttt'
                            element={<TTT />}
                        />
                        <Route
                            path='falldown'
                            element={<FallDown />}
                        />
                        <Route
                            path='simonsays'
                            element={<SimonSays />}
                        />
                    </Routes>
                </Router>
            </ApolloProvider>
        </ThemeProvider>

    );

}

export default App;