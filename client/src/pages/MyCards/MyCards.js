import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../utils/queries';
import Card from '../../components/Card/Card';
import './MyCards.css';

export default function MyCards() {
    const [flippedCard, setFlippedCard] = useState({});

    const handleFlip = (cardId) => {
        setFlippedCard(prevState => ({
            ...prevState,
            [cardId]: !prevState[cardId]
        }));
    };
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="my-cards-page">
            {data.currentUser.stacks.map(stack => (
                <div key={stack._id} className="stack-section">
                    <h2>{stack.title}</h2>
                    <div className="my-cards-carousel">
                        {stack.studycards.map(card => (
                            <div
                                key={card._id}
                                className="my-cards-container"
                                onClick={() => handleFlip(card._id)}
                            >
                            <Card 
                                // key={card._id} 
                                front={card.front} 
                                back={card.back} 
                                isFlipped={flippedCard[card._id] || false} // default to false if not flipped yet
                            />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
