import { PokemonData} from "@/app/lib/database";

export const pokemonsService = {
  getAll: async (): Promise<PokemonData[]> => {
    const res = await fetch("/api/favorites");
    if (!res.ok) throw new Error("Error al obtener los pokemons");
    return res.json();
  },

  add: async (pokemon: {
    name: string;
    url:string
  }): Promise<PokemonData> => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al agregar el pokemon a favoritos");
    }
    return res.json();
  },

  remove: async (id: number): Promise<void> => {
    const res = await fetch(`/api/favorites/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar de favoritos al pokemon");
  },
};