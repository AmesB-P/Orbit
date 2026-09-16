import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/jost";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbit — your day, with more breathing room",
  description: "A calm personal weekly and daily planner.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
