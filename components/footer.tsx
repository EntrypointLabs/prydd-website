"use client"

import { PryddWordmark } from "@/components/prydd-wordmark"

const links = [
  { label: "Litepaper", href: "/litepaper.pdf", external: true },
  { label: "X / Twitter", href: "https://x.com/xend_global", external: true },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <PryddWordmark size="sm" />
          <span className="text-xs text-muted-foreground ml-3">
            &copy; {new Date().getFullYear()} Entrypoint Labs, Inc.
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:flex-nowrap sm:justify-end">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-6">
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Disclaimers
        </p>
        <ol className="list-decimal list-outside pl-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
          <li>
            Entrypoint Labs, Inc. is a financial technology company, not a
            bank. PRYDD is a product built and operated by Entrypoint
            Labs, Inc.
          </li>
          <li>
            Your PRYDD Balance is not a deposit account at a bank chartered
            by any government and is not insured by the FDIC or any other
            deposit insurance scheme unless expressly stated otherwise in
            the app.
          </li>
        </ol>
      </div>
    </footer>
  )
}
