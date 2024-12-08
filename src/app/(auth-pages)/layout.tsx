import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-7xl flex-col items-start gap-12">{children}</div>
  );
}
