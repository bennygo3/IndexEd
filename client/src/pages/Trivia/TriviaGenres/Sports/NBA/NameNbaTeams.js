import React, { useState, useEffect } from 'react';
import './nameNbaTeams.css';

export default function NameNbaTeams() {
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadBoard() {
            try {
                const response = await fetch('api/nba/team-guesser');

                if (!response.ok) {
                    throw new Error('Unable to load NBA teams.');
                }

                const data = await response.json();
                setBoard(data);
            } catch (error) {
                console.error('Error loading NBA Teams Quiz:', error);
            } finally {
                setLoading(false);
            }
        }

        loadBoard();
    }, []);

    if (loading) {
        return (
            <main className="nba-team-guesser-page">
                <h1>Loading NBA teams...</h1>;
            </main>
        );    
    }

    return (
        <main className="nba-team-guesser-page">
            <h1>Fill in each NBA team</h1>

            {board.map((conference) => (
                <section 
                    key={conference.conference} 
                    className="conference-section"
                >
                    <h2>{conference.conference} Conference</h2>

                    <div className="division-grid">
                        {conference.divisions.map((division) => (
                            <section 
                                key={division.name} 
                                className="division-card"
                            >
                                <h3>{division.name}</h3>

                                <ul className="team-list">
                                    {division.teams.map((team) => (
                                        <li key={team.abbreviation}
                                            className="team-slot"
                                        >
                                           
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
}


