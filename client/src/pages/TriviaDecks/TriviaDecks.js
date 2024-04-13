import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card.js';

const TriviaDecks = () => {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             //Fetch data
    //             // const data = await fetchCardsData();
    //             setCardsData(data);
    //             setLoading(false);

    //         } catch (err) {
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);
    return (
        <>
            <div className="trivia-decks">
                {cardsData.map(card => (
                    <Card key={card.id} front={card.front} back={card.back} />
                ))}
            </div>

        </>
    )
}

export default TriviaDecks;