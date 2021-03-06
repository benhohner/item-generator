export type Tag =
  | "default"
  | "shield"
  | "ring"
  | "amulet"
  | "boots"
  | "bow"
  | "equipment"
  | "armour"
  | "weapon"
  | "wand"
  | "staff"
  | "mace"
  | "sword"
  | "dagger"
  | "claw"
  | "axe"
  | "body_armour"
  | "life_flask"
  | "mana_flask"
  | "hybrid_flask"
  | "flask"
  | "quiver"
  | "gloves"
  | "onehand"
  | "twohand"
  | "helmet"
  | "belt"
  | "gem"
  | "relic"
  | "not_str"
  | "not_dex"
  | "not_int"
  | "ranged"
  | "not_for_sale"
  | "caster"
  | "magic"
  | "rare"
  | "sceptre"
  | "str_armour"
  | "dex_armour"
  | "int_armour"
  | "str_dex_armour"
  | "str_int_armour"
  | "dex_int_armour"
  | "str_dex_int_armour"
  | "focus"
  | "utility_flask"
  | "critical_utility_flask"
  | "humanoid"
  | "mammal_beast"
  | "reptile_beast"
  | "skeleton"
  | "zombie"
  | "ghost"
  | "earth_elemental"
  | "water_elemental"
  | "demon"
  | "map"
  | "rapier"
  | "necromancer_raisable"
  | "lots_of_life"
  | "indoors_area"
  | "beach"
  | "dungeon"
  | "cave"
  | "forest"
  | "swamp"
  | "mountain"
  | "temple"
  | "urban"
  | "high_level_map"
  | "human"
  | "beast"
  | "undead"
  | "construct"
  | "insect"
  | "spider"
  | "undying"
  | "goatman"
  | "stone_construct"
  | "fishing_rod"
  | "one_hand_weapon"
  | "two_hand_weapon"
  | "atziri1"
  | "atziri2"
  | "drops_no_mods"
  | "drops_no_rares"
  | "drops_no_quality"
  | "drops_no_sockets"
  | "drops_not_dupeable"
  | "shore"
  | "darkshore"
  | "inland"
  | "prison"
  | "axis"
  | "cavern"
  | "southernforest"
  | "southernforest2"
  | "church"
  | "sins"
  | "forestdark"
  | "weavers"
  | "inca"
  | "city1"
  | "city2"
  | "city3"
  | "crematorium"
  | "catacombs"
  | "solaris"
  | "docks"
  | "sewers"
  | "barracks"
  | "lunaris"
  | "gardens"
  | "library"
  | "scepter"
  | "secret_area"
  | "limited_strongbox_benefits"
  | "red_blood"
  | "ghost_blood"
  | "mud_blood"
  | "insect_blood"
  | "bones"
  | "water"
  | "noblood"
  | "unusable_corpse"
  | "hidden_monster"
  | "devourer"
  | "wb_basic"
  | "wb_support"
  | "wb_elite"
  | "wb_leader"
  | "rare_minion"
  | "undeletable_corpse"
  | "jewel"
  | "strjewel"
  | "dexjewel"
  | "intjewel"
  | "gladiator"
  | "karui"
  | "flying"
  | "large_model"
  | "specific_weapon"
  | "two_handed_mod"
  | "dual_wielding_mod"
  | "shield_mod"
  | "one_handed_mod"
  | "melee_mod"
  | "twostonering"
  | "poison_zombie"
  | "divination_card"
  | "currency"
  | "no_divine"
  | "unique_map"
  | "low_tier_map"
  | "mid_tier_map"
  | "top_tier_map"
  | "old_map"
  | "act_boss_area"
  | "no_tempests"
  | "cannot_be_twinned"
  | "no_shroud_walker"
  | "no_echo"
  | "immobile"
  | "limited_tempests"
  | "small_staff"
  | "support_gem"
  | "level_capped_gem"
  | "no_effect_flask_mod"
  | "area_with_water"
  | "no_bloodlines"
  | "has_caster_mod"
  | "has_attack_mod"
  | "maraketh"
  | "uses_suicide_explode"
  | "cannot_be_monolith"
  | "no_zana_quests"
  | "atlas_base_type"
  | "ringatlas1"
  | "ringatlas2"
  | "amuletatlas1"
  | "amuletatlas2"
  | "beltatlas1"
  | "beltatlas2"
  | "helmetatlas1"
  | "bootsatlas1"
  | "bootsatlas2"
  | "bootsatlas3"
  | "glovesatlasstr"
  | "glovesatlasdex"
  | "glovesatlasint"
  | "shaped_map"
  | "no_boss"
  | "no_monster_packs"
  | "no_strongboxes"
  | "hall_of_grandmasters"
  | "vaults_of_atziri"
  | "cowards_trial"
  | "breach_map"
  | "breach_commander"
  | "breachstone"
  | "breachstone_splinter"
  | "god"
  | "unset_ring"
  | "no_leaguestone"
  | "chaos_warband"
  | "templar"
  | "cultist"
  | "female"
  | "str_shield"
  | "dex_shield"
  | "str_dex_shield"
  | "str_int_shield"
  | "dex_int_shield"
  | "currency_shard"
  | "harbinger_orb_shard"
  | "not_harbinger_minion"
  | "abyss_jewel_melee"
  | "abyss_jewel_ranged"
  | "abyss_jewel_caster"
  | "abyss_jewel_summoner"
  | "abyss_jewel"
  | "abyssal"
  | "unarmed"
  | "worlds_map"
  | "grants_crit_chance_support"
  | "no_legacy_of_zeal"
  | "bestiary_beast_boss"
  | "elder_occupied_map"
  | "bestiary_wilds"
  | "bestiary_sands"
  | "bestiary_caverns"
  | "bestiary_deep"
  | "no_cannot_die_aura"
  | "bestiary_net"
  | "up_to_level_2_gem"
  | "up_to_level_8_gem"
  | "essence"
  | "talisman"
  | "armour_divination"
  | "weapon_divination"
  | "jewellery_divination"
  | "delve_chest"
  | "incursion_monster"
  | "fire"
  | "cold"
  | "lightning"
  | "chaos"
  | "physical"
  | "poison"
  | "bleed"
  | "life"
  | "defences"
  | "elemental"
  | "attack"
  | "minion"
  | "aura"
  | "vaal"
  | "mana"
  | "speed"
  | "flat_life_regen"
  | "einharbeast"
  | "einharmonkey"
  | "einharcavespiders"
  | "einhardropbear"
  | "einharsnake"
  | "einharthornspiders"
  | "einharrhoa"
  | "einharbonerhoa"
  | "einharinsectspawner"
  | "einharspiker"
  | "einharkiweth"
  | "einharchimeral"
  | "einharvultureparasite"
  | "einharsandleaper"
  | "einharfuryhound"
  | "einharbull"
  | "einhargoatman"
  | "einharmountaingoat"
  | "einharshieldcrab"
  | "einharcrabparasite"
  | "einharparasite"
  | "einharscorpion"
  | "quality_currency"
  | "einharmaps"
  | "rusted_scarab"
  | "old_map_series"
  | "map_not_on_atlas"
  | "warehouse_area"
  | "act6_karui_area"
  | "kaom_area"
  | "daresso_area"
  | "library_area"
  | "marketplace_area"
  | "belly_area"
  | "solaris_area"
  | "prison_area"
  | "fields_area"
  | "chamber_of_sins_area"
  | "has_road_area"
  | "garden_area"
  | "dock_area"
  | "sewer_area"
  | "crossroad_area"
  | "catacomb_area"
  | "lunaris_outer_area"
  | "crypt_area"
  | "vaal_pyramid_area"
  | "forest_map_area"
  | "urban_sarn_area"
  | "aqueduct_area"
  | "thicket_area"
  | "bandit_area"
  | "pitfight_area"
  | "slums_area"
  | "lunaris_area"
  | "vaal_ruin_area"
  | "reef_area"
  | "mine_area"
  | "has_foxes_area"
  | "flooded_area"
  | "fetid_area"
  | "necropolis_area"
  | "sceptre_of_god_area"
  | "graveyard_area"
  | "den_area"
  | "river_area"
  | "ship_graveyard_area"
  | "tower_area"
  | "relic_area"
  | "dark_forest_area"
  | "parapet_area"
  | "cave_area"
  | "desert_area"
  | "arena_area"
  | "lightning_area"
  | "rain_area"
  | "snow_area"
  | "fire_area"
  | "mausoleum_area"
  | "wealthy_area"
  | "otherworldly_story_area"
  | "harvest_area"
  | "triple_boss_map"
  | "lighthouse_area"
  | "lunaris_blood_area"
  | "ruined_vaal_city_area"
  | "coast_boat_area"
  | "snow_mountain_area"
  | "synthesised_monster"
  | "has_damage_taken_as_mod"
  | "has_physical_conversion_mod"
  | "polished_scarab"
  | "gilded_scarab"
  | "high_gardens_area"
  | "crystal_ore_area"
  | "tropical_island_area"
  | "jungle_valley_area"
  | "wasteland_area"
  | "desert_map_area"
  | "mud_geyser_area"
  | "southern_forest_area"
  | "northern_forest_area"
  | "dried_lake_area"
  | "labyrinth_end_area"
  | "old_fields_area"
  | "archives_area"
  | "labyrinth_OH_area"
  | "temple_of_decay_area"
  | "arachnid_tomb_map_area"
  | "cemetery_map_area"
  | "quay_area"
  | "local_item_quality"
  | "synthesised_monster2"
  | "core_map_area"
  | "breachstone2"
  | "breachstone3"
  | "breachstone4"
  | "breach_blessing"
  | "corrupted_vaal"
  | "shaper_divination"
  | "elder_divination"
  | "fire_prison_area"
  | "synthesis_area"
  | "attack_staff"
  | "attack_dagger"
  | "spell_dodge_mod"
  | "legion_monster"
  | "has_percent_mana_mod"
  | "ringatlas3"
  | "ringatlas4"
  | "rare_monster_pack"
  | "weapon_can_roll_minion_modifiers"
  | "wandatlas1"
  | "has_atlas_mission"
  | "legion_splinter"
  | "has_mana_cost_mod"
  | "unique_shard"
  | "unique_shard_base"
  | "infected_map"
  | "can_be_infected_map"
  | "mushrune"
  | "blight_death_fire"
  | "blight_death_cold"
  | "blight_death_lightning"
  | "blight_death_physical"
  | "blight_death_chaos"
  | "blight_doesnt_engage"
  | "map_area_with_open_water"
  | "vile_areas"
  | "no_frenzy_charge_on_death"
  | "no_soul_conduit"
  | "no_fractured"
  | "grants_2h_support"
  | "no_prophecies"
  | "warstaff"
  | "expansion_jewel_large"
  | "expansion_jewel_medium"
  | "expansion_jewel_small"
  | "affliction_axe_and_sword_damage"
  | "affliction_mace_and_staff_damage"
  | "affliction_dagger_and_claw_damage"
  | "affliction_bow_damage"
  | "affliction_wand_damage"
  | "affliction_damage_with_two_handed_melee_weapons"
  | "affliction_attack_damage_while_dual_wielding_"
  | "affliction_attack_damage_while_holding_a_shield"
  | "affliction_attack_damage_"
  | "affliction_spell_damage"
  | "affliction_elemental_damage"
  | "affliction_physical_damage"
  | "affliction_fire_damage"
  | "affliction_lightning_damage"
  | "affliction_cold_damage"
  | "affliction_chaos_damage"
  | "affliction_minion_damage"
  | "affliction_fire_damage_over_time_multiplier"
  | "affliction_chaos_damage_over_time_multiplier"
  | "affliction_physical_damage_over_time_multiplier"
  | "affliction_cold_damage_over_time_multiplier"
  | "affliction_damage_over_time_multiplier"
  | "affliction_effect_of_non-damaging_ailments"
  | "affliction_aura_effect"
  | "affliction_curse_effect"
  | "affliction_damage_while_you_have_a_herald"
  | "affliction_minion_damage_while_you_have_a_herald"
  | "affliction_warcry_buff_effect"
  | "affliction_critical_chance"
  | "affliction_minion_life"
  | "affliction_area_damage"
  | "affliction_projectile_damage"
  | "affliction_trap_and_mine_damage"
  | "affliction_totem_damage"
  | "affliction_brand_damage"
  | "affliction_channelling_skill_damage"
  | "affliction_flask_duration"
  | "affliction_life_and_mana_recovery_from_flasks"
  | "affliction_maximum_life"
  | "affliction_maximum_energy_shield"
  | "affliction_maximum_mana"
  | "affliction_armour"
  | "affliction_evasion"
  | "affliction_chance_to_block"
  | "affliction_fire_resistance"
  | "affliction_cold_resistance"
  | "affliction_lightning_resistance"
  | "affliction_chaos_resistance"
  | "affliction_chance_to_dodge_attacks"
  | "affliction_strength"
  | "affliction_dexterity"
  | "affliction_intelligence"
  | "has_affliction_notable"
  | "map_device"
  | "jewelled_scarab"
  | "critical"
  | "heist_contract"
  | "evasion"
  | "energy_shield"
  | "power_charge"
  | "frenzy_charge"
  | "endurance_charge"
  | "damage"
  | "resistance"
  | "attribute"
  | "block"
  | "dodge"
  | "ailment"
  | "blue_herring"
  | "skill"
  | "support"
  | "curse"
  | "green_herring"
  | "red_herring"
  | "trinket"
  | "elemental_damage"
  | "physical_damage"
  | "resource"
  | "caster_damage"
  | "affliction_orb"
  | "affliction_splinter"
  | "catalyst"
  | "sextant"
  | "watchstone_item"
  | "watchstone_league"
  | "watchstone_environment"
  | "watchstone"
  | "no_maven"
  | "allow_maven"
  | "shaper_monster"
  | "elder_monster"
  | "eyrie_monster"
  | "basilisk_monster"
  | "crusader_monster"
  | "adjudicator_monster"
  | "maven_map"
  | "abyss_monster"
  | "influence_monster"
  | "blight_boss"
  | "no_possessed_foe";