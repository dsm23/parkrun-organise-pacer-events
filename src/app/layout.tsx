import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import DeployButton from "~/components/deploy-button";
import { EnvVarWarning } from "~/components/env-var-warning";
import Footer from "~/components/footer";
import HeaderAuth from "~/components/header-auth";
import { hasEnvVars } from "~/utils/supabase/check-env-vars";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center gap-20">
              <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
                  <div className="flex items-center gap-5 font-semibold">
                    <Link href={"/"}>Next.js Supabase Starter</Link>
                    <div className="flex items-center gap-2">
                      <DeployButton />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <main className="flex max-w-5xl flex-col gap-20 p-5">
                {children}
              </main>
            </div>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
