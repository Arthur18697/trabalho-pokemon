import express from 'express';
import cors from 'cors';
import { getPokemonData } from './services/pokemonService';
import { calculateBattle } from './services/battleService';

console.log("🔥 SERVER TS ESTÁ SENDO EXECUTADO");
const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DETALHE DO POKEMON
========================= */
app.get('/pokemon/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const pokemon = await getPokemonData(name);
    return res.json(pokemon);
  } catch (error) {
    return res.status(404).json({ error: 'Pokémon não encontrado' });
  }
});

/* =========================
   LISTA DE POKEMONS
========================= */
app.get('/pokemons', async (req, res) => {
  try {
    const list = await Promise.all([
      getPokemonData('pikachu'),
      getPokemonData('charmander'),
      getPokemonData('bulbasaur'),
      getPokemonData('squirtle')
    ]);

    return res.json(list);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar pokémons' });
  }
});

/* =========================
   BATALHA
========================= */
app.post('/battle', (req, res) => {
  const { attacker, defender } = req.body;

  if (!attacker || !defender) {
    return res.status(400).json({ error: "Dados obrigatórios" });
  }

  const result = calculateBattle(attacker, defender);

  return res.json({
    battleLog: `${attacker.name} atacou ${defender.name}!`,
    ...result
  });
});

const PORT = 3333;
const BASE_URL = '192.168.0.7';

app.listen(PORT, BASE_URL, () => {
  console.log(`🚀 PokeServer rodando em http://${BASE_URL}:${PORT}`);
});