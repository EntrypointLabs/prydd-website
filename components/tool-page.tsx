import { ArrowUpRight } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/prydd/site-footer"

export const tools = [
  {
    slug: "currency-converter",
    title: "Currency converter",
    summary: "Convert between your local currency and US dollars at the live rate.",
  },
  {
    slug: "iban-checker",
    title: "IBAN checker",
    summary: "Validate an IBAN and see the bank and country it belongs to.",
  },
  {
    slug: "swift-codes",
    title: "SWIFT/BIC codes",
    summary: "Look up the SWIFT or BIC code for a bank, by name or country.",
  },
  {
    slug: "routing-number-checker",
    title: "Routing number checker",
    summary: "Check a US routing number and the institution behind it.",
  },
] as const

export function ToolPage({ title, summary }: { title: string; summary: string }) {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 max-w-3xl w-full mx-auto px-5 md:px-8 pt-32 pb-24">
        <p className="text-sm text-muted-foreground">Free tools</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground">
          {title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {summary}
        </p>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          We are still building this one. Join early access and we will tell you
          when it is live.
        </p>
        <a
          href="/waitlist"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 h-11 text-sm font-medium text-primary-foreground"
        >
          Join early access
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <SiteFooter />
    </main>
  )
}
