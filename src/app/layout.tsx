import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { site } from "@/data/site";

const display = Bricolage_Grotesque({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const hand = Caveat({
  variable: "--font-hand-var",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Playfair_Display({
  variable: "--font-serif-var",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${hand.variable} ${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
