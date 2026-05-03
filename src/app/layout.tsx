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

/* ═══════════════════════════════════════════════════════════════════════════════
   SEO: Google & Bing Verification
   ═══════════════════════════════════════════════════════════════════════════════
   
   AFTER deploying your site, you need to verify ownership with Google and Bing.
   
   STEP 1: Go to Google Search Console
   - https://search.google.com/search-console
   - Add your property: enarmart.com
   - Choose "HTML tag" verification method
   - Copy the content value from the meta tag they give you
   - Paste it below in the GOOGLE_SITE_VERIFICATION variable
   
   STEP 2: Go to Bing Webmaster Tools
   - https://www.bing.com/webmasters
   - Add your site
   - Choose "HTML tag" verification method  
   - Copy the content value from the meta tag they give you
   - Paste it below in the BING_SITE_VERIFICATION variable
   
   STEP 3: Redeploy your site after pasting the verification codes
   
   ═══════════════════════════════════════════════════════════════════════════════ */

// 🔽 PASTE YOUR GOOGLE VERIFICATION CODE HERE (replace the empty string)
const GOOGLE_SITE_VERIFICATION = ""; // e.g., "abc123xyz456"

// 🔽 PASTE YOUR BING VERIFICATION CODE HERE (replace the empty string)
const BING_SITE_VERIFICATION = ""; // e.g., "789def012ghi"

export const metadata: Metadata = {
  title: {
    default: "EnarMart - Premium Canva Templates Store",
    template: "%s | EnarMart",
  },
  description:
    "Discover beautiful, ready-to-edit Canva templates for resumes, social media, YouTube, presentations, and more. Download instantly and customize in minutes.",
  keywords: [
    "canva templates",
    "resume templates",
    "social media templates",
    "youtube thumbnails",
    "presentation templates",
    "canva",
    "digital templates",
    "canva resume",
    "canva youtube thumbnail",
    "canva presentation",
    "canva social media",
    "premium templates",
    "download canva templates",
    "canva pro templates",
    "editable templates",
  ],
  authors: [{ name: "EnarMart" }],
  creator: "EnarMart",
  publisher: "EnarMart",
  metadataBase: new URL("https://enarmart.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enarmart.com",
    siteName: "EnarMart",
    title: "EnarMart - Premium Canva Templates Store",
    description:
      "Beautiful, ready-to-edit Canva templates for every project. Download instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EnarMart - Premium Canva Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EnarMart - Premium Canva Templates Store",
    description:
      "Beautiful, ready-to-edit Canva templates for every project.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Google & Bing verification meta tags
  verification: {
    google: GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      "msvalidate.01": BING_SITE_VERIFICATION || undefined,
    },
  },
  category: "e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 
          🔽 JSON-LD Structured Data for SEO
          This helps Google understand your website better and can improve
          how your site appears in search results (rich snippets).
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EnarMart",
              url: "https://enarmart.com",
              description:
                "Premium Canva templates marketplace. Beautiful, ready-to-edit designs for resumes, social media, YouTube, and more.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://enarmart.com/shop?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
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
