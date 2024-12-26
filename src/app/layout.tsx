import type { FunctionComponent, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import TanstackQueryClientProvider from "~/components/query-client";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Parkrun pacer events",
  description: "The fastest way to build apps with Next.js and Supabase",
};

type Props = {
  children: ReactNode;
};

const RootLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <TanstackQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TanstackQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
