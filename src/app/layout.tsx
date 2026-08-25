import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genshin-Info.site",
  description: "Track your Genshin Impact journey. Analyze your wish history and explore optimized character builds, weapons, and artifact recommendations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* The theme class is applied by useTheme (hooks/use-theme.ts) in a
            useLayoutEffect, which runs before the first paint. A synchronous
            <script> would be a hydratable script tag inside the React tree
            (React 19 does not execute scripts rendered as children). */}
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
