import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YANIS' LERN-APP",
  description: "Lern-Äpp für Yanis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" font-sans="true">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
