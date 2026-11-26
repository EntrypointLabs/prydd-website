"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowDownUp, Check, ChevronDown, Globe, Search, X, XCircle } from "lucide-react"

import {
  currencyFlagUrl,
  currencyName,
  formatAmount,
  formatPairRate,
  groupDigits,
  isDisplayRates,
  matchesCurrency,
  parseAmount,
  startingAmount,
  type DisplayRates,
} from "@/lib/currency-converter"
import { cn } from "@/lib/utils"

type Side = "from" | "to"

export function Converter({ initialRates }: { initialRates: DisplayRates | null }) {
  const [rates, setRates] = useState(initialRates)
  const [failed, setFailed] = useState(false)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState<string | null>(null)
  const [typed, setTyped] = useState<string | null>(null)
  const [picking, setPicking] = useState<Side | null>(null)
  const touched = useRef(false)

  async function loadRates() {
    setFailed(false)
    try {
      const response = await fetch("/tools/currency-converter/rates")
      const body: unknown = response.ok ? await response.json() : null
      if (!isDisplayRates(body)) throw new Error("bad rates")
      setRates(body)
    } catch {
      setFailed(true)
    }
  }

  useEffect(() => {
    if (!initialRates) void loadRates()
  }, [initialRates])

  const perUsd = rates?.perUsd
  const codes = useMemo(() => (perUsd ? Object.keys(perUsd).sort() : []), [perUsd])

  useEffect(() => {
    if (!perUsd) return
    let cancelled = false
    fetch("/api/geo")
      .then((response) => (response.ok ? response.json() : null))
      .then((geo: { currency?: string | null } | null) => {
        const local = geo?.currency
        if (cancelled || touched.current || !local || local === "USD") return
        if (perUsd[local]) setTo(local)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [perUsd])

  if (!perUsd) {
    return (
      <div className="mt-10 rounded-[24px] bg-foreground/[0.04] px-6 py-16 text-center">
        {failed ? (
          <>
            <p className="text-base font-medium text-foreground">
              We could not load today&apos;s rates.
            </p>
            <p className="mt-1 text-sm text-foreground/55">
              Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => void loadRates()}
              className="mt-6 h-11 rounded-full bg-foreground/[0.06] px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.1]"
            >
              Try again
            </button>
          </>
        ) : (
          <p className="text-base font-medium text-foreground/55">
            Getting today&apos;s rates
          </p>
        )}
      </div>
    )
  }

  const target = to ?? (perUsd.NGN ? "NGN" : (codes.find((code) => code !== from) ?? from))
  const rate = perUsd[target] / perUsd[from]
  const shown = typed ?? startingAmount(perUsd[from])
  const amount = parseAmount(shown)
  const converted = Number.isFinite(amount) ? amount * rate : 0
  const result = formatAmount(converted, target)

  function pick(side: Side, code: string) {
    touched.current = true
    const other = side === "from" ? target : from
    if (code === other) {
      swap()
    } else if (side === "from") {
      setFrom(code)
      setTyped(null)
    } else {
      setTo(code)
    }
    setPicking(null)
  }

  function swap() {
    touched.current = true
    setFrom(target)
    setTo(from)
  }

  return (
    <section aria-label="Currency converter" className="mt-10">
      <div className="relative rounded-[24px] bg-foreground/[0.04]">
        <div className="px-5 pt-5 pb-7 sm:px-7 sm:pt-6">
          <label htmlFor="convert-amount" className="text-sm font-medium text-foreground/55">
            You convert
          </label>
          <div className="mt-3 flex items-center justify-between gap-4">
            <CurrencyChip code={from} onClick={() => setPicking("from")} />
            <input
              id="convert-amount"
              inputMode="decimal"
              autoComplete="off"
              value={shown}
              onChange={(event) => {
                const next = event.target.value.replace(/[^0-9.,]/g, "")
                if (next.split(".").length <= 2) setTyped(groupDigits(next))
              }}
              onBlur={() =>
                setTyped((value) => (value?.startsWith(".") ? `0${value}` : value))
              }
              onFocus={(event) => event.target.select()}
              aria-label={`Amount in ${currencyName(from)}`}
              className={cn(
                "min-w-0 flex-1 bg-transparent text-right font-semibold tracking-[-0.03em] tabular-nums text-foreground outline-none",
                figureSize(shown),
              )}
            />
          </div>
        </div>

        <div className="relative h-px bg-foreground/[0.08]">
          <button
            type="button"
            onClick={swap}
            aria-label={`Swap, convert ${target} to ${from}`}
            className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/[0.08] bg-background text-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <ArrowDownUp size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pt-7 pb-5 sm:px-7 sm:pb-6">
          <p className="text-sm font-medium text-foreground/55">You get</p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <CurrencyChip code={target} onClick={() => setPicking("to")} />
            <output
              htmlFor="convert-amount"
              aria-live="polite"
              aria-label={`${result} ${currencyName(target)}`}
              className={cn(
                "min-w-0 flex-1 truncate text-right font-semibold tracking-[-0.03em] tabular-nums text-foreground",
                figureSize(result),
              )}
            >
              {result}
            </output>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1">
        <p className="text-[15px] font-semibold tabular-nums text-foreground">
          {formatPairRate(from, target, rate)}
        </p>
        <p className="text-sm text-foreground/45">
          Today&apos;s reference rate
          {rates ? `, ${quotedTime(rates.quotedAt)}` : ""}
        </p>
      </div>

      <CurrencyPicker
        open={picking !== null}
        codes={codes}
        current={picking === "to" ? target : from}
        onPick={(code) => picking && pick(picking, code)}
        onClose={() => setPicking(null)}
      />
    </section>
  )
}

function figureSize(text: string): string {
  const n = text.length
  const phone = n <= 6 ? "text-4xl" : n <= 9 ? "text-3xl" : n <= 12 ? "text-2xl" : "text-xl"
  const wide = n <= 10 ? "sm:text-6xl" : n <= 14 ? "sm:text-5xl" : "sm:text-4xl"
  return `${phone} ${wide}`
}

function quotedTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  return `updated ${date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })}`
}

function CurrencyFlag({ code, size }: { code: string; size: number }) {
  const uri = currencyFlagUrl(code)
  const [failed, setFailed] = useState(false)
  if (uri && !failed) {
    return (
      <img
        src={uri}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="shrink-0 rounded-full border border-foreground/[0.08] bg-foreground/[0.06] object-cover"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground"
      style={{ width: size, height: size }}
    >
      <Globe size={size * 0.6} />
    </span>
  )
}

function CurrencyChip({ code, onClick }: { code: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Change currency, now ${currencyName(code)}`}
      className="flex shrink-0 items-center gap-2 rounded-full bg-background py-2 pl-2 pr-3.5 text-[15px] font-semibold text-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.06)] transition-colors hover:bg-foreground/[0.03]"
    >
      <CurrencyFlag code={code} size={26} />
      {code}
      <ChevronDown size={16} aria-hidden="true" />
    </button>
  )
}

function CurrencyPicker({
  open,
  codes,
  current,
  onPick,
  onClose,
}: {
  open: boolean
  codes: string[]
  current: string
  onPick: (code: string) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState("")
  const shown = useMemo(
    () => (search ? codes.filter((code) => matchesCurrency(code, search)) : codes),
    [codes, search],
  )
  function choose(code: string) {
    setSearch("")
    onPick(code)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          onClose()
          setSearch("")
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col rounded-t-[24px] bg-background px-5 pt-6 outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-8 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[min(640px,85dvh)] sm:w-[440px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[24px] sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-foreground">
              Choose a currency
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="flex size-10 items-center justify-center rounded-full bg-foreground/[0.05] text-foreground transition-colors hover:bg-foreground/[0.09]"
            >
              <X size={20} aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="mt-4 flex h-12 items-center gap-2 rounded-full bg-foreground/[0.04] px-4">
            <Search size={16} className="text-foreground/45" aria-hidden="true" />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && shown[0]) choose(shown[0])
              }}
              placeholder="Search currencies"
              aria-label="Search currencies"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-foreground outline-none placeholder:text-foreground/55"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-foreground/25 hover:text-foreground/45"
              >
                <XCircle size={18} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <ul className="-mx-5 mt-2 flex-1 overflow-y-auto px-5 pb-4">
            {shown.length === 0 ? (
              <li className="py-10 text-center text-[15px] font-medium text-foreground/55">
                No currencies match &ldquo;{search}&rdquo;
              </li>
            ) : (
              shown.map((code) => (
                <li key={code}>
                  <button
                    type="button"
                    onClick={() => choose(code)}
                    aria-pressed={code === current}
                    className="-mx-3 flex w-[calc(100%+1.5rem)] items-center gap-3.5 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.04] focus-visible:outline-none"
                  >
                    <CurrencyFlag code={code} size={36} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold text-foreground">
                        {currencyName(code)}
                      </span>
                      <span className="block text-[13px] font-medium text-foreground/50">
                        {code}
                      </span>
                    </span>
                    <Check
                      size={20}
                      aria-hidden="true"
                      className={cn("text-foreground", code !== current && "opacity-0")}
                    />
                  </button>
                </li>
              ))
            )}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
