export type PokemonType = 'fire' | 'water' | 'grass' | 'electric' | 'normal';

// Tabela de multiplicadores: [Atacante][Defensor]
const typeEffectiveness: Record<PokemonType, Partial<Record<PokemonType, number>>> = {
  fire: { grass: 2, water: 0.5 },
  water: { fire: 2, grass: 0.5 },
  grass: { water: 2, fire: 0.5 },
  electric: { water: 2, grass: 0.5 },
  normal: {} // Dano neutro
};


interface BattleUnit {
  name: string;
  type: PokemonType;
  attack: number;
  defense: number;
}

export const calculateBattle = (attacker: BattleUnit, defender: BattleUnit) => {
  // Busca o multiplicador na nossa tabela
  const multiplier = typeEffectiveness[attacker.type]?.[defender.type] ?? 1;
  
  // Cálculo base
  const baseDamage = (attacker.attack / defender.defense) * 10;
  const finalDamage = Math.floor(baseDamage * multiplier);

  return {
    damage: finalDamage,
    multiplier,
    message: multiplier > 1 ? "É super efetivo!" : multiplier < 1 ? "Não é muito efetivo..." : "Dano normal."
  };
};