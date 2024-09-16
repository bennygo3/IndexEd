import React, { useState, useEffect } from 'react';
import Card from '../../../../../components/Card/Card.js';
import { useSwipeable } from 'react-swipeable';
import './nbaLogos.css'

export default function NbaLogos() {
    const [nbaLogos, setNbaLogos] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex((activeIndex + 1) % nbaLogos.length),
        onSwipedRight: () => updateIndex((activeIndex - 1 + nbaLogos.length) % nbaLogos.length),
    });

    const updateIndex = (newIndex) => {
        setIsFlipped(false); // 
        setActiveIndex(newIndex);
    };

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const fetchNBAData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/nba-logos');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            if (data.body && Array.isArray(data.body)) {
                setNbaLogos(data.body.map(team => ({
                    logo: team.nbaComLogo1,
                    name: `${team.teamCity} ${team.teamName}`
                })));
            } else {
                throw new Error('Data format error, expected an array');
            }
        } catch (error) {
            console.error('Failed to fetch NBA logos:', error);
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchNBAData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error-message">Error: {error}</div> // Displaying the error message if present
            ) : (
                <div className='nba-logos-container' {...handlers}>
                    <h1>NBA Team Logos</h1>
                    <h3>...click on the NBA team logo to reveal the team name!</h3>
                    <div className='nba-logos'>
                        {nbaLogos.length > 0 && (
                            <div className='nba-card-logo' onClick={toggleFlip}>
                                <Card
                                    front={<img src={nbaLogos[activeIndex].logo} alt={`${nbaLogos[activeIndex].name} logo`} />}
                                    back={<div>{nbaLogos[activeIndex].name}</div>}
                                    isFlipped={isFlipped}
                                />
                            </div>
                        )}
                    </div>

                    <div className='carousel-controls'>
                        <button onClick={() => updateIndex((activeIndex - 1 + nbaLogos.length) % nbaLogos.length)}>Previous</button>
                        <button onClick={() => updateIndex((activeIndex + 1) % nbaLogos.length)}>Next</button>
                    </div>
                </div>
            )}

        </>
    );
}