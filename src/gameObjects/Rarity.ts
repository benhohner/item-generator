export function getRarity(rarity: RarityIDs) {
  return rarities.find((i) => i.id === rarity);
}

export interface Rarity {
  id: RarityIDs;
  name: string;
  min_prefixes: number;
  max_prefixes: number;
  min_suffixes: number;
  num_suffixes: number;
  weight: number;
}

export type Rarities = Rarity[];

export type RarityIDs = "normal" | "enchant" | "maged" | "legendary";

export const rarities: Rarities = [
  {
    id: "normal",
    name: "Normal",
    min_prefixes: 0,
    max_prefixes: 0,
    min_suffixes: 0,
    num_suffixes: 0,
    weight: 600,
  },
  {
    id: "enchant",
    name: "Enchant",
    min_prefixes: 1,
    max_prefixes: 2,
    min_suffixes: 1,
    num_suffixes: 2,
    weight: 300,
  },
  {
    id: "maged",
    name: "Maged",
    min_prefixes: 2,
    max_prefixes: 3,
    min_suffixes: 2,
    num_suffixes: 3,
    weight: 100,
  },
  {
    id: "legendary",
    name: "Legendary",
    min_prefixes: 2,
    max_prefixes: 4,
    min_suffixes: 2,
    num_suffixes: 4,
    weight: 30,
  },
];
