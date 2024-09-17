import { useState } from 'react';
// import Navbar from '../../components/Navbar/Navbar.js';
import TriviaCarousel from './TriviaCarousel/TriviaCarousel.js';
import pokeSnapshot from '../../assets/pokeSnapshot.png';
import Basketball from './Basketball/Basketball.js';
import usaPage from '../../assets/usa-states-page.png';
import './trivia.css';

const genres = [
    {
        genre: 'Pokemon',
        desc: 'Guess the Pokemon!',
        linkUrl: '/pokemon-trivia',
        imageUrl: pokeSnapshot
    },
    // {
    //     genre: 'NBA',
    //     desc: 'Name the NBA team based off their logo!',
    //     linkUrl: '/nba-logos',
    //     component: <Basketball />
    // },
    {
        genre: 'USA States',
        desc: 'Name the state based on the outlined image',
        linkUrl: '/usa-states',
        imageUrl: usaPage
    }
];

export default function Trivia() {
    const [activeIndex, setActiveIndex] = useState(0);

    //updated the active index
    const handleSetActiveIndex = (newIndex) => {
        setActiveIndex(newIndex);
    }

    return (
        <main className='trivia-page'>
            <header className='trivia-header'>
                <h1>Trivia</h1>
                {/* <Navbar /> */}
            </header>
            <section>
                <TriviaCarousel
                    genres={genres}
                    activeIndex={activeIndex}
                    setActiveIndex={handleSetActiveIndex}
                />
            </section>
        </main>
    );
}