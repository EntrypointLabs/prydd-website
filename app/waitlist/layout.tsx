import type React from "react"
import type { Metadata } from "next"

const SITE_URL = "https://xend.global"

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
  },
  twitter: {
    title: "Join the PRYDD waitlist",
    description:
      "Get early access to a dollar account for everyday life — hold dollars on your phone, send to anyone by username in seconds for cents.",
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
