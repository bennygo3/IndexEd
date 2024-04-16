import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card/Card.js';

const PokemonTrivia = () => {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [offset, setOffset] = useState(0); // Initializing offset to start from the first Pokemon
    // const [usedIds, setUsedIds] = useState(new Set()); // Store used IDs to prevent repeats

    const fetchPokemon = async (id) => {
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(pokeUrl);
        const data = await response.json();
        return {
            name: data.name,
            sprite: data.sprites.front_default
        };
    };

    const loadPokemonCards = useCallback (async () => {
        setLoading(true);
        const startId = offset * 20 + 1;
        const pokemonIds = Array.from({ length: 20}, (_, index) => startId + index);
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
        <div className="pokemon-decks">
            {pokemonCards.map((pokemon, index) => (
                <Card key={index} 
                    front={<img src={pokemon.sprite} alt={pokemon.name} />}
                    back={pokemon.name} 
                />
            ))}
            <button onClick={() => setOffset(oldOffset => + 1)}>Load New Pokemon</button>
            {/* <button onClick={loadPokemonCards}>Load New Pokemon</button> */}
        </div>
    );
};

export default PokemonTrivia;

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