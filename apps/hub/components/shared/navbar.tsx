import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-6">
        <h1 className="text-xl font-semibold">Cornelia James Price Engine</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/collections">Collections</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/prices">Prices</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
