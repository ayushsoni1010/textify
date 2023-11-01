import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Textify",
  description:
    "Seamlessly transcribing the world, one spoken word at a time, in any language you desire.",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={cn(
            "flex min-h-screen font-sans antialiased",
            fontSans.variable
          )}
          suppressHydrationWarning
        >
          <Sidebar />
          {children}
        </body>
      </html>
    </>
  );
}
