"use client"

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeftRight, ArrowUpRight, MoreHorizontal, Plus, Sparkles } from "lucide-react"
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
    id: "crypto",
    title: "Crypto, in the same account.",
    body: "Hold it beside your dollars. One balance, one activity feed, one sign-in.",
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
          { label: "Settled", meta: "Today, in seconds", value: "Done" },
          { label: "Network fee", meta: "Paid in USD", value: "$0.01" },
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
    ],
  },
]

// Content holds at full opacity across the section and clears only in the last
// tenth at either edge, so two neighbouring sections never read as present at
// the same time.
const REVEAL_TIMES = [0.061, 0.128, 0.878, 0.944]
const REVEAL_VALUES = [0, 1, 1, 0]

// The backdrop drifts into place while the section is arriving and sits still
// once its top reaches the viewport. The strip it leaves uncovered stays below
// the fold for the whole of that travel.
const PARALLAX_TIMES = [0, 0.5, 1]
const PARALLAX_VALUES = ["-16.667%", "0%", "0%"]

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

function ChapterBody({ chapter }: { chapter: Chapter }) {
  const [active, setActive] = useState(chapter.variants[0].id)
  const variant = chapter.variants.find((entry) => entry.id === active) ?? chapter.variants[0]
  return (
    <div className={styles.chapterInner}>
      <div className={styles.copy}>
        <h2>{chapter.title}</h2>
        <p>{chapter.body}</p>
        {chapter.note && <span className={styles.note}>{chapter.note}</span>}
        <a className={styles.chapterCta} href={chapter.cta.href}>
          {chapter.cta.label}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.cardSlot}><ProductCard variant={variant} /></div>
      {chapter.variants.length > 1 ? (
        <div className={styles.pills} role="group" aria-label={chapter.title}>
          {chapter.variants.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={styles.variantPill}
              aria-pressed={entry.id === active}
              onClick={() => setActive(entry.id)}
              data-active={entry.id === active || undefined}
            >
              {entry.label}
            </button>
          ))}
        </div>
      ) : <span />}
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

function useSectionMotion(section: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, REVEAL_TIMES, REVEAL_VALUES)
  const backdropY = useTransform(scrollYProgress, PARALLAX_TIMES, PARALLAX_VALUES)
  return { opacity, backdropY }
}

/** The frame grows out of the contained panel above it, mirroring the hero
 *  globe's contraction into a card. */
function OpeningChapter({ chapter, reduced }: { chapter: Chapter; reduced: boolean }) {
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const closing = useTransform(scrollYProgress, [0, 0.42], [1, 0])

  if (reduced) {
    return (
      <section id="prydd-life" className={styles.chapterSection} data-photo>
        <div className={styles.backdropLayer}><Backdrop chapter={chapter} /></div>
        <ChapterBody chapter={chapter} />
      </section>
    )
  }

  return (
    <section ref={section} id="prydd-life" className={styles.openingSection}>
      <div className={styles.openingSticky}>
        <motion.div
          className={styles.stage}
          data-photo
          style={{ "--closing": closing } as CSSProperties}
        >
          <div className={styles.backdropLayer}><Backdrop chapter={chapter} /></div>
          <ChapterBody chapter={chapter} />
        </motion.div>
      </div>
    </section>
  )
}

function ScrollChapter({ chapter, reduced }: { chapter: Chapter; reduced: boolean }) {
  const section = useRef<HTMLElement>(null)
  const { opacity, backdropY } = useSectionMotion(section)
  const photo = chapter.backdrop.image ? true : undefined

  if (reduced) {
    return (
      <section className={styles.chapterSection} data-photo={photo}>
        <div className={styles.backdropLayer}><Backdrop chapter={chapter} /></div>
        <ChapterBody chapter={chapter} />
      </section>
    )
  }

  return (
    <section ref={section} className={styles.chapterSection} data-photo={photo}>
      <motion.div className={styles.backdropLayer} style={{ y: backdropY }}>
        <Backdrop chapter={chapter} />
      </motion.div>
      <motion.div className={styles.revealed} style={{ opacity }}>
        <ChapterBody chapter={chapter} />
      </motion.div>
    </section>
  )
}

function SafeSpaceSection({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLElement>(null)
  const { opacity } = useSectionMotion(section)
  const body = (
    <div className={styles.safeInner}>
      <div className={styles.safeCopy}>
        <h2>Your money&rsquo;s safe space.</h2>
        <p>
          Sign in with a passkey on your phone. No seed phrase to memorise, no password to leak.
          Lose the phone and recovery is part of the product, not a support ticket.
        </p>
        <a className={styles.safeCta} href="/waitlist">
          Learn more
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.shieldStage} aria-hidden="true">
        <span className={styles.shield}>
          <span className={styles.shieldMark} />
          <span className={styles.shieldSheen} />
        </span>
      </div>
    </div>
  )

  if (reduced) return <section className={styles.safeSection}>{body}</section>
  return (
    <section ref={section} className={styles.safeSection}>
      <motion.div className={styles.revealed} style={{ opacity }}>{body}</motion.div>
    </section>
  )
}

const holdings = ["Apple", "Nvidia", "Visa", "Shopify", "Zoom"]

function InvestingSection({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLElement>(null)
  const { opacity } = useSectionMotion(section)
  const body = (
    <div className={styles.investingInner}>
      <div className={styles.copy}>
        <h2>Explore stocks and ETFs.</h2>
        <p>Put dollars into companies and funds without leaving the account your money already lives in.</p>
        <span className={styles.note}>Capital at risk. Investing is not available in every country.</span>
        <a className={styles.chapterCta} href="/waitlist">
          Try it out
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.discRow} aria-hidden="true">
        {holdings.map((name, index) => (
          <span key={name} className={styles.disc} style={{ "--index": index } as CSSProperties}>
            <span className={styles.discFace}>{name.slice(0, 2).toUpperCase()}</span>
            <span className={styles.discFace} data-reverse />
          </span>
        ))}
      </div>
    </div>
  )

  if (reduced) return <section className={styles.investingSection}>{body}</section>
  return (
    <section ref={section} className={styles.investingSection}>
      <motion.div className={styles.revealed} style={{ opacity }}>{body}</motion.div>
    </section>
  )
}

export function LifeSequence() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 600px)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  const [opening, ...rest] = chapters
  return (
    <div className={styles.run}>
      <OpeningChapter chapter={opening} reduced={reduced} />
      {rest.map((chapter) => <ScrollChapter key={chapter.id} chapter={chapter} reduced={reduced} />)}
      <SafeSpaceSection reduced={reduced} />
      <InvestingSection reduced={reduced} />
    </div>
  )
}
