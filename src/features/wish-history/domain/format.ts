/**
 * Capitalize the first letter of each word, e.g. "alyosha" -> "Alyosha".
 * Kept here so the wish-history UI can show a friendly display name for
 * character slugs/names without duplicating the logic.
 */
export function capitalizeName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}