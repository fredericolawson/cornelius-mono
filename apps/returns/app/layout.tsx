import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cornelia James | Returns & Store Credit",
  description: "Our returns and store credit portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-avenir antialiased">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-caslon text-center">
              Returns & Store Credit
            </h1>
          </div>
        </header>
        <main className="min-h-screen">
          <div className="container mx-auto max-w-4xl px-4 py-8">
            {children}
          </div>
        </main>
        <footer className="bg-white border-t py-6 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Cornelia James. All rights
            reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
