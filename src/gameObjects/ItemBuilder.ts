import { nanoid } from "nanoid";
import { Chance } from "chance";

import { GLOBALS } from "./Globals";
import { rarities } from "./Rarity";

// Initialize Chance
const chance = new Chance();

/**
 * Requires an array of objects where each object has a `weight`
 * key with an integer specifying how many rolls the item has.
 *
 * @return {Object}
 */
export function pickWeighted(arr) {
  const choices = arr.filter((i) => i.weight !== 0);
  return chance.weighted(
    choices,
    choices.map((i) => i.weight)
  );
}

export function isUpgraded() {
  return chance.bool({ likelihood: GLOBALS.ITEM.UPGRADE_CHANCE });
}

export function generateItems() {
  if (isUpgraded()) {
    const rarity = pickWeighted(rarities.slice(1)); // Not normal rarity
  } else {
    const rarity = pickWeighted(rarities[0]); // normal rarity
  }

  if (isUpgraded()) {
    return [
      {
        id: nanoid(),
        name: `Magic Sword ${nanoid(4)}`,
        value: GLOBALS.ITEM.MATERIALS_VALUE(),
      },
    ];
  }
  return [
    {
      id: nanoid(),
      name: `Sword ${nanoid(4)}`,
      value: GLOBALS.ITEM.MATERIALS_VALUE(),
    },
  ];
}

// Decide whether to enchant item (16% of time), if yes:
// Roll for rarity
// Pick a base item within your item level and rarity
// Roll for number of mods
// Pick mods

// Generate item
export interface Item {
  name: string;
  id: string;
  uuid: string;
  rarity: string;
}
