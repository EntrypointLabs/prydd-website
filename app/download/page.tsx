import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { PryddWordmark } from "@/components/prydd-wordmark"
import { IOS_TESTFLIGHT_URL } from "@/lib/app-links"

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.39-.92-2.4-3.66ZM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.68-1.1 1.77-.96 2.81 1.02.08 2.06-.52 2.69-1.29Z" />
    </svg>
  )
}

function AndroidGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.66-.38l-1.87 3.23A11.4 11.4 0 0 0 12 8.1c-1.77 0-3.43.38-4.91 1.05L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48C3.24 11.2 1.08 14.4.75 18h22.5c-.33-3.6-2.49-6.8-5.65-8.52ZM7 15.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  )
}

export default function DownloadPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" aria-label="Prydd home">
          <PryddWordmark />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </header>

      <section className="flex flex-col items-center px-5 pt-14 pb-24 md:pt-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-center max-w-3xl leading-[1.05] text-balance">
          Get Prydd on your iPhone.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-muted-foreground text-center max-w-lg leading-relaxed">
          Hold dollars, add money in local currency and send to anyone in seconds.
          Prydd is in public beta, so the app installs through Apple&apos;s TestFlight.
        </p>

        <div className="mt-10 w-full max-w-md flex flex-col gap-3">
          <a
            href={IOS_TESTFLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 h-14 pl-5 pr-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <AppleGlyph />
            <span className="flex-1 text-[15px] font-medium">
              Download for iPhone <span className="opacity-60 font-normal">(TestFlight)</span>
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <div
            aria-disabled="true"
            className="flex items-center gap-3 h-14 pl-5 pr-4 rounded-full border border-border text-muted-foreground"
          >
            <AndroidGlyph />
            <span className="flex-1 text-[15px] font-medium">Android</span>
            <span className="text-xs font-medium tracking-wide rounded-full bg-secondary px-2.5 py-1">
              Coming soon
            </span>
          </div>
        </div>

        <ol className="mt-14 w-full max-w-md grid gap-px bg-border rounded-2xl overflow-hidden border border-border text-sm">
          {[
            "Open this page on your iPhone and tap Download for iPhone.",
            "Install TestFlight if asked, then tap Accept and Install.",
            "Open Prydd, confirm your email with the code we send, then create your passkey.",
          ].map((step, index) => (
            <li key={step} className="flex gap-4 bg-background px-5 py-4">
              <span className="font-mono tabular-nums text-muted-foreground">{index + 1}</span>
              <span className="text-foreground/90 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-xs text-muted-foreground text-center max-w-md">
          Requires an iPhone. By installing, you agree to our{" "}
          <Link href="/legal/terms-of-service" className="underline underline-offset-2 hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
