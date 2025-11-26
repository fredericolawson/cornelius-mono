import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@workspace/ui/components/sonner";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Cornelia James Price Engine",
  description: "Visualise and update CJ prices & COGs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-muted/50 min-h-svh flex flex-col">
        <main className="mx-auto flex max-w-6xl flex-col items-center justify-center p-6">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
// test
