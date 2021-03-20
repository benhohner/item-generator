import { Rarity } from "./Rarity";
import { BaseItem } from "./BaseItem";

export interface Item {
  name: string;
  id: string;
  uuid: string;
  rarity: Rarity;
  value: number;
  baseItem: BaseItem;
  mods: {};
}
