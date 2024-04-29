import React, { useState, useEffect } from 'react';
import Card from '../../../../components/Card/Card.js';
import './nbaLogos.css'

export default function NbaLogos() {
    const [nbaLogos, setNbaLogos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [flippedIndices, setFlippedIndices] = useState(new Set());

    useEffect(() => {
        const fetchNBAData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/nba-logos');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const text = await response.text();
                try {
                const data = await response.json();
                setNbaLogos(data.map(team => ({
                    logo: team.nbaComLogo1,
                    name: team.teamName
                })));
            } catch (error) {
                console.error('Failed to parse JSON:', text);
            }
            } catch (error) {
                console.error('Failed to fetch NBA logos:', error);
                // Need to handle error here (set error state)
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
