import { nanoid } from "nanoid";
import { Chance } from "chance";

import { GLOBALS } from "./Globals";
import { Item } from "./Item";
import { rarities } from "./Rarity";
import { baseItems } from "./BaseItem";
import mods from "./data/mods.json";

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
          // heads add to prefixes if possible
          num_prefixes < rarity.max_prefixes ? num_prefixes++ : num_suffixes++;
        } else {
          // tails add to suffixes if possible
          num_suffixes < rarity.max_suffixes ? num_suffixes++ : num_prefixes++;
        }
      });

    // TODO: Fix bug when mods search returns no results
    // Generate Prefixes
    Array(num_prefixes)
      .fill(0)
      .forEach(() =>
        prefixes.push(
          chance.pickone(
            Object.values(mods).filter((i) => {
              return (
                ["prefix"].includes(i.generation_type) &&
                [baseItem.domain].includes(i.domain) &&
                ![...prefixes, ...suffixes]
                  .map((x) => x.group)
                  .includes(i.group)
              );
            })
          )
        )
      );

    // Generate Suffixes
    Array(num_suffixes)
      .fill(0)
      .forEach(() => {
        suffixes.push(
          chance.pickone(
            Object.values(mods).filter((i) => {
              return (
                ["suffix"].includes(i.generation_type) &&
                [baseItem.domain].includes(i.domain) &&
                ![...suffixes, ...prefixes]
                  .map((x) => x.group)
                  .includes(i.group)
              );
            })
          )
        );
      });
  } else {
    rarity = pickWeighted(rarities.slice(0, 1)); // normal rarity
    baseItem = chance.pickone(Object.values(baseItems));
  }

  const itemPrototype = {
    uuid: nanoid(),
    rarity,
    name: `${
      prefixes.length > 0 ? prefixes.map((i) => ":" + i.name).join(" ") : ""
    }${prefixes.length > 0 ? " " : ""}${baseItem.name}${
      suffixes.length > 0 ? " " : ""
    }${suffixes.length > 0 ? suffixes.map((i) => "/" + i.name).join(" ") : ""}`,
    value:
      GLOBALS.ITEM.MATERIALS_VALUE() * (1 + prefixes.length + suffixes.length),
  } as Partial<Item>;

  itemPrototype.id = getItemID(itemPrototype);

  return [itemPrototype as Item];
}
