import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Nunito_Sans } from "next/font/google";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import "../styles/globals.css";
import "../styles/game-night.css";

const displayFont = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
});

const bodyFont = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Hoppra! — Party Game",
  description: "A fast, multilingual draw, explain, and act party game.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hoppra!",
  },
  icons: {
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17130e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
