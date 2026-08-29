import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070709",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Connect - Engr. Sean Lloyd E. Casalme",
  description:
    "Founder & CEO of ChampZero Esports Organization & Entertainment Production. Full-Stack Web Developer, Digital Marketing Strategist, and Visual Designer with a strong Computer Engineering background.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  keywords: [
    "Engr. Sean Lloyd E. Casalme",
    "Engr. Sean Casalme",
    "Sean Lloyd E. Casalme",
    "Sean Casalme",
    "Founder CEO ChampZero",
    "ChampZero Esports Organization",
    "ChampZero Entertainment Production",
    "Full-Stack Web Developer",
    "Digital Marketing Strategist",
    "Visual Designer",
    "Computer Engineering",
    "Floodlock IoT",
    "STI College Batangas",
    "RadianTactics",
    "Red Hat Certified"
  ],
  authors: [{ name: "Engr. Sean Lloyd E. Casalme" }],
  openGraph: {
    title: "Connect - Engr. Sean Lloyd E. Casalme",
    description:
      "Founder & CEO of ChampZero Esports Organization & Entertainment Production. Full-Stack Web Developer and Visual Designer.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect - Engr. Sean Lloyd E. Casalme",
    description:
      "Founder & CEO of ChampZero Esports Organization & Entertainment Production. Full-Stack Web Developer and Visual Designer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${fontSans.variable} ${fontHeading.variable} ${fontMono.variable}`}>
      <body className="bg-[#070709] text-zinc-100 font-sans antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
