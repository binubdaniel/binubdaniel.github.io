import { metadata } from "./metadata";
import { Analytics } from "@vercel/analytics/react";

export default function EvolveLayout({
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
