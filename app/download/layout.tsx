import type React from "react"
import type { Metadata } from "next"

const SITE_URL = "https://prydd.co"
const OG_IMAGE = `${SITE_URL}/prydd/og-image.png`
const OG_ALT = "PRYDD, one app for everyday global money"
const DESCRIPTION =
  "Get PRYDD on your iPhone through TestFlight. Hold dollars on your phone and send to anyone by username in seconds. Android is coming soon."

export const metadata: Metadata = {
  title: "Download PRYDD",
  description: DESCRIPTION,
  alternates: { canonical: "/download" },
  openGraph: {
    url: `${SITE_URL}/download`,
    title: "Download PRYDD",
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    title: "Download PRYDD",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children
}
