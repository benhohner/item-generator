import { nanoid } from "nanoid";
import { Chance } from "chance";

import { GLOBALS } from "./Globals";
import { Item } from "./Item";
import { rarities } from "./Rarity";
import { baseItems } from "./BaseItem";
import MODS from "./data/mods.json";

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

function getItemName(itemPrototype): string {
  return `${
    itemPrototype.mods.prefix.length > 0
      ? itemPrototype.mods.prefix.map((i) => ":" + i.name).join(" ")
      : ""
  }${itemPrototype.mods.prefix.length > 0 ? " " : ""}${
    itemPrototype.baseItem.name
  }${itemPrototype.mods.suffix.length > 0 ? " " : ""}${
    itemPrototype.mods.suffix.length > 0
      ? itemPrototype.mods.suffix.map((i) => "/" + i.name).join(" ")
      : ""
  }`;
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

  const mods = {
    prefix: [],
    suffix: [],
  };

  // Generate normal items separately
  // Decide whether to enchant item (16% of time), if yes:
  if (isUpgraded()) {
    // Roll for rarity
    rarity = pickWeighted(rarities.slice(1)); // Not normal rarity

    // TODO: Pick a base item within your item level and rarity
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
    Array(num_mods)
      .fill(0)
      .forEach(() => {
        // flip a coin
        if (chance.bool()) {
          // heads add to prefix if possible
          mods.prefix.length < rarity.max_prefixes
            ? generate_mod("prefix")
            : generate_mod("suffix");
        } else {
          // tails add to suffix if possible
          mods.suffix.length < rarity.max_suffixes
            ? generate_mod("suffix")
            : generate_mod("prefix");
        }
      });

    function generate_mod(mod_type: "prefix" | "suffix") {
      const potential_mods = Object.values(MODS).filter((i) => {
        return (
          [mod_type as string].includes(i.generation_type) &&
          [baseItem.domain].includes(i.domain) &&
          ![...mods.prefix, ...mods.suffix]
            .map((x) => x.group)
            .includes(i.group)
        );
      });

      // Only create a prefix if there are applicable mods available
      if (potential_mods.length > 0) {
        mods[mod_type].push(chance.pickone(potential_mods));
      }
    }
  } else {
    rarity = pickWeighted(rarities.slice(0, 1)); // normal rarity
    baseItem = chance.pickone(Object.values(baseItems));
  }

  const itemPrototype = {
    uuid: nanoid(),
    rarity,
    baseItem,
    value:
      GLOBALS.ITEM.MATERIALS_VALUE() *
      (1 + mods.prefix.length + mods.suffix.length),
    mods,
  } as Partial<Item>;

  itemPrototype.name = getItemName(itemPrototype);
  itemPrototype.id = getItemID(itemPrototype);

  return [itemPrototype as Item];
}
