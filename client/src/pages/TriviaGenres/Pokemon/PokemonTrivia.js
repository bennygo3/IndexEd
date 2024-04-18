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
        onSwipedLeft: () => moveNext(),
        onSwipedRight: () => movePrev(),
    });

    const moveNext = () => setActiveIndex((prevIndex) => (prevIndex + 1) % pokemonCards.length);
    const movePrev = () => setActiveIndex((prevIndex) => (prevIndex - 1 + pokemonCards.length) % pokemonCards.length);

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
            <div className='pokemon-decks' style={{ transform: `translateX(-${activeIndex + 1} * 33.33%)` }}>
                {pokemonCards.map((pokemon, index) => {
                    const isActive = index === activeIndex;
                    const cardClass = isActive ? 'pokemon-card-active' : 'pokemon-card';
                return (
                    <div className={cardClass} key={index} onClick={() => setActiveIndex(index)}>
                        <Card key={index}
                            front={<img src={pokemon.sprite} alt={pokemon.name} />}
                            back={pokemon.name}
                        />
                    </div>
                );
                })}
            </div>
            <div className='carousel-controls'>
                <button onClick={movePrev}>
                    Previous
                </button>
                <button onClick={() => setOffset(oldOffset => oldOffset + 1)}>Load New Pokemon</button>
                <button onClick={moveNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

    // const fetchPokemon = async (id) => {
    //     const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    //     const response = await fetch(pokeUrl);
    //     const data = await response.json();
    //     return {
    //         name: data.name,
    //         sprite: data.sprites.front_default
    //     };
    // };

// return (
//     <div className="pokemon-decks">
//         {pokemonCards.map((pokemon, index) => (
//             <Card key={index}
//                 front={<img src={pokemon.sprite} alt={pokemon.name} />}
//                 back={pokemon.name}
//             />
//         ))}
//         <button onClick={() => setOffset(oldOffset => + 1)}>Load New Pokemon</button>
//         {/* <button onClick={loadPokemonCards}>Load New Pokemon</button> */}
//     </div>
// );

// below works for randomizing pokemon and adding them to a used array...
// const loadPokemonCards = async () => {
//     setLoading(true);
//     let pokemonIds = [];
//     while (pokemonIds.length < 20) {
//         const newPokeId = Math.floor(Math.random() * 898) + 1;
//         if (!usedIds.has(newPokeId)) { // Check if the poke ID has already been used
//             pokemonIds.push(newPokeId);
//             usedIds.add(newPokeId); // Add new ID to the set of used IDs
//         }
//     }
//     setUsedIds(new Set([...usedIds, ...pokemonIds])); // Update the Set of used IDs

//     const promises = pokemonIds.map(id => fetchPokemon(id));
//     const pokemonData = await Promise.all(promises);
//     setPokemonCards(pokemonData);
//     setLoading(false);
// };