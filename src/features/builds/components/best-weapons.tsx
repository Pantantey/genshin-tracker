import { getWeaponIcon } from "../domain/build-icons";
import type { WeaponData } from "../data/characters-data";

/** Render a row of 3, 4 or 5 stars. */
function Stars({ count }: { count: 3 | 4 | 5 }) {
  return (
    <span aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

/**
 * "Best Weapons" panel: one row per recommended weapon, laid out in three
 * columns — name + stars, weapon icon, then damage/description.
 */
export function BestWeapons({ weapons }: { weapons: WeaponData[] }) {
  if (weapons.length === 0) {
    return <div className="min-h-[240px] p-4" />;
  }

  return (
    <ul className="space-y-4 p-4">
      {weapons.map((weapon, index) => {
        const icon = getWeaponIcon(weapon.name);
        return (
          <li
            key={`${weapon.name}-${index}`}
            className="grid grid-cols-1 items-center gap-4 rounded-lg border border-borders bg-bg-cards/50 py-4 px-25 sm:grid-cols-3"
          >
            {/* Column 1 — name + stars */}
            <div className="text-center">
              <p className="font-semibold text-text-black">{weapon.name}</p>
              <div className="mt-1 text-rarity-5-star">
                <Stars count={weapon.stars} />
              </div>
            </div>

            {/* Column 2 — weapon icon */}
            <div className="flex justify-center pe-18">
              {icon ? (
                // eslint-disable-next-line @next/next/no-img-element -- local static asset
                <img
                  src={icon}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
              ) : (
                <span className="text-xs text-text-black">—</span>
              )}
            </div>

            {/* Column 3 — main damage / secondary / description */}
            <div className="space-y-1 text-left">
              <p className="text-base font-bold text-text-black">
                {weapon.mainStat}
              </p>
              <p className="text-sm text-text-black">{weapon.secondaryStat}</p>
              <p className="text-sm text-text-black/80">{weapon.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}