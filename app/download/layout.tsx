import type React from "react"
import type { Metadata } from "next"

const SITE_URL = "https://prydd.co"
const OG_IMAGE = `${SITE_URL}/prydd/og-image.png`
const OG_ALT = "Prydd: Money, but faster"
const DESCRIPTION =
  "Prydd is in public beta on iPhone through TestFlight. Hold dollars, add money in local currency and send to anyone in seconds. Android is coming soon."

export const metadata: Metadata = {
  title: "Download Prydd",
  description: DESCRIPTION,
  alternates: { canonical: "/download" },
  openGraph: {
    url: `${SITE_URL}/download`,
    title: "Download Prydd",
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    title: "Download Prydd",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children
}
