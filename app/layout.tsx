import type React from "react";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DemoProviders } from "./providers";
import { demoTheme } from "../src/core/theme/design-system";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={demoTheme}>
            <CssBaseline />
            <DemoProviders>{children}</DemoProviders>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

import "./globals.css";
