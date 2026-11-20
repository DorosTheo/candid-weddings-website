import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Italiana } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { site } from "@/data/site";
import { Header, HeaderView } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** High-contrast display face for brand headlines (matches the "Lunéra" reference). */
const display = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Wedding Photographer & Videographer in Cyprus`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    images: [{ url: "/brand/og-default.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" id="top" className={`${serif.variable} ${sans.variable} ${display.variable}`}>
      <body>
        <a
          href="#main"
          className="eyebrow fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-black px-5 py-3 text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Suspense fallback={<HeaderView pathname={null} />}>
            <Header />
          </Suspense>
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
