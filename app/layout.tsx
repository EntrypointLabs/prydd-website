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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#17191d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | PRYDD",
    default: "PRYDD — Spend money as you would, but faster",
  },
  description:
    "PRYDD is a dollar account for everyday life. Hold dollars on your phone, send to anyone by username in seconds for cents, and fund from local currency. A fast, low-fee alternative to slow bank transfers.",
  keywords: [
    "dollar account",
    "send money instantly by username",
    "fast low fee dollar transfers",
    "digital checking account",
    "USD account instant settlement",
    "alternative to slow bank transfers",
    "international dollar transfer",
    "24/7 instant money sending app",
    "passkey login money account",
    "no seed phrase recovery",
    "fund dollar account from local currency",
    "personal finance app instant payments",
    "Solana payment platform",
    "PRYDD",
  ],
  applicationName: "PRYDD",
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
    siteName: "PRYDD",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PRYDD — one app for everyday global money",
      },
    ],
    title: "PRYDD — Spend money as you would, but faster",
    description:
      "Hold dollars on your phone. Send them to anyone in seconds, for cents. A checking account for the internet.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pryddfinance",
    creator: "@pryddfinance",
    title: "PRYDD — Spend money as you would, but faster",
    description:
      "Hold dollars on your phone. Send them to anyone in seconds, for cents.",
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
      alternateName: "PRYDD",
      url: SITE_URL,
      logo: `${SITE_URL}/prydd/mark.svg`,
      sameAs: ["https://x.com/pryddfinance"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "PRYDD",
      description:
        "A dollar account for everyday life — send money to anyone by username in seconds, for cents.",
      publisher: { "@id": `${SITE_URL}#org` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}#app`,
      name: "PRYDD",
      operatingSystem: "iOS, Android",
      applicationCategory: "FinanceApplication",
      applicationSubCategory: "Mobile Banking",
      description:
        "A checking account for the internet. Hold dollars, send and receive in seconds for cents, fund from your local bank.",
      url: SITE_URL,
      featureList: [
        "Hold a USD balance on your phone",
        "Send money instantly by username, in seconds for cents",
        "Receive dollars from anyone, anywhere",
        "Fund your dollar account from local currency through a virtual bank account",
        "Passkey sign-in — no seed phrases, no email-and-password leaks",
        "Account recovery built into the product",
        "Activity feed in plain language, not a transaction ledger",
        "Built on Solana for instant settlement",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${SITE_URL}#org` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}#use-cases`,
      name: "How to use PRYDD",
      description:
        "Three things you'll actually do with a PRYDD Account.",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: 3,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hold dollars",
          description:
            "Your Balance lives on your phone, denominated in USD. Funded from local currency through a virtual bank account — held in dollars regardless of where it came from.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Send & Receive",
          description:
            "Move dollars to anyone by username. No wire numbers, no three-day waits. Settles in seconds, for cents.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Yours, recoverable",
          description:
            "Sign in with a passkey on your phone. No seed phrases to memorise. Lose your phone, get back in — recovery is built into the product.",
        },
      ],
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
