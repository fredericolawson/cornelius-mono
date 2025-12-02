import { LogoutButton } from "../logout-button";

export async function Footer() {
  return (
    <footer className="flex justify-center py-4 border-t mt-auto">
      <LogoutButton />
    </footer>
  );
}
