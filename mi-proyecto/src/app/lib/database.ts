import fs from "fs/promises"
import path from "path"

const DB_PATH = path.join(process.cwd(), "database.json");

export type PokemonData = {
    id: number;
    name: string,
    url: string;
    createdAt: string;
}

class Database{
    private async readDB(): Promise<PokemonData[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, devolver array vacío
      return [];
    }
  }

  private async writeDB(data: PokemonData[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<PokemonData[]> {
    return await this.readDB();
  }

  async getByID(id: number): Promise<PokemonData | undefined> {
    const data = await this.readDB();
    return data.find((item) => item.id === id);
  }

  async create(pokemon: Omit<PokemonData, "id" | "createdAt">): Promise<PokemonData> {
    const data = await this.readDB();

    const existingPokemon = data.find(p => p.name === pokemon.name);
    
    if(existingPokemon){
        return existingPokemon;
    }
    
    const newFavorite: PokemonData = {
        id: data.length > 0 ? Math.max(...data.map((p) => p.id)) + 1 : 1,
        ...pokemon,
        createdAt: new Date().toISOString(),
    };

    data.push(newFavorite);
    await this.writeDB(data);
    return newFavorite;
  }

  async delete(id: number): Promise<boolean> {
    const data = await this.readDB();
    const initialLength = data.length;
    const filtered = data.filter((item) => item.id !== id);
    
    if (filtered.length === initialLength) {
      return false; // No se encontró el elemento
    }
    
    await this.writeDB(filtered);
    return true;
  }


  async update(id: number, updates: Partial<Omit<PokemonData, "id" | "createdAt">>): Promise<PokemonData | null> {
    const data = await this.readDB();
    const index = data.findIndex((item) => item.id === id);
    
    if (index === -1) {
      return null;
    }
    
    data[index] = { ...data[index], ...updates };
    await this.writeDB(data);
    return data[index];
  }
}

export const db = new Database();