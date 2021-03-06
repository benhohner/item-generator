import { ItemClassID } from "./ItemClass";
import { Tag } from "./Tag";

export interface BaseItemProperty {
  armour?: number;
  energy_shield?: number;
  evasion?: number;
  movement_speed?: number;
  block?: number;
  description?: string;
  directions?: string;
  stack_size?: number;
  stack_size_currency_tab?: number;
  full_stack_turns_into?: string; // ItemID
  charges_max?: number;
  charges_per_use?: number;
  duration?: number;
  life_per_use?: number;
  mana_per_use?: number;
  attack_time?: number;
  critical_strike_chance?: number;
  physical_damage_max?: number;
  physical_damage_min?: number;
  range?: number;
}

export type BaseItemDomain =
  | "item"
  | "flask"
  | "crafted"
  | "delve"
  | "atlas"
  | "misc"
  | "abyss_jewel"
  | "affliction_jewel"
  | "map_device"
  | "area";

export interface BaseItemRequirement {
  level?: number;
  dexterity?: number;
  intelligence?: number;
  strength?: number;
}

export interface BaseItem {
  domain: BaseItemDomain;
  drop_level: number;
  implicits: string[];
  inventory_height: number;
  inventory_width: number;
  item_class: ItemClassID;
  name: string;
  properties: BaseItemProperty;
  release_state: "released" | "legacy" | "unreleased";
  requirements: BaseItemRequirement;
  tags: Tag[];
  visual_identity: {
    dds_file: string;
    id: string;
  };
}
