import type React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const pryddDisplay = localFont({
  src: "../public/prydd/montserrat-variable.ttf",
  variable: "--font-prydd",
  weight: "100 900",
  display: "swap",
});

const pryddBody = localFont({
  src: "../public/prydd/inter-variable.ttf",
  variable: "--font-prydd-body",
  weight: "100 900",
  display: "swap",
});

const SITE_URL = "https://prydd.co";
const OG_IMAGE = `${SITE_URL}/prydd/og-image.png`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

const TITLE = "Prydd: Money, but faster";
const DESCRIPTION =
  "Hold dollars, add money in local currency, send in seconds, earn, invest and pay online with your face. Public beta on iPhone.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Prydd",
    default: TITLE,
  },
  description: DESCRIPTION,
  keywords: [
    "Prydd",
    "dollar account",
    "send money",
    "pay online",
    "hold dollars",
    "add money in local currency",
    "earn on dollars",
    "invest in stocks",
    "money app",
  ],
  applicationName: "Prydd",
  authors: [{ name: "Entrypoint Labs, Inc." }],
  creator: "Entrypoint Labs, Inc.",
  publisher: "Entrypoint Labs, Inc.",
  category: "finance",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Prydd",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Prydd: Money, but faster",
      },
    ],
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: "@pryddfinance",
    creator: "@pryddfinance",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/favicon-dark.ico",
        sizes: "any",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/prydd/mark.svg", type: "image/svg+xml" },
    ],
    apple: "/prydd/apple-touch-icon.png",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#org`,
      name: "Entrypoint Labs, Inc.",
      alternateName: "Prydd",
      url: SITE_URL,
      logo: `${SITE_URL}/prydd/mark.svg`,
      sameAs: ["https://x.com/pryddfinance", "https://entrypointlabs.xyz"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Prydd",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#org` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}#app`,
      name: "Prydd",
      operatingSystem: "iOS",
      applicationCategory: "FinanceApplication",
      description: DESCRIPTION,
      url: SITE_URL,
      featureList: [
        "Hold a US dollar balance",
        "Add money in local currency",
        "Send money to anyone in seconds",
        "Earn on your dollars",
        "Invest in tokenized stocks and ETFs",
        "Pay online with your face",
        "Sign in with a passkey, with account recovery built in",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${SITE_URL}#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pryddDisplay.variable} ${pryddBody.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
