import axios from 'axios';
export const getPokemonData = async (name: string) => {
  // consumimos a API do PokeAPI para obter os dados do Pokémon
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  
  // Retornamos apenas o que importa (Data Transformation)
  return {
    id: response.data.id,
    name: response.data.name,
    types: response.data.types.map((t: any) => t.type.name),
    stats: response.data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat
    }))
  };
};