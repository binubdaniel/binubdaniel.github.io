import { metadata } from './metadata'
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react"
import { StructuredData, BinuBabuPersonSchema, WebsiteSchema } from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData type="Person" data={BinuBabuPersonSchema} />
        <StructuredData type="WebPage" data={WebsiteSchema} />
      </head>
      <Analytics />
      <body className={inter.className}>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


export { metadata }
