/**
 * Builds feature — artifact set registry.
 *
 * Single source of truth for every artifact set's images and set bonuses.
 * Characters reference artifact sets by key in `characters-data.ts`
 * (`artifact: ["scholar"]` or `artifact: ["noblesse_oblige", "heart_of_the_furnace"]`)
 * and the full set data is resolved from here.
 */

export interface ArtifactData {
  /** English key used to reference and identify this set. */
  key: string;
  /** i18n key for the display name in the active language. */
  nameKey: string;
  /** 1 or 2 artifact image names from `public/icons/artifacts`. */
  files: string[];
  /** i18n key for the 2-piece artifact set bonus text. */
  twoPieceBonus: string;
  /** i18n key for the 4-piece artifact set bonus text. */
  fourPieceBonus: string;
}

export const ARTIFACTS_DATA: Record<string, ArtifactData> = {
  scholar: {
    key: "scholar",
    nameKey: "artifacts.scholar.name",
    files: ["scholar.webp", ""],
    twoPieceBonus: "artifacts.scholar.twoPieceBonus",
    fourPieceBonus: "artifacts.scholar.fourPieceBonus",
  },
  noblesse_oblige: {
    key: "noblesse_oblige",
    nameKey: "artifacts.noblesse_oblige.name",
    files: ["noblesse_oblige.webp", ""],
    twoPieceBonus: "artifacts.noblesse_oblige.twoPieceBonus",
    fourPieceBonus: "artifacts.noblesse_oblige.fourPieceBonus",
  },
  fragment_of_harmonic_whimsy: {
    key: "fragment_of_harmonic_whimsy",
    nameKey: "artifacts.fragment_of_harmonic_whimsy.name",
    files: ["fragment_of_harmonic_whimsy.webp", ""],
    twoPieceBonus: "artifacts.fragment_of_harmonic_whimsy.twoPieceBonus",
    fourPieceBonus: "artifacts.fragment_of_harmonic_whimsy.fourPieceBonus",
  },
  heart_of_the_furnace: {
    key: "heart_of_the_furnace",
    nameKey: "artifacts.heart_of_the_furnace.name",
    files: ["heart_of_the_furnace.webp", ""],
    twoPieceBonus: "artifacts.heart_of_the_furnace.twoPieceBonus",
    fourPieceBonus: "artifacts.heart_of_the_furnace.fourPieceBonus",
  },
  Disenchantment_in_Deep_Shadow: {
    key: "Disenchantment_in_Deep_Shadow",
    nameKey: "artifacts.Disenchantment_in_Deep_Shadow.name",
    files: ["disenchantment_in_deep_shadow.webp", ""],
    twoPieceBonus: "artifacts.Disenchantment_in_Deep_Shadow.twoPieceBonus",
    fourPieceBonus: "artifacts.Disenchantment_in_Deep_Shadow.fourPieceBonus",
  },
  night_of_the_skys_unveiling: {
    key: "night_of_the_skys_unveiling",
    nameKey: "artifacts.night_of_the_skys_unveiling.name",
    files: ["night_of_the_skys_unveiling.webp", ""],
    twoPieceBonus: "artifacts.night_of_the_skys_unveiling.twoPieceBonus",
    fourPieceBonus: "artifacts.night_of_the_skys_unveiling.fourPieceBonus",
  },
  aubade_of_morningstar_and_moon: {
    key: "aubade_of_morningstar_and_moon",
    nameKey: "artifacts.aubade_of_morningstar_and_moon.name",
    files: ["aubade_of_morningstar_and_moon.webp", ""],
    twoPieceBonus: "artifacts.aubade_of_morningstar_and_moon.twoPieceBonus",
    fourPieceBonus: "artifacts.aubade_of_morningstar_and_moon.fourPieceBonus",
  },
};

/** Lookup an artifact set by its key. Returns undefined for unknown sets. */
export function getArtifactData(key: string): ArtifactData | undefined {
  return ARTIFACTS_DATA[key];
}
