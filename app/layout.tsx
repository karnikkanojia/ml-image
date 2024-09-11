import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "X-Ray Insight: AI-Powered Disease Probability Analysis",
  description: "Chest Xray diagnosis using torchxrayvision",
  openGraph: {
    siteName: 'X-Ray Insight',
    title: 'X-Ray Insight: AI-Powered Disease Probability Analysis',
    description:
      'Chest Xray diagnosis using torchxrayvision',
    type: 'website',
    locale: 'en-US',
    images: {
      url: '/demo_chest.png',
      width: 1200,
      height: 630,
      alt: 'X-Ray Insight Preview',
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
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
