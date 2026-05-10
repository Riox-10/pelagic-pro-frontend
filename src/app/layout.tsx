import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PELAGIC PRO S.A.S | Produits de la mer à Dakhla",
  description:
    "PELAGIC PRO S.A.S est une société basée à Dakhla, spécialisée dans les produits de la mer, engagée envers la qualité, le sérieux et la satisfaction de ses clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
