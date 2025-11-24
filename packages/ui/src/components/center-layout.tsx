export function CenterLayout({ children }: { children: React.ReactNode }) {
  return <div className="gap-4 flex flex-col justify-center items-center h-full flex-1">{children}</div>
}
