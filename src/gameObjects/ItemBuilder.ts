import { nanoid } from "nanoid";
import { Chance } from "chance";

import { GLOBALS } from "./Globals";
import { Item } from "./Item";
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

function getItemID(itemPrototype): string {
  return `Item/IDNotImplemented/${itemPrototype.uuid}`;
}

// Rarity roll to determine rarity
// Base items including currency
//  return
// Magic items
//  Generate base item
//  record item domain
//  pick a random number of prefix and suffix mods within item domain
//  pick prefixes making sure there aren't two of same mod family
//  pick ""
//    roll mod stats

// TODO: Investigate implementing builder pattern
export function generateItems(): Item[] {
  let rarity;

  // Generate normal items separately
  // Decide whether to enchant item (16% of time), if yes:
  if (isUpgraded()) {
    // Roll for rarity
    rarity = pickWeighted(rarities.slice(1)); // Not normal rarity
  } else {
    rarity = pickWeighted(rarities.slice(0, 1)); // normal rarity
  }

  // Pick a base item within your item level and rarity

  // Roll for number of mods

  // Pick mods

  const itemPrototype = {
    uuid: nanoid(),
    rarity,
    name: `${rarity.name} Sword ${nanoid(4)}`,
    value: GLOBALS.ITEM.MATERIALS_VALUE(),
  } as Partial<Item>;

  itemPrototype.id = getItemID(itemPrototype);

  return [itemPrototype as Item];
}
