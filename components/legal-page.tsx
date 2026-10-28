import type { ReactNode } from "react"

import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/prydd/site-footer"

export function LegalSection({ children }: { children: ReactNode }) {
  return (
    <p className="text-base leading-relaxed text-muted-foreground">
      {children}
    </p>
  )
}

export function LegalLead({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-foreground">{children}</span>
}

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-5 md:px-8 pt-32 pb-24">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last Updated: {lastUpdated}
        </p>
        <div className="mt-10 space-y-6">{children}</div>
      </div>
      <SiteFooter />
    </main>
  )
}
