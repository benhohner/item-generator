import { Tag } from "./Tag";

import { data } from "./data/mods";

export const mods: Mods = data as Mods;

export interface GenerationWeight {
  tag: string;
  weight: number;
}

export interface SpawnWeight {
  tag: string;
  weight: number;
}

export interface ModStat {
  id: string;
  max: number;
  min: number;
}

export interface GrantedEffect {
  granted_effect_id: string;
  level: number;
}

export interface Mod {
  adds_tags: Tag[];
  domain: string;
  generation_type:
    | "suffix"
    | "prefix"
    | "unique"
    | "enchantment"
    | "corrupted"
    | "blight_tower"
    | "tempest";
  generation_weights: GenerationWeight[];
  //grants_buff: {}; // Enable if buffs are wanted
  grants_effects: GrantedEffect[];
  group: string;
  name: string;
  required_level: number;
  spawn_weights: SpawnWeight[];
  stats: ModStat[];
  type: string;
}

export interface Mods {
  [ModID: string]: Mod;
}
