import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../utils/queries';
import { Link } from 'react-router-dom'
// import NavbarMSC from '../../components/Navbar/NavbarMSC';
import Card from '../../components/Card/Card';
import Wood from '../../components/MadeWCss/Wood';
import ThoughtBubble from '../../components/MadeWCss/ThoughtBubble';
import './MyCards.css';

export default function MyCards() {
    const [flippedCard, setFlippedCard] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleFlip = (cardId) => {
        setFlippedCard(prevState => ({
            ...prevState,
            [cardId]: !prevState[cardId]
        }));
    };
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!data?.getCurrentUser?.studyGenres) {
        console.warn("⚠️ getCurrentUser.studyCardGroups are missing or undefined!", data.getCurrentUser);
        return <p> No study cards found. Try creating one!</p>;
    }

    return (
        <main className="my-cards-page">
            <header id="my-cards-chalkboard">
                <div id="my-cards-top-row">
                    <h1 id="my-cards-header">
                        My Study Cards
                    </h1>

                    <button
                        id="my-cards-menu-button"
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        aria-label="Open navigation menu"
                    >
                        ☰
                    </button>

                    {isMenuOpen && (
                        <ul id="my-cards-menu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/card-create">Create a new card</Link></li>
                            <li><Link to="/trivia">Trivia cards</Link></li>
                            <li><Link to="/games">Games</Link></li>
                        </ul>
                    )}
                </div>

                <div id="my-cards-genre-row">
                    <h2>Genre: General</h2>
                    <button id="my-cards-new-genre-button">
                        + New Genre
                    </button>
                </div>

                <div id="my-cards-chalk"></div>
            </header>

            {data.getCurrentUser?.studyGenres.length > 0 ? (
                data.getCurrentUser.studyGenres.map(genre => (
                    <section key={genre._id} id="my-cards-wood">
                        <Wood>
                            <h2>{genre.title}</h2>
                            <div className="my-cards-carousel">
                                {genre.studyCards.map(card => (
                                    <div
                                        key={card._id}
                                        className="my-cards-container"
                                        onClick={() => handleFlip(card._id)}
                                    >
                                        <Card
                                            front={card.front}
                                            back={card.back}
                                            isFlipped={flippedCard[card._id] || false} // default to false if not flipped yet
                                        />
                                    </div>
                                ))}
                            </div>
                        </Wood>
                    </section>
                ))
            ) : (
                <>
                    <ThoughtBubble />
                </>
            )}


        </main>
    );
};

// old header setup 6/18
// <header id="my-cards-chalkboard">
//     {/* <div> */}
//     <h1 id="my-cards-header">My Study Cards</h1>
//     <ul id="my-cards-header-list">
//         <li><Link to="/" id="mcp-home"> -Home</Link></li>
//         <li><Link to="/card-create" id="mcp-card-create"> -Create a new card</Link></li>
//         <li><Link to="/trivia" id="mcp-trivia"> -Trivia cards</Link></li>
//         <li><Link to="/games" id="mcp-games"> -Games</Link></li>
//     </ul>
//     <div id="my-cards-chalk"></div>
//     {/* </div> */}
//     {/* <div id="my-cards-corkboard">
//         <NavbarMSC />
//     </div> */}
//     {/* <p id="my-cards-header-p">1. the devotion of time and attention to acquiring knowledge on an academic subject, especially by means of notecards*</p> */}
// </header>
