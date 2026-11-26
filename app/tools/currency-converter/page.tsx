import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/prydd/site-footer"
import { tools } from "@/components/tool-page"
import {
  RATES_URL,
  isDisplayRates,
  type DisplayRates,
} from "@/lib/currency-converter"

import { Converter } from "./converter"

const tool = tools.find((entry) => entry.slug === "currency-converter")!

export const metadata: Metadata = {
  title: tool.title,
  description: tool.summary,
  alternates: { canonical: "/tools/currency-converter" },
  robots: { index: false, follow: true },
}

export const revalidate = 300

async function loadRates(): Promise<DisplayRates | null> {
  try {
    const response = await fetch(RATES_URL, { next: { revalidate: 300 } })
    const body: unknown = response.ok ? await response.json() : null
    return isDisplayRates(body) ? body : null
  } catch {
    return null
  }
}

export default async function Page() {
  const rates = await loadRates()
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 max-w-3xl w-full mx-auto px-5 md:px-8 pt-32 pb-24">
        <p className="text-sm text-muted-foreground">Free tools</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground">
          {tool.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {tool.summary}
        </p>
        <Converter initialRates={rates} />
        <a
          href="/download"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-5 h-11 text-sm font-medium text-primary-foreground"
        >
          Get the app
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <SiteFooter />
    </main>
  )
}
