import Script from "next/script";

export default function MissiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-muted/50 p-2 flex flex-col h-screen border-l border-muted">
      <Script
        src="https://integrations.missiveapp.com/missive.js"
        strategy="beforeInteractive"
      />
      {children}
    </main>
  );
}
