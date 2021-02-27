import { nanoid } from "nanoid";
import { GLOBALS } from "./Globals";

export function generateItem() {
  return {
    id: nanoid(),
    name: `Sword ${nanoid(4)}`,
    value: GLOBALS.ITEM.MATERIALS_VALUE(),
  };
}
