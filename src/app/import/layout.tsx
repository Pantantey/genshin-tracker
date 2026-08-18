import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Import Wish History — Genshin Wish Tracker",
  description: "Import your Genshin Impact wish history step by step.",
};

export default function ImportLayout({ children }: LayoutProps<"/import">) {
  return children;
}