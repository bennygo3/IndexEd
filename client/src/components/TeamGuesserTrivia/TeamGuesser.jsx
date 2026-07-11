import React, { useState, useEffect } from 'react';
import './teamGuesser.css';

export default function TeamGuesserTrivia({
    league,
    title,
    totalTeams,
    gameTime,
}) {
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [guess, setGuess] = useState('');
    const [revealedTeams, setRevealedTeams] = useState(new Set());
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const score = revealedTeams.size;
    const [gameStarted, setGameStarted] = useState(false);
    const [guessFeedback, setGuessFeedback] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(gameTime); // initializing timer from prop instead of former constant
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        async function loadBoard() {
            try {
                const response = await fetch(`api/${league}/team-guesser`);

                if (!response.ok) {
                    throw new Error(`Unable to load ${league} teams.`);
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
    }, [league]);

    useEffect(() => {
        if (loading || !gameStarted || gameOver) return;

        if (timeRemaining <= 0) {
            setGameStarted(false);
            setGameOver(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, gameStarted, gameOver, timeRemaining]);

    useEffect(() => {
        if (score === totalTeams) {
            setGameStarted(false);
            setGameOver(true);
        }
    }, [score, totalTeams]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function startButton() {
        setGameStarted(true);
        setGameOver(false);
        setTimeRemaining(gameTime);
        setRevealedTeams(new Set());
        setGuess('');
        setGuessFeedback('');
        setShowPlaceholder(true);
    }

    function flashFeedback(type) {
        setGuessFeedback(type);

        setTimeout(() => {
            setGuessFeedback('');
        }, 300);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!gameStarted || gameOver) return;

        const normalizedGuess = guess.trim().toLowerCase();

        if (!normalizedGuess) return;

        for (const conference of board) {
            for (const division of conference.divisions) {
                for (const team of division.teams) {

                    const teamName = team.name.toLowerCase();
                    const fullTeamName = `${team.location} ${team.name}`.toLowerCase();

                    const isMatch =
                        normalizedGuess === teamName ||
                        normalizedGuess === fullTeamName;

                    if (isMatch) {
                        if (revealedTeams.has(team.abbreviation)) {
                            setGuess('');
                            flashFeedback('wrong');
                            return;
                        }

                        setRevealedTeams(prev => {
                            const updated = new Set(prev);
                            updated.add(team.abbreviation);
                            return updated;
                        });

                        setGuess('');
                        flashFeedback('correct');
                        return;
                    }
                }
            }
        }

        setGuess('');
        flashFeedback('wrong');
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
            <div className="game-status">
                <p>Score: {score} / {totalTeams}</p>
                <p>Time: {formatTime(timeRemaining)}</p>
            </div>

            {gameOver && (
                <div className="game-over-message">
                    {score === totalTeams ? (
                        <p>Perfect! Final score: {formatTime(timeRemaining)} remaining</p>
                    ) : (
                        <p>Time's up! Final score: {score} / {totalTeams}</p>
                    )}
                </div>
            )}

            <button onClick={startButton}>
                {gameStarted ? "Restart Game" : gameOver ? "Play Again" : "Start Game"}
            </button>

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
                                        <li 
                                            key = {team.abbreviation}
                                            className = {`team-slot ${
                                                gameOver && !revealedTeams.has(team.abbreviation)
                                                    ? "missed-team"
                                                    : ""
                                            }`}
                                        >
                                            {revealedTeams.has(team.abbreviation) || gameOver
                                                ? `${team.location} ${team.name}`
                                                : ""
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
                    className={guessFeedback}
                    type="text"
                    value={guess}
                    disabled={!gameStarted || gameOver}
                    onFocus={() => setShowPlaceholder(false)}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder={showPlaceholder ? "Example: Harlem Globetrotters or Globetrotters" : ""}
                    autoComplete="off"
                />
            </form>
        </main>
    );
}