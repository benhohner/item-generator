export interface Rarity {
  id: string;
  name: string;
  min_prefixes: number;
  max_prefixes: number;
  min_suffixes: number;
  num_suffixes: number;
  chance: number;
}

export type Rarities = Rarity[];

export const rarities: Rarities = [
  {
    id: "normal",
    name: "Normal",
    min_prefixes: 0,
    max_prefixes: 0,
    min_suffixes: 0,
    num_suffixes: 0,
    chance: 600,
  },
  {
    id: "enchant",
    name: "Enchant",
    min_prefixes: 1,
    max_prefixes: 2,
    min_suffixes: 1,
    num_suffixes: 2,
    chance: 300,
  },
  {
    id: "maged",
    name: "Maged",
    min_prefixes: 2,
    max_prefixes: 3,
    min_suffixes: 2,
    num_suffixes: 3,
    chance: 100,
  },
  {
    id: "legendary",
    name: "Legendary",
    min_prefixes: 2,
    max_prefixes: 4,
    min_suffixes: 2,
    num_suffixes: 4,
    chance: 50,
  },
];
