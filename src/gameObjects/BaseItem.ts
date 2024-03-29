import { ItemClassID } from "./ItemClass";
import { Tag } from "./Tag";
import BASE_ITEMS from "./data/base_items.json";
export const baseItems: BaseItems = BASE_ITEMS as BaseItems;

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

/**
 * Domain is a primary key for for type of entity
 */
export type DomainNormalOnly = "crafted" | "delve" | "atlas";
export type DomainWithRarity = "item" | "flask" | "abyss_jewel";
export type BaseItemDomain =
  | "item"
  | "flask"
  // | "crafted"
  // | "delve"
  // | "atlas"
  // | "currency"
  // | "skill_gem"
  // | "divination_card"
  | "undefined"
  | "unknown4"
  | "misc"
  | "abyss_jewel"
  | "affliction_jewel"
  | "map_device" // Map Fragment
  | "area"; // Maps

export interface BaseItemRequirement {
  level?: number;
  dexterity?: number;
  intelligence?: number;
  strength?: number;
}

export interface BaseItem extends Object {
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
  [BaseItemKey: string]: any;
}

export interface BaseItems {
  [ItemID: string]: BaseItem;
}
