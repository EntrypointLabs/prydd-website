import type React from "react"
import type { Metadata } from "next"

const SITE_URL = "https://xend.global"
const OG_IMAGE = `${SITE_URL}/images/og-image.png`

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Get early access to PRYDD — a dollar account for everyday life. Hold dollars on your phone, send to anyone by username in seconds for cents.",
  alternates: {
    canonical: "/waitlist",
  },
  openGraph: {
    url: `${SITE_URL}/waitlist`,
    title: "Join the PRYDD waitlist",
    description:
      "Get early access to a dollar account for everyday life — hold dollars on your phone, send to anyone by username in seconds for cents.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PRYDD — a dollar account in your pocket",
      },
    ],
  },
  twitter: {
    title: "Join the PRYDD waitlist",
    description:
      "Get early access to a dollar account for everyday life — hold dollars on your phone, send to anyone by username in seconds for cents.",
    images: [OG_IMAGE],
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
