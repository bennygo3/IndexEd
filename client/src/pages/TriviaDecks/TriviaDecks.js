import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card.js';

const TriviaDecks = () => {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usedIds, setUsedIds] = useState(new Set()); // Store used IDs to prevent repeats

    const fetchPokemon = async (id) => {
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pokeResponse = await fetch(pokeUrl);
        const pokeData = await pokeResponse.json();
        return {
            name: pokeData.name,
            sprite: pokeData.sprites.front_default
        };
    };

    const loadPokemonCards = async () => {
        setLoading(true);
        let pokemonIds = [];
        while (pokemonIds.length < 20) {
            const newPokeId = Math.floor(Math.random() * 898) + 1;
            if (!usedIds.has(newPokeId)) { // Check if the poke ID has already been used
                pokemonIds.push(newPokeId);
                usedIds.add(newPokeId); // Add new ID to the set of used IDs
            }
        }
        setUsedIds(new Set([...usedIds, ...pokemonIds])); // Update the Set of used IDs

        const promises = pokemonIds.map(id => fetchPokemon(id));
        const pokemonData = await Promise.all(promises);
        setPokemonCards(pokemonData);
        setLoading(false);
    };

    useEffect(() => {
        loadPokemonCards();
    }, []);

    if (loading) return <div>Loading...</div>;
    return (
        <>
            <div className="trivia-decks">
                {pokemonCards.map((pokemon, index) => (
                    <Card key={index} front={<img src={pokemon.sprite} alt={pokemon.name} />}
                        back={pokemon.name} />
                ))}
            </div>
            <button onClick={loadPokemonCards}>Load New Pokemon</button>
        </>
    )
}

export default TriviaDecks;

    // const loadPokemonCards = async () => {
    //     setLoading(true);
    //     const pokemonIds = Array.from({ length: 20 }, () => Math.floor(Math.random() * 898) + 1);
    //     const promises = pokemonIds.map(id => fetchPokemon(id));
    //     const pokemonData = await Promise.all(promises);
    //     setPokemonCards(pokemonData);
    //     setLoading(false);
    // };