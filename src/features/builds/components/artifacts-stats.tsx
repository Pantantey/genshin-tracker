import type { ArtifactSlot, CharacterInfo } from "../domain/characters";
import {
  getArtifactIcon,
  getStatPieceIcon,
  type StatPiece,
} from "../domain/build-icons";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import type { Theme } from "@/hooks/use-theme";
import type { TranslationKey } from "@/lib/i18n";

/** Header cell for the "RECOMMENDED STATS" boxes. */
interface StatCell {
  value: string;
}

/**
 * "Artifacts & Stats" panel: a centered "Best Artifact" title, the artifact set
 * (icon + name), its 2/4-piece bonuses, the three themed artifact pieces with
 * their offered stats, and the priority/recommended stats sections.
 */
export function ArtifactsStats({ character }: { character: CharacterInfo }) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const cells: StatCell[] = [
    { value: character.recommendedStats.mastery },
    { value: character.recommendedStats.critRate },
    { value: character.recommendedStats.critDmg },
    { value: character.recommendedStats.er },
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-4 my-5">
      {/* Title */}
      <h2 className="text-center text-lg font-bold uppercase tracking-wide text-text-black">
        {t("builds.bestArtifact" as TranslationKey)}
      </h2>

      {/* Artifact set(s): with a single set show 2-piece and 4-piece; with two show each set's 2-piece stacked */}
      <div className="w-full max-w-[480px]">
        {character.artifactSets.length === 0 ? (
          <p className="text-center text-xs text-text-black">—</p>
        ) : character.artifactSets.length === 1 ? (
          <SingleArtifact set={character.artifactSets[0]} />
        ) : (
          <div className="flex flex-col gap-6">
            {character.artifactSets.map((set, idx) => (
              <ArtifactRow key={idx} set={set} />
            ))}
          </div>
        )}
      </div>

      {/* Artifact pieces (theme-dependent icons), side by side, same width as stats table */}
      <div className="flex w-full max-w-[480px] items-stretch justify-center gap-4">
        <StatPieceCard
          piece="sand"
          stat={character.sandStat}
          label={t("builds.statSand" as TranslationKey)}
          theme={theme}
        />
        <StatPieceCard
          piece="caliz"
          stat={character.gobletStat}
          label={t("builds.statGoblet" as TranslationKey)}
          theme={theme}
        />
        <StatPieceCard
          piece="crown"
          stat={character.circletStat}
          label={t("builds.statCirclet" as TranslationKey)}
          theme={theme}
        />
      </div>

      {/* Priority stats */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-text-black">
          {t("builds.priorityStats" as TranslationKey)}
        </h3>
        <p className="text-center text-base text-text-black">
          {character.priorityStats}
        </p>
      </div>

      {/* Recommended stats (title inside the box, 2x2 table with line separators) */}
      <div className="w-full max-w-[480px] overflow-hidden rounded-lg border border-borders bg-borders">
        <div className="border-b border-borders bg-recommended-bg px-4 py-2 text-center">
          <h3 className="text-sm font-bold uppercase tracking-wide text-text-black">
            {t("builds.recommendedStats" as TranslationKey)}
          </h3>
        </div>
        <div className="grid w-full grid-cols-2 gap-px">
          {cells.map((cell) => (
            <div
              key={cell.value}
              className="flex items-center justify-center bg-recommended-bg px-4 py-3 text-center"
            >
              <span className="text-base font-bold text-text-black">
                {cell.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Column layout: artifact name centered on top, icon (left) + bonus text(s) below. */
function SingleArtifact({ set }: { set: ArtifactSlot }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl font-semibold text-text-black">
        {t(set.nameKey as TranslationKey)}
      </p>
      <div className="flex w-full items-center gap-6">
        <div className="flex w-1/3 flex-col items-center justify-center text-center">
          <ArtifactImage set={set} />
        </div>
        <div className="flex w-2/3 flex-col items-start gap-2">
          <p className="text-left text-base text-text-black">
            {t(set.twoPieceBonus as TranslationKey)}
          </p>
          <p className="text-left text-base text-text-black">
            {t(set.fourPieceBonus as TranslationKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

/** One row of an artifact set: name centered on top, icon (left) + bonus text below. */
function ArtifactRow({ set }: { set: ArtifactSlot }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-lg font-semibold text-text-black">
        {t(set.nameKey as TranslationKey)}
      </p>
      <div className="flex w-full items-center gap-6">
        <div className="flex w-1/3 flex-col items-center justify-center text-center">
          <ArtifactImage set={set} />
        </div>
        <div className="flex w-2/3 flex-col items-start">
          <p className="text-left text-base text-text-black">
            {t(set.twoPieceBonus as TranslationKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

/** The first artifact image of a set, or a dash when absent. */
function ArtifactImage({ set }: { set: ArtifactSlot }) {
  const { t } = useLanguage();
  const file = set.files[0] ?? "";
  const icon = getArtifactIcon(file);
  if (!icon) {
    return <span className="text-xs text-text-black">—</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local static asset
    <img
      src={icon}
      alt={t(set.nameKey as TranslationKey)}
      className="h-20 w-20 shrink-0 object-contain"
    />
  );
}

/** One artifact-piece cell: themed icon with its offered stat below. */
function StatPieceCard({
  piece,
  stat,
  label,
  theme,
}: {
  piece: StatPiece;
  stat: string;
  label: string;
  theme: Theme;
}) {
  const icon = getStatPieceIcon(piece, theme);
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-lg border border-borders bg-bg-cards/40 p-4 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
      <img src={icon} alt={label} className="h-16 w-16 shrink-0 object-contain" />
      <span className="text-xs uppercase tracking-wide text-text-black/80">
        {label}
      </span>
      <span className="mt-auto text-sm font-semibold text-text-black">{stat}</span>
    </div>
  );
}