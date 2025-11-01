import axios from "axios";
import { QueryFunctionContext } from '@tanstack/react-query';

export type QueryKey = readonly [string, { limit: number }]; 

export type Pokemon = {
  name: string,
  url: string;
}

export const getPokemonsData = async (context: QueryFunctionContext<QueryKey>): Promise<Pokemon[]> => {
    const [_key, { limit }] = context.queryKey;
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
    const pokemones: Pokemon[] = response.data.results.map((n: Pokemon) => n);
    return pokemones;
}