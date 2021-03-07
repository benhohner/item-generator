export function getRarity(rarity: RarityIDs) {
  return rarities.find((i) => i.id === rarity);
}

export interface Rarity {
  id: RarityIDs;
  name: string;
  min_mods: number;
  max_mods: number;
  max_prefixes: number;
  max_suffixes: number;
  weight: number;
}

export type Rarities = Rarity[];

export type RarityIDs = "normal" | "enchanted" | "maged" | "legendary";

export const rarities: Rarities = [
  {
    id: "normal",
    name: "Normal",
    min_mods: 0,
    max_mods: 0,
    max_prefixes: 0,
    max_suffixes: 0,
    weight: 600,
  },
  {
    id: "enchanted",
    name: "Enchanted",
    min_mods: 1,
    max_mods: 2,
    max_prefixes: 1,
    max_suffixes: 1,
    weight: 300,
  },
  {
    id: "maged",
    name: "Maged",
    min_mods: 1,
    max_mods: 4,
    max_prefixes: 2,
    max_suffixes: 2,
    weight: 100,
  },
  {
    id: "legendary",
    name: "Legendary",
    min_mods: 1,
    max_mods: 6,
    max_prefixes: 3,
    max_suffixes: 3,
    weight: 30,
  },
];
