import { useQuery } from '@tanstack/react-query';
import { getPokemonsData, Pokemon} from '../services/PokemonAPI'; 

export const useGetPokemonData = (limit: number) => {
    const pokemonQueryKey = ['pokemons', { limit }] as const; 

    return useQuery<Pokemon[], Error, Pokemon[], typeof pokemonQueryKey>({
        queryKey: pokemonQueryKey, 
        queryFn: getPokemonsData,
    });
}