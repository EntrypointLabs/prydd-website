import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/prydd/site-footer"
import { tools } from "@/components/tool-page"

export const metadata: Metadata = {
  title: "Free tools",
  description: "Free currency and bank lookup tools from PRYDD.",
  alternates: { canonical: "/tools" },
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 max-w-3xl w-full mx-auto px-5 md:px-8 pt-32 pb-24">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground">
          Free tools
        </h1>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <a
                href={`/tools/${tool.slug}`}
                className="flex items-start justify-between gap-6 py-5 group"
              >
                <span>
                  <span className="block text-base font-medium text-foreground">
                    {tool.title}
                  </span>
                  <span className="block mt-1 text-sm text-muted-foreground">
                    {tool.summary}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <SiteFooter />
    </main>
  )
}
