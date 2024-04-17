import React from 'react';
import TriviaCarousel from '../../components/TriviaCarousel/TriviaCarousel';
import './triviaDecks.css';

const genres = [
    { genre: 'Pokemon', description: 'Guess the name of Pokemon!', linkUrl: '/pokemon-trivia'}
]

export default function TriviaDecks() {
    return (
        <section className='trivia-decks'>
        <h1 className='trivia-decks-header'>Trivia:</h1>
        <div className='trivia-decks-main'>
            <TriviaCarousel genres={genres} />
        </div>
        </section>
    );
}