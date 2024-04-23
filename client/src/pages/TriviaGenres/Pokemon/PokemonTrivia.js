import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../../components/Card/Card.js';
import { useSwipeable } from 'react-swipeable';
import './pokemonTrivia.css';

export default function PokemonTrivia() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0); // Initializing offset to start from the first Pokemon
    // const [usedIds, setUsedIds] = useState(new Set()); // Store used IDs to prevent repeats

    // Swipe handlers for carousel functionality
    const handlers = useSwipeable({
        onSwipedLeft: () => setActiveIndex((activeIndex + 1) % pokemonCards.length),
        onSwipedRight: () => setActiveIndex((activeIndex - 1 + pokemonCards.length) % pokemonCards.length),
    });

    const fetchPokemon = async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return {
            name: data.name,
            sprite: data.sprites.front_default
        };
    };

    const loadPokemonCards = useCallback(async () => {
        setLoading(true);
        const startId = offset * 20 + 1;
        const pokemonIds = Array.from({ length: 20 }, (_, index) => startId + index);
        const promises = pokemonIds.map(id => fetchPokemon(id));
        const pokemonData = await Promise.all(promises);
        setPokemonCards(pokemonData);
        setLoading(false);
    }, [offset]);

    useEffect(() => {
        loadPokemonCards();
    }, [loadPokemonCards]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='pokemon-decks-container' {...handlers}>
            <h1>Pokémon</h1>
            <h3>... click on the pokemon to reveal the name!</h3>
            <div className ='pokemon-decks'>
                {pokemonCards.length > 0 && (
                    <div className='pokemon-card' onClick={() => setActiveIndex((activeIndex + 1) % pokemonCards.length)}>
                        <Card 
                            front={<img src={pokemonCards[activeIndex].sprite} alt={pokemonCards[activeIndex].name} />}
                            back={pokemonCards[activeIndex].name}
                        />
                    </div>
                )}
            </div>

            <div className='carousel-controls'>
                <button onClick={() => setActiveIndex((activeIndex - 1 + pokemonCards.length) % pokemonCards.length)}>
                    Previous
                </button>
                <button onClick={() => setOffset(offset + 1)}>
                    Load New Pokemon
                </button>
                <button onClick={() => setActiveIndex((activeIndex + 1) % pokemonCards.length)}>
                    Next
                </button>
            </div>
        </div>
    );
};