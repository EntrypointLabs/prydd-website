"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { submitWaitlist } from "@/app/api/waitlist/action"
import { PryddWordmark } from "@/components/prydd-wordmark"

type Status = "idle" | "submitting" | "success" | "error"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === "submitting") return

    setStatus("submitting")
    setMessage("")

    try {
      const formData = new FormData()
      formData.append("email", email)
      const result = await submitWaitlist(formData)

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setEmail("")
      } else {
        setStatus("error")
        setMessage(result.message)
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="flex items-center gap-2 group">
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

      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-12 pb-24 md:pt-20">
        <div className="reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-glow" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            Joining is by invite — get on the list
          </span>
        </div>

        <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-foreground text-center max-w-3xl leading-[1.05] mb-6">
          Be first in line for a dollar account.
        </h1>

        <p className="reveal reveal-delay-2 text-base sm:text-lg text-muted-foreground text-center max-w-xl mb-10 leading-relaxed">
          Drop your email below. We&apos;ll let you in as soon as we open the doors — and only when there&apos;s something to share.
        </p>

        <form
          onSubmit={handleSubmit}
          className="reveal reveal-delay-3 w-full max-w-md"
        >
          <div className="flex flex-col sm:flex-row sm:gap-2 sm:p-1.5 sm:rounded-full sm:bg-white sm:border sm:border-border sm:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status !== "idle") setStatus("idle")
              }}
              placeholder="you@example.com"
              required
              disabled={status === "submitting" || status === "success"}
              className="flex-1 w-full bg-white border border-border rounded-full sm:border-0 sm:bg-transparent sm:shadow-none shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-5 h-12 sm:h-auto sm:py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/20 sm:focus:border-0 disabled:opacity-60 transition-colors min-h-12"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="inline-flex items-center justify-center gap-1.5 px-6 h-12 sm:h-auto sm:py-3 w-full sm:w-auto rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "success" && <Check className="w-4 h-4" />}
              {status === "idle" && <ArrowRight className="w-4 h-4" />}
              {status === "error" && <ArrowRight className="w-4 h-4" />}
              <span>
                {status === "submitting"
                  ? "Joining…"
                  : status === "success"
                  ? "You're in"
                  : "Join waitlist"}
              </span>
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 text-sm text-center ${
                status === "success" ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-4 text-xs text-muted-foreground text-center">
            By joining, you agree to our{" "}
            <Link href="/legal/terms-of-service" className="underline underline-offset-2 hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </form>

        <div className="reveal reveal-delay-4 mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border max-w-2xl w-full">
          {[
            { title: "Early access", body: "We invite waitlist members first, in small batches." },
            { title: "No spam", body: "One email when it&apos;s your turn. That&apos;s it." },
            { title: "Easy out", body: "Unsubscribe any time. We won&apos;t take it personally." },
          ].map((item) => (
            <div key={item.title} className="bg-background p-6 text-center">
              <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
              <p
                className="text-xs text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </div>
          ))}
        </div>

        <a
          href="/litepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal reveal-delay-5 mt-10 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Read the litepaper while you wait →
        </a>
      </section>
    </main>
  )
}
