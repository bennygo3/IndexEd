import React, { useState } from 'react';
import TriviaCarousel from '../../components/TriviaCarousel/TriviaCarousel';
import './triviaDecks.css';
import pokeSnapshot from '../../assets/pokeSnapshot.png';
import usaPage from '../../assets/usa-states-page.png';

const genres = [
    { 
        genre: 'Pokemon', 
        description: 'Guess the Pokemon!', 
        linkUrl: '/pokemon-trivia', 
        imageUrl: `${pokeSnapshot}`
    },
    { 
        genre: 'NBA', 
        description: 'Name the NBA team based off the logo!', 
        linkUrl: '/nba-logos',
        imageUrl: ''
    },
    {
        genre: 'USA States',
        description: 'Name the state based on the outlined image',
        linkUrl: '/usa-states',
        imageUrl: `${usaPage}`,
        
    }
];

export default function TriviaDecks() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Updates the active index based on interactions with TriviaCarousel
    const handleSetActiveIndex = (newIndex) => {
        setActiveIndex(newIndex);
    }

    return (
        <section className='trivia-decks'>
            <div className='trivia-decks-header-container'>
                <h1 className='trivia-decks-header'>Trivia</h1>
                {/* <h2 className='genre-title'>{genres[activeIndex].genre}</h2> */}
            </div>
            <div className='trivia-decks-main'>
                <TriviaCarousel genres={genres} activeIndex={activeIndex} setActiveIndex={handleSetActiveIndex} />
            </div>
        </section>
    );
}