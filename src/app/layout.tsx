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
  title: "EnarMart - Premium Canva Templates Store",
  description: "Discover beautiful, ready-to-edit Canva templates for resumes, social media, YouTube, presentations, and more. Download instantly and customize in minutes.",
  keywords: ["canva templates", "resume templates", "social media templates", "youtube thumbnails", "presentation templates", "canva", "digital templates"],
  authors: [{ name: "EnarMart" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "EnarMart - Premium Canva Templates Store",
    description: "Beautiful, ready-to-edit Canva templates for every project. Download instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EnarMart - Premium Canva Templates Store",
    description: "Beautiful, ready-to-edit Canva templates for every project.",
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
