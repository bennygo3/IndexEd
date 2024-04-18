import React, { useState } from 'react';
import TriviaCarousel from '../../components/TriviaCarousel/TriviaCarousel';
import './triviaDecks.css';

const genres = [
    { genre: 'Pokemon', description: 'Guess the Pokemon!', linkUrl: '/pokemon-trivia' },
    // { genre: 'Sports', description: 'Sports Trivia', linkUrl: '/sports-trivia' }
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
                <h1 className='trivia-decks-header'>Trivia:</h1>
                <h2 className='genre-title'>{genres[activeIndex].genre}</h2>
            </div>
            <div className='trivia-decks-main'>
                <TriviaCarousel genres={genres} activeIndex={activeIndex} setActiveIndex={handleSetActiveIndex} />
            </div>
        </section>
    );
}

// import React from 'react';
// import TriviaCarousel from '../../components/TriviaCarousel/TriviaCarousel';
// import './triviaDecks.css';

// const genres = [
//     { genre: 'Pokemon', description: 'Guess the name of Pokemon!', linkUrl: '/pokemon-trivia'}
// ]

// export default function TriviaDecks() {
//     return (
//         <section className='trivia-decks'>
//         <h1 className='trivia-decks-header'>Trivia:</h1>
//         <div className='trivia-decks-main'>
//             <TriviaCarousel genres={genres} />
//         </div>
//         </section>
//     );
// }