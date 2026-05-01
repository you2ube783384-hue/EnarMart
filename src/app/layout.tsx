import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiMarket - Premium Digital Products Marketplace",
  description: "Discover handcrafted fonts, graphics, templates, and more from talented creators worldwide. Everything you need to bring your creative vision to life.",
  keywords: ["digital products", "fonts", "graphics", "templates", "3D assets", "icons", "creative market", "stock photos"],
  authors: [{ name: "DigiMarket" }],
  icons: {
    icon: "/favicon.png",
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
        className={`${poppins.variable} ${dmSans.variable} antialiased bg-background text-foreground`}
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
