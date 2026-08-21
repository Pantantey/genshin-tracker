import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builds — Genshin-Info.site",
  description: "Character builds for Genshin Impact.",
};

export default function BuildsLayout({ children }: LayoutProps<"/builds">) {
  return children;
}