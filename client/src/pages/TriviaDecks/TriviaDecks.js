import React from 'react';
import TriviaCarousel from '../../components/TriviaCarousel/TriviaCarousel';

const genres = [
    { genre: 'Pokemon', description: 'Guess the name of Pokemon!', linkUrl: '/pokemon-trivia'}
]

export default function TriviaDecks() {
    return (
        <>
        <h1>Trivia</h1>
        <div className='trivia-decks'>
            <TriviaCarousel genres={genres} />
        </div>
        </>
    );
}