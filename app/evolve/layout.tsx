import { metadata } from "./metadata";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics /> {children}
    </>
  );
}

export { metadata };
