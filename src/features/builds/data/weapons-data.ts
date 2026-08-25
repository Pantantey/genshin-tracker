/**
 * Builds feature — weapon registry.
 *
 * Single source of truth for every weapon's stats. Characters reference weapons
 * by name in `characters-data.ts` (`weapons: ["Absolution", ...]`) and the full
 * weapon data is resolved from here, so a weapon is defined only once even when
 * many characters use it.
 */

export interface WeaponData {
  /** English name — used as the registry key, for icon resolution and lookup. */
  name: string;
  /** i18n key for the display name in the active language. */
  nameKey: string;
  /** 3, 4 or 5 stars. */
  stars: 3 | 4 | 5;
  /** i18n key for the main stat label (see `lib/i18n`). */
  mainStat: string;
  /** i18n key for the secondary stat label. */
  secondaryStat: string;
  /** i18n key for the weapon description. */
  description: string;
}

export const WEAPONS_DATA: Record<string, WeaponData> = {
  Absolution: {
    name: "Absolution",
    nameKey: "weapons.absolution.name",
    stars: 5,
    mainStat: "weapons.absolution.mainStat",
    secondaryStat: "weapons.absolution.secondaryStat",
    description: "weapons.absolution.description",
  },
  "Engulfing Lightning": {
    name: "Engulfing Lightning",
    nameKey: "weapons.engulfing_lightning.name",
    stars: 5,
    mainStat: "weapons.engulfing_lightning.mainStat",
    secondaryStat: "weapons.engulfing_lightning.secondaryStat",
    description: "weapons.engulfing_lightning.description",
  },
  "Symphonist of Scents": {
    name: "Symphonist of Scents",
    nameKey: "weapons.symphonist_of_scents.name",
    stars: 5,
    mainStat: "weapons.symphonist_of_scents.mainStat",
    secondaryStat: "weapons.symphonist_of_scents.secondaryStat",
    description: "weapons.symphonist_of_scents.description",
  },
  "Skyward Spine": {
    name: "Skyward Spine",
    nameKey: "weapons.skyward_spine.name",
    stars: 5,
    mainStat: "weapons.skyward_spine.mainStat",
    secondaryStat: "weapons.skyward_spine.secondaryStat",
    description: "weapons.skyward_spine.description",
  },
  "Favonius Lance": {
    name: "Favonius Lance",
    nameKey: "weapons.favonius_lance.name",
    stars: 4,
    mainStat: "weapons.favonius_lance.mainStat",
    secondaryStat: "weapons.favonius_lance.secondaryStat",
    description: "weapons.favonius_lance.description",
  },
  Frostbreath: {
    name: "Frostbreath",
    nameKey: "weapons.frostbreath.name",
    stars: 4,
    mainStat: "weapons.frostbreath.mainStat",
    secondaryStat: "weapons.frostbreath.secondaryStat",
    description: "weapons.frostbreath.description",
  },
  "Crimson Moon's Semblance": {
    name: "Crimson Moon's Semblance",
    nameKey: "weapons.crimson_moons_semblance.name",
    stars: 5,
    mainStat: "weapons.crimson_moons_semblance.mainStat",
    secondaryStat: "weapons.crimson_moons_semblance.secondaryStat",
    description: "weapons.crimson_moons_semblance.description",
  },
  "Staff of the Scarlet Sands": {
    name: "Staff of the Scarlet Sands",
    nameKey: "weapons.staff_of_the_scarlet_sands.name",
    stars: 5,
    mainStat: "weapons.staff_of_the_scarlet_sands.mainStat",
    secondaryStat: "weapons.staff_of_the_scarlet_sands.secondaryStat",
    description: "weapons.staff_of_the_scarlet_sands.description",
  },
  "Staff of Homa": {
    name: "Staff of Homa",
    nameKey: "weapons.staff_of_homa.name",
    stars: 5,
    mainStat: "weapons.staff_of_homa.mainStat",
    secondaryStat: "weapons.staff_of_homa.secondaryStat",
    description: "weapons.staff_of_homa.description",
  },
  "Primordial Jade Winged-Spear": {
    name: "Primordial Jade Winged-Spear",
    nameKey: "weapons.primordial_jade_winged_spear.name",
    stars: 5,
    mainStat: "weapons.primordial_jade_winged_spear.mainStat",
    secondaryStat: "weapons.primordial_jade_winged_spear.secondaryStat",
    description: "weapons.primordial_jade_winged_spear.description",
  },
  "Missive Windspear": {
    name: "Missive Windspear",
    nameKey: "weapons.missive_windspear.name",
    stars: 5,
    mainStat: "weapons.missive_windspear.mainStat",
    secondaryStat: "weapons.missive_windspear.secondaryStat",
    description: "weapons.missive_windspear.description",
  },
  "Whitelake Frostfeather": {
    name: "Whitelake Frostfeather",
    nameKey: "weapons.whitelake_frostfeather.name",
    stars: 5,
    mainStat: "weapons.whitelake_frostfeather.mainStat",
    secondaryStat: "weapons.whitelake_frostfeather.secondaryStat",
    description: "weapons.whitelake_frostfeather.description",
  },
  "Primordial Jade Cutter": {
    name: "Primordial Jade Cutter",
    nameKey: "weapons.primordial_jade_cutter.name",
    stars: 5,
    mainStat: "weapons.primordial_jade_cutter.mainStat",
    secondaryStat: "weapons.primordial_jade_cutter.secondaryStat",
    description: "weapons.primordial_jade_cutter.description",
  },
  Azurelight: {
    name: "Azurelight",
    nameKey: "weapons.azurelight.name",
    stars: 5,
    mainStat: "weapons.azurelight.mainStat",
    secondaryStat: "weapons.azurelight.secondaryStat",
    description: "weapons.azurelight.description",
  },
  Emberwell: {
    name: "Emberwell",
    nameKey: "weapons.emberwell.name",
    stars: 4,
    mainStat: "weapons.emberwell.mainStat",
    secondaryStat: "weapons.emberwell.secondaryStat",
    description: "weapons.emberwell.description",
  },
  "Finale of the Deep": {
    name: "Finale of the Deep",
    nameKey: "weapons.finale_of_the_deep.name",
    stars: 4,
    mainStat: "weapons.finale_of_the_deep.mainStat",
    secondaryStat: "weapons.finale_of_the_deep.secondaryStat",
    description: "weapons.finale_of_the_deep.description",
  },
  "A Teaspoon of Transcendence": {
    name: "A Teaspoon of Transcendence",
    nameKey: "weapons.a_teaspoon_of_transcendence.name",
    stars: 5,
    mainStat: "weapons.a_teaspoon_of_transcendence.mainStat",
    secondaryStat: "weapons.a_teaspoon_of_transcendence.secondaryStat",
    description: "weapons.a_teaspoon_of_transcendence.description",
  },
  "A Thousand Blazing Suns": {
    name: "A Thousand Blazing Suns",
    nameKey: "weapons.a_thousand_blazing_suns.name",
    stars: 5,
    mainStat: "weapons.a_thousand_blazing_suns.mainStat",
    secondaryStat: "weapons.a_thousand_blazing_suns.secondaryStat",
    description: "weapons.a_thousand_blazing_suns.description",
  },
  "Redhorn Stonethresher": {
    name: "Redhorn Stonethresher",
    nameKey: "weapons.redhorn_stonethresher.name",
    stars: 5,
    mainStat: "weapons.redhorn_stonethresher.mainStat",
    secondaryStat: "weapons.redhorn_stonethresher.secondaryStat",
    description: "weapons.redhorn_stonethresher.description",
  },
  "Mailed Flower": {
    name: "Mailed Flower",
    nameKey: "weapons.mailed_flower.name",
    stars: 4,
    mainStat: "weapons.mailed_flower.mainStat",
    secondaryStat: "weapons.mailed_flower.secondaryStat",
    description: "weapons.mailed_flower.description",
  },
  "Tidal Shadow": {
    name: "Tidal Shadow",
    nameKey: "weapons.tidal_shadow.name",
    stars: 4,
    mainStat: "weapons.tidal_shadow.mainStat",
    secondaryStat: "weapons.tidal_shadow.secondaryStat",
    description: "weapons.tidal_shadow.description",
  },
};

/** Lookup a weapon by its exact name. Returns undefined for unknown weapons. */
export function getWeaponData(name: string): WeaponData | undefined {
  return WEAPONS_DATA[name];
}
