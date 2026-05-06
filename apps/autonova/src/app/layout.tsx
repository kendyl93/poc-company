import React from "react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "AutoNova",
  description: "Workspace-wired Next.js scaffold for the AutoNova client.",
} satisfies Metadata;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
