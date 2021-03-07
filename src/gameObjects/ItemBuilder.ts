import { nanoid } from "nanoid";
import { Chance } from "chance";

import { GLOBALS } from "./Globals";
import { Item } from "./Item";
import { rarities } from "./Rarity";
import { baseItems } from "./BaseItem";

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
  let baseItem;
  let num_mods = 0;
  let num_prefixes = 0;
  let num_suffixes = 0;
  let prefixes = [];
  let suffixes = [];

  // Generate normal items separately
  // Decide whether to enchant item (16% of time), if yes:
  if (isUpgraded()) {
    // Roll for rarity
    rarity = pickWeighted(rarities.slice(1)); // Not normal rarity

    // Get a base item that can be magic
    baseItem = chance.pickone(
      Object.values(baseItems).filter((i) =>
        ["item", "flask", "abyss_jewel", "area", "map_device"].includes(
          i.domain
        )
      )
    );

    num_mods = chance.integer({ min: rarity.min_mods, max: rarity.max_mods });

    // Randomly fill prefixes and suffixes
    Array(num_mods).forEach(() => {
      // flip a coin
      if (chance.bool()) {
        // heads add to prefixes if possible
        num_prefixes < rarity.max_prefixes ? num_prefixes++ : num_suffixes++;
      } else {
        // tails add to suffixes if possible
        num_suffixes < rarity.max_suffixes ? num_suffixes++ : num_prefixes++;
      }
    });
  } else {
    rarity = pickWeighted(rarities.slice(0, 1)); // normal rarity
    baseItem = chance.pickone(Object.values(baseItems));
  }

  // Pick a base item within your item level and rarity

  // Roll for number of mods

  // Pick mods

  const itemPrototype = {
    uuid: nanoid(),
    rarity,
    name: `${baseItem.name}`,
    value: GLOBALS.ITEM.MATERIALS_VALUE(),
  } as Partial<Item>;

  itemPrototype.id = getItemID(itemPrototype);

  return [itemPrototype as Item];
}
