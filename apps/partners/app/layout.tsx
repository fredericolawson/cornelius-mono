import type { Metadata } from "next";
import "@workspace/ui/globals.css";
import { Toaster } from "sonner";
import { Navigation } from "@/components/shared/navigation";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://partners.corneliajames.com"),
  title: "Cornelia James for Partners",
  description: "Useful resources and assets for Cornelia James partners",
  openGraph: {
    title: "Cornelia James for Partners",
    description:
      "Useful resources and assets for Cornelia James partners. See our product gallery, image gallery, product data, and brand guide.",
    images: ["/brand.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image", //
    title: "Cornelia James for Partners",
    description:
      "Useful resources and assets for Cornelia James partners. See our product gallery, image gallery, product data, and brand guide.",
    images: ["/brand.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-muted/50">
        <main className="mx-auto max-w-4xl min-h-screen lg:max-w-7xl py-8 flex flex-col">
          <Navigation />
          {children}
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
