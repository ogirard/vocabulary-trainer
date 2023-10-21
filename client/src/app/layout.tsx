import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YANIS' LERN-APP",
  description: "Lern-Äpp für Yanis",
  authors: {
    name: "Olivier Girard",    
  },
  applicationName: "YANIS' LERN-APP",
  creator: "oli.girard@gmail.com"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" font-sans="true">
      <body className={robotoSlab.className}>{children}</body>
    </html>
  );
}
