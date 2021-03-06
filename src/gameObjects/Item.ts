import { Rarity } from "./Rarity";

export interface Item {
  name: string;
  id: string;
  uuid: string;
  rarity: Rarity;
  mods: [];
}
