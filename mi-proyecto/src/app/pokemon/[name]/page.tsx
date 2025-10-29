import axios from 'axios';
import Link from 'next/link';

async function fetchPokemonData(name: string) {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return res.data;
}

export default async function PokemonPage({ params }: { params: { name: string } }) {
    const pokemonData = await fetchPokemonData(params.name);
    return (
        <main>
            <h1>{pokemonData.name}</h1>
        </main>
    );
}