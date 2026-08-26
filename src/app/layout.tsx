import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import AppShell from "@/components/layout/AppShell";
import { TestingSessionProvider } from "@/context/TestingSessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATM Testing Manager",
  description: "Create and manage ATM testing sessions, record results, and export reports to Excel.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeRegistry>
          <LanguageProvider>
            <TestingSessionProvider>
              <AppShell>{children}</AppShell>
            </TestingSessionProvider>
          </LanguageProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
