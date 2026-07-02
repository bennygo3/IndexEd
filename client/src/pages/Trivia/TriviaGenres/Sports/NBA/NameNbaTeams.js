import React, { useState, useEffect } from 'react';
import './nameNbaTeams.css';

export default function NameNbaTeams() {
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [guess, setGuess] = useState('');
    const [revealedTeams, setRevealedTeams] = useState(new Set());


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

    function handleSubmit(event) {
        event.preventDefault();

        const normalizedGuess = guess.trim().toLowerCase();

        if(!normalizedGuess) {
            return;
        }

        for (const conference of board) {
            for (const division of conference.divisions) {
                for (const team of division.teams) {

                    const teamName = team.name.toLowerCase();
                    const fullTeamName = `${team.location} ${team.name}`.toLowerCase();

                    if (
                        normalizedGuess === teamName ||
                        normalizedGuess === fullTeamName
                    ) {

                        if (revealedTeams.has(team.abbreviation)) { // duplicate guess
                            setGuess('');
                            return;
                        }

                        setRevealedTeams(prev => {
                            const updated = new Set(prev);
                            updated.add(team.abbreviation);
                            return updated;
                        });

                        setGuess('');
                        return;
                    }
                }
            }
        }

        setGuess('');
    }

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
                                            {revealedTeams.has(team.abbreviation)
                                                ? `${team.location} ${team.name}`
                                                : ''
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </section>
            ))}
            <form 
                className="nba-team-guess-form"
                onSubmit={handleSubmit}
            
            >
                <label htmlFor="nba-team-guess"></label>
                <input 
                    id="nba-team-guess"
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Example: Harlem Globetrotters or Globetrotters"
                    autoComplete="off"
                />  
            </form>
        </main>
    );
}


