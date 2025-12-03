import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cornelia James - Product Feeds",
  description: "Product feed generation for marketing channels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

