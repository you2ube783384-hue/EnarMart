import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigiMarket - Premium Digital Products Marketplace",
  description: "Discover handcrafted fonts, graphics, templates, and more from talented creators worldwide. Everything you need to bring your creative vision to life.",
  keywords: ["digital products", "fonts", "graphics", "templates", "3D assets", "icons", "creative market", "stock photos"],
  authors: [{ name: "DigiMarket" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "DigiMarket - Premium Digital Products Marketplace",
    description: "Discover handcrafted fonts, graphics, templates, and more from talented creators worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiMarket - Premium Digital Products Marketplace",
    description: "Discover handcrafted fonts, graphics, templates, and more from talented creators worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
