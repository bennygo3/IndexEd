import React from 'react';
import TriviaCarousel from '../../components/TriviaCarousel/TriviaCarousel';

const genres = [
    { genre: 'Pokemon', description: 'Guess the name of Pokemon!', linkUrl: './TriviaGenres/Pokemon/PokemonTrivia.js'}
]

const TriviaDecks = () => {
    return (
        <div className='trivia-decks'>
            <TriviaCarousel genres={genres} />
        </div>
    )
}

export default TriviaDecks;