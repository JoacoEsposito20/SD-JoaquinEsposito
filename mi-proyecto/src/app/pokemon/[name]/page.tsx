import axios from 'axios';
import PokemonCard from '@/app/components/PokemonCard'

type PokemonReference = {
    name: string;
    url: string;
}

type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

type TypeDetail = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

type PokemonData = {
    name: string;
    abilities: Ability[];
    spriteUrl: string | null;
    types: TypeDetail[];
}

type NextPageProps = {
    params: {
        name: string;
    };
}

async function getPokemonDetails(pokemonName: string): Promise<PokemonData> {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    
    const res = await axios.get(API_URL);
    const resultsAPI = res.data;
    const officialArtwork = resultsAPI.sprites.other['official-artwork'].front_default;
    const fallbackSprite = resultsAPI.sprites.front_default;
    const finalSprite = officialArtwork || fallbackSprite;

    const abilitiesAPI: Ability[] = resultsAPI.abilities;
    const typesAPI: TypeDetail[] = resultsAPI.types;

    return {
        name: resultsAPI.name,
        abilities: abilitiesAPI,
        spriteUrl: finalSprite, 
        types: typesAPI,
    };
}

export default async function PokemonDataPage({ params }: NextPageProps) {
  const pokemonIdentifier = (await params).name; 
  let pokemonData: PokemonData;

  try {
      pokemonData = await getPokemonDetails(pokemonIdentifier);
  } catch (error) {
      console.error(`Error al cargar los datos de ${pokemonIdentifier}:`, error);
      return (
        <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
            <p className="text-red-600 font-bold">Error: No se pudo encontrar el Pokémon "{pokemonIdentifier}".</p>
        </div>
      );
  }
  
  return (
    <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
      <PokemonCard {...pokemonData} />
    </div>
  );
}