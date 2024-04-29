import React, { useState, useEffect } from 'react';
import Card from '../../../../components/Card/Card.js';
import './nbaLogos.css'

export default function NbaLogos() {
    const [nbaLogos, setNbaLogos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [flippedIndices, setFlippedIndices] = useState(new Set());

    useEffect(() => {
        const fetchNBAData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/nba-logos');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data.body && Array.isArray(data.body)) {
                    setNbaLogos(data.body.map(team => ({
                        logo: team.nbaComLogo1,
                        name: team.teamName
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

        fetchNBAData();
    }, []); // Empty array ensures effect only runs after initial render

    const toggleFlip = index => {
        setFlippedIndices(currentIndices => {
            const newIndices = new Set(currentIndices);
            if (newIndices.has(index)) {
                newIndices.delete(index);
            } else {
                newIndices.add(index);
            }
            return newIndices;
        });
    };

    return (
        <div className='nba-logos-container'>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error-message">Error: {error}</div> // Displaying the error message if present
            ) : (
                <div className='cards-grid'>
                    {nbaLogos.map((team, index) => (
                        <div key={index} className='nba-logo-card' onClick={() => toggleFlip(index)}>
                            <Card
                                front={<img src={team.logo} alt={`${team.name} logo`} />}
                                back={<div>{team.name}</div>}
                                isFlipped={flippedIndices.has(index)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
