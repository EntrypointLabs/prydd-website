"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { ArrowLeftRight, ArrowUpRight, Check, MoreHorizontal, Plus, Sparkles } from "lucide-react"
import styles from "./life-sequence.module.css"

type Row = { label: string; meta: string; value: string }
type Variant = { id: string; label: string; caption: string; amount: string; rows: Row[] }
type Chapter = {
  id: string
  title: string
  body: string
  note?: string
  cta: { label: string; href: string }
  backdrop: { image?: string; position?: string }
  variants: Variant[]
}

const chapters: Chapter[] = [
  {
    id: "savings",
    title: "Life, meets savings.",
    body: "Set dollars aside inside the account you already use. Name the goal, watch it fill, spend it the moment you need it.",
    cta: { label: "Explore Savings", href: "/waitlist" },
    backdrop: { image: "/prydd/landscape-field.png", position: "center 65%" },
    variants: [
      {
        id: "trip",
        label: "Trip",
        caption: "Lisbon in April",
        amount: "$1,326.00",
        rows: [
          { label: "Added this month", meta: "From USD balance", value: "+$240.00" },
          { label: "Set aside weekly", meta: "Every Monday", value: "$60.00" },
        ],
      },
      {
        id: "rent",
        label: "Rent",
        caption: "Next payment",
        amount: "$840.00",
        rows: [
          { label: "Added this month", meta: "From USD balance", value: "+$420.00" },
          { label: "Set aside weekly", meta: "Every Friday", value: "$105.00" },
        ],
      },
      {
        id: "rainy-day",
        label: "Rainy day",
        caption: "Untouched since June",
        amount: "$2,150.00",
        rows: [
          { label: "Added this month", meta: "From USD balance", value: "+$150.00" },
          { label: "Set aside weekly", meta: "Every Monday", value: "$37.50" },
        ],
      },
    ],
  },
  {
    id: "assistant",
    title: "Ask, and PRYDD answers.",
    body: "Your account speaks plain language. Ask where the money went, what is safe to spend, what to set aside before the weekend.",
    cta: { label: "Meet the assistant", href: "/waitlist" },
    backdrop: {},
    variants: [
      {
        id: "spending",
        label: "Spending",
        caption: "Where did my money go?",
        amount: "$612.40",
        rows: [
          { label: "Eating out", meta: "14 payments", value: "$268.10" },
          { label: "Transport", meta: "9 payments", value: "$121.75" },
        ],
      },
      {
        id: "safe-to-spend",
        label: "Safe to spend",
        caption: "What can I spend today?",
        amount: "$184.00",
        rows: [
          { label: "Rent set aside", meta: "Due in 9 days", value: "$840.00" },
          { label: "Left in balance", meta: "After set-asides", value: "$1,024.00" },
        ],
      },
      {
        id: "activity",
        label: "Activity",
        caption: "Who did I pay this week?",
        amount: "6 payments",
        rows: [
          { label: "To @maya", meta: "Sent · Tuesday", value: "−$25.00" },
          { label: "From @sarah", meta: "Received · Monday", value: "+$50.00" },
        ],
      },
    ],
  },
  {
    id: "crypto",
    title: "Crypto, in the same account.",
    body: "Hold it beside your dollars. One balance, one activity feed, one sign-in. Nothing to move between apps.",
    note: "Capital at risk.",
    cta: { label: "Explore crypto", href: "/waitlist" },
    backdrop: { image: "/prydd/landscape-sky.png", position: "center 40%" },
    variants: [
      {
        id: "hold",
        label: "Hold",
        caption: "Crypto balance",
        amount: "$3,480.00",
        rows: [
          { label: "Bitcoin", meta: "0.0312 BTC", value: "$2,104.00" },
          { label: "Solana", meta: "6.40 SOL", value: "$1,376.00" },
        ],
      },
      {
        id: "convert",
        label: "Convert",
        caption: "Dollars to Solana",
        amount: "$250.00",
        rows: [
          { label: "You convert", meta: "From USD balance", value: "$250.00" },
          { label: "You receive", meta: "To crypto balance", value: "1.16 SOL" },
        ],
      },
      {
        id: "send",
        label: "Send",
        caption: "Sent to @leo",
        amount: "0.40 SOL",
        rows: [
          { label: "Settled", meta: "Today · seconds", value: "Done" },
          { label: "Network fee", meta: "Paid in USD", value: "$0.01" },
        ],
      },
    ],
  },
  {
    id: "investing",
    title: "Explore stocks and ETFs.",
    body: "Put dollars into companies and funds without leaving the account your money already lives in.",
    note: "Capital at risk. Investing is not available in every country.",
    cta: { label: "Start investing", href: "/waitlist" },
    backdrop: {},
    variants: [
      {
        id: "stocks",
        label: "Stocks",
        caption: "Your holdings",
        amount: "$5,214.00",
        rows: [
          { label: "Apple", meta: "12 shares", value: "$2,640.00" },
          { label: "Nvidia", meta: "9 shares", value: "$2,574.00" },
        ],
      },
      {
        id: "etfs",
        label: "ETFs",
        caption: "Your funds",
        amount: "$1,980.00",
        rows: [
          { label: "World equity", meta: "Accumulating", value: "$1,320.00" },
          { label: "Short treasuries", meta: "Distributing", value: "$660.00" },
        ],
      },
      {
        id: "watchlist",
        label: "Watchlist",
        caption: "Following",
        amount: "8 companies",
        rows: [
          { label: "Visa", meta: "Added in March", value: "Watching" },
          { label: "Shopify", meta: "Added in May", value: "Watching" },
        ],
      },
    ],
  },
]

const span = 1 / chapters.length
// Half-width of the crossfade straddling each chapter boundary, so the outgoing
// chapter is still fading while the incoming one is already arriving.
const overlap = span * 0.28

const band = (index: number) => ({ start: index * span, end: (index + 1) * span })

function chapterFade(index: number) {
  const { start, end } = band(index)
  if (index === 0) return { times: [0, end - overlap, end + overlap], values: [1, 1, 0] }
  if (index === chapters.length - 1) return { times: [start - overlap, start + overlap, 1], values: [0, 1, 1] }
  return {
    times: [start - overlap, start + overlap, end - overlap, end + overlap],
    values: [0, 1, 1, 0],
  }
}

function ProductCard({ variant }: { variant: Variant }) {
  return (
    <div className={styles.card}>
      <span className={styles.cardCaption}>{variant.caption}</span>
      <strong className={styles.cardAmount}>{variant.amount}</strong>
      <ul className={styles.cardRows}>
        {variant.rows.map((row) => (
          <li key={row.label}>
            <span>
              {row.label}
              <small>{row.meta}</small>
            </span>
            <b>{row.value}</b>
          </li>
        ))}
      </ul>
      <div className={styles.cardActions} aria-hidden="true">
        <span><Plus size={16} /></span>
        <span><ArrowLeftRight size={16} /></span>
        <span><Sparkles size={16} /></span>
        <span><MoreHorizontal size={16} /></span>
      </div>
    </div>
  )
}

function ChapterCopy({ chapter, children }: { chapter: Chapter; children?: ReactNode }) {
  return (
    <>
      <h2>{chapter.title}</h2>
      <p>{chapter.body}</p>
      {chapter.note && <span className={styles.note}>{chapter.note}</span>}
      <a className={styles.chapterCta} href={chapter.cta.href}>
        {chapter.cta.label}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      {children}
    </>
  )
}

function VariantPills({
  chapter,
  active,
  onSelect,
}: {
  chapter: Chapter
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <div className={styles.pills} role="group" aria-label={chapter.title}>
      {chapter.variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          aria-pressed={variant.id === active}
          onClick={() => onSelect(variant.id)}
          data-active={variant.id === active || undefined}
        >
          {variant.label}
        </button>
      ))}
    </div>
  )
}

function Backdrop({ chapter }: { chapter: Chapter }) {
  return (
    <div
      className={styles.backdrop}
      style={chapter.backdrop.image ? {
        backgroundImage: `url("${chapter.backdrop.image}")`,
        backgroundPosition: chapter.backdrop.position ?? "center",
      } : undefined}
      aria-hidden="true"
    />
  )
}

function PinnedSequence() {
  const section = useRef<HTMLElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [variants, setVariants] = useState(() => chapters.map((chapter) => chapter.variants[0].id))
  const { scrollYProgress: progress } = useScroll({ target: section, offset: ["start start", "end end"] })

  // The frame grows out of the contained panel above it, mirroring the hero
  // globe's contraction into a card.
  const closing = useTransform(progress, [0, 0.11], [1, 0])

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(chapters.length - 1, Math.max(0, Math.floor(value * chapters.length)))
    setActiveChapter((current) => (current === next ? current : next))
  })

  return (
    <section
      ref={section}
      id="prydd-life"
      className={styles.sequence}
      aria-label="Savings, the assistant, crypto and investing inside one account"
    >
      <div className={styles.sticky}>
        <motion.div
          className={styles.stage}
          style={{ "--closing": closing } as CSSProperties}
        >
          {chapters.map((chapter, index) => {
            const fade = chapterFade(index)
            const live = index === activeChapter
            return (
              <ChapterLayer
                key={chapter.id}
                chapter={chapter}
                index={index}
                progress={progress}
                fade={fade}
                live={live}
                variantId={variants[index]}
                onSelect={(id) => setVariants((current) => current.map((value, slot) => (slot === index ? id : value)))}
              />
            )
          })}
          <div className={styles.rail} aria-hidden="true">
            {chapters.map((chapter, index) => (
              <span key={chapter.id} data-active={index === activeChapter || undefined} />
            ))}
          </div>
          <p className={styles.illustrative}>Illustrative product views and amounts.</p>
        </motion.div>
      </div>
    </section>
  )
}

function ChapterLayer({
  chapter,
  index,
  progress,
  fade,
  live,
  variantId,
  onSelect,
}: {
  chapter: Chapter
  index: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  fade: { times: number[]; values: number[] }
  live: boolean
  variantId: string
  onSelect: (id: string) => void
}) {
  const opacity = useTransform(progress, fade.times, fade.values)
  const { start, end } = band(index)
  const copyDrift = useTransform(progress, [start, end], [26, -26])
  const cardDrift = useTransform(progress, [start, end], [-16, 16])
  const variant = chapter.variants.find((entry) => entry.id === variantId) ?? chapter.variants[0]

  return (
    <motion.div
      className={styles.chapter}
      data-photo={chapter.backdrop.image ? true : undefined}
      style={{ opacity }}
      aria-hidden={!live}
      inert={!live}
    >
      <Backdrop chapter={chapter} />
      <div className={styles.chapterInner}>
        <motion.div className={styles.copy} style={{ y: copyDrift }}>
          <ChapterCopy chapter={chapter} />
        </motion.div>
        <motion.div className={styles.cardSlot} style={{ y: cardDrift }}>
          <ProductCard variant={variant} />
        </motion.div>
        <VariantPills chapter={chapter} active={variantId} onSelect={onSelect} />
      </div>
    </motion.div>
  )
}

function StackedSequence() {
  const [variants, setVariants] = useState(() => chapters.map((chapter) => chapter.variants[0].id))
  return (
    <section className={styles.stacked} aria-label="Savings, the assistant, crypto and investing inside one account">
      {chapters.map((chapter, index) => {
        const variant = chapter.variants.find((entry) => entry.id === variants[index]) ?? chapter.variants[0]
        return (
          <div key={chapter.id} className={styles.stackedChapter} data-photo={chapter.backdrop.image ? true : undefined}>
            <Backdrop chapter={chapter} />
            <div className={styles.chapterInner}>
              <div className={styles.copy}><ChapterCopy chapter={chapter} /></div>
              <div className={styles.cardSlot}><ProductCard variant={variant} /></div>
              <VariantPills
                chapter={chapter}
                active={variants[index]}
                onSelect={(id) => setVariants((current) => current.map((value, slot) => (slot === index ? id : value)))}
              />
            </div>
          </div>
        )
      })}
      <p className={styles.illustrative} data-stacked="true">Illustrative product views and amounts.</p>
    </section>
  )
}

export function LifeSequence() {
  const [reduced, setReduced] = useState<boolean | null>(null)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 600px)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  if (reduced === null) return <StackedSequence />
  return reduced ? <StackedSequence /> : <PinnedSequence />
}
