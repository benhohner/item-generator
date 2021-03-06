import { Tag } from "./Tag";

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
  generation_type: string;
  generation_weights: GenerationWeight[];
  grants_buff: {};
  grants_effects: GrantedEffect[];
  group: string;
  is_essence_only: boolean;
  name: string;
  required_level: number;
  spawn_weights: SpawnWeight[];
  stats: ModStat[];
  type: string;
}
