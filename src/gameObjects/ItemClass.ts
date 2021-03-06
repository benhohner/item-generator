export interface ItemClass {
  name: string;
}

export type ItemClasses = {
  [itemclassid in ItemClassID]: ItemClass;
};

export type ItemClassID =
  | "AbyssJewel"
  | "ActiveSkillGem"
  | "Amulet"
  | "AtlasRegionUpgradeItem"
  | "Belt"
  | "BodyArmour"
  | "Boots"
  | "Bow"
  | "Claw"
  | "Currency"
  | "Dagger"
  | "DelveSocketableCurrency"
  | "DelveStackableSocketableCurrency"
  | "DivinationCard"
  | "FishingRod"
  | "Gloves"
  | "HeistBlueprint"
  | "HeistContract"
  | "HeistEquipmentReward"
  | "HeistEquipmentTool"
  | "HeistEquipmentUtility"
  | "HeistEquipmentWeapon"
  | "HeistObjective"
  | "Helmet"
  | "HiddenItem"
  | "HideoutDoodad"
  | "HybridFlask"
  | "Incubator"
  | "IncursionItem"
  | "Jewel"
  | "LabyrinthItem"
  | "LabyrinthMapItem"
  | "LabyrinthTrinket"
  | "LargeRelic"
  | "Leaguestone"
  | "LifeFlask"
  | "ManaFlask"
  | "Map"
  | "MapFragment"
  | "MediumRelic"
  | "MetamorphosisDNA"
  | "Microtransaction"
  | "MiscMapItem"
  | "OneHandAxe"
  | "OneHandMace"
  | "OneHandSword"
  | "PantheonSoul"
  | "QuestItem"
  | "Quiver"
  | "Ring"
  | "RuneDagger"
  | "Sceptre"
  | "Shield"
  | "SmallRelic"
  | "StackableCurrency"
  | "Staff"
  | "SupportSkillGem"
  | "ThrustingOneHandSword"
  | "Trinket"
  | "TwoHandAxe"
  | "TwoHandMace"
  | "TwoHandSword"
  | "Unarmed"
  | "UniqueFragment"
  | "UniqueShard"
  | "UniqueShardBase"
  | "UtilityFlask"
  | "UtilityFlaskCritical"
  | "Wand"
  | "Warstaff";

export const itemClasses: ItemClasses = {
  AbyssJewel: {
    name: "Abyss Jewel",
  },
  ActiveSkillGem: {
    name: "Active Skill Gems",
  },
  Amulet: {
    name: "Amulets",
  },
  AtlasRegionUpgradeItem: {
    name: "Atlas Region Upgrade Item",
  },
  Belt: {
    name: "Belts",
  },
  BodyArmour: {
    name: "Body Armours",
  },
  Boots: {
    name: "Boots",
  },
  Bow: {
    name: "Bows",
  },
  Claw: {
    name: "Claws",
  },
  Currency: {
    name: "Currency",
  },
  Dagger: {
    name: "Daggers",
  },
  DelveSocketableCurrency: {
    name: "Delve Socketable Currency",
  },
  DelveStackableSocketableCurrency: {
    name: "Delve Stackable Socketable Currency",
  },
  DivinationCard: {
    name: "Divination Card",
  },
  FishingRod: {
    name: "Fishing Rods",
  },
  Gloves: {
    name: "Gloves",
  },
  HeistBlueprint: {
    name: "Blueprint",
  },
  HeistContract: {
    name: "Contract",
  },
  HeistEquipmentReward: {
    name: "Heist Brooch",
  },
  HeistEquipmentTool: {
    name: "Heist Tool",
  },
  HeistEquipmentUtility: {
    name: "Heist Cloak",
  },
  HeistEquipmentWeapon: {
    name: "Heist Gear",
  },
  HeistObjective: {
    name: "Heist Target",
  },
  Helmet: {
    name: "Helmets",
  },
  HiddenItem: {
    name: "Hidden Item",
  },
  HideoutDoodad: {
    name: "Hideout Doodads",
  },
  HybridFlask: {
    name: "Hybrid Flasks",
  },
  Incubator: {
    name: "Incubator",
  },
  IncursionItem: {
    name: "Incursion Item",
  },
  Jewel: {
    name: "Jewel",
  },
  LabyrinthItem: {
    name: "Labyrinth Item",
  },
  LabyrinthMapItem: {
    name: "Labyrinth Map Item",
  },
  LabyrinthTrinket: {
    name: "Labyrinth Trinket",
  },
  LargeRelic: {
    name: "Large Relics",
  },
  Leaguestone: {
    name: "Leaguestones",
  },
  LifeFlask: {
    name: "Life Flasks",
  },
  ManaFlask: {
    name: "Mana Flasks",
  },
  Map: {
    name: "Maps",
  },
  MapFragment: {
    name: "Map Fragments",
  },
  MediumRelic: {
    name: "Medium Relics",
  },
  MetamorphosisDNA: {
    name: "Metamorph Sample",
  },
  Microtransaction: {
    name: "Microtransactions",
  },
  MiscMapItem: {
    name: "Misc Map Items",
  },
  OneHandAxe: {
    name: "One Hand Axes",
  },
  OneHandMace: {
    name: "One Hand Maces",
  },
  OneHandSword: {
    name: "One Hand Swords",
  },
  PantheonSoul: {
    name: "Pantheon Soul",
  },
  QuestItem: {
    name: "Quest Items",
  },
  Quiver: {
    name: "Quivers",
  },
  Ring: {
    name: "Rings",
  },
  RuneDagger: {
    name: "Rune Daggers",
  },
  Sceptre: {
    name: "Sceptres",
  },
  Shield: {
    name: "Shields",
  },
  SmallRelic: {
    name: "Small Relics",
  },
  StackableCurrency: {
    name: "Stackable Currency",
  },
  Staff: {
    name: "Staves",
  },
  SupportSkillGem: {
    name: "Support Skill Gems",
  },
  ThrustingOneHandSword: {
    name: "Thrusting One Hand Swords",
  },
  Trinket: {
    name: "Trinkets",
  },
  TwoHandAxe: {
    name: "Two Hand Axes",
  },
  TwoHandMace: {
    name: "Two Hand Maces",
  },
  TwoHandSword: {
    name: "Two Hand Swords",
  },
  Unarmed: {
    name: "",
  },
  UniqueFragment: {
    name: "Piece",
  },
  UniqueShard: {
    name: "Shard",
  },
  UniqueShardBase: {
    name: "Shard Heart",
  },
  UtilityFlask: {
    name: "Utility Flasks",
  },
  UtilityFlaskCritical: {
    name: "Critical Utility Flasks",
  },
  Wand: {
    name: "Wands",
  },
  Warstaff: {
    name: "Warstaves",
  },
};

console.log(Object.keys(itemClasses));
