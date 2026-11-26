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
  secondary?: { label: string; href: string }
  backdrop: { image?: string; position?: string }
  variants: Variant[]
}

const chapters: Chapter[] = [
  {
    id: "earn",
    title: "Let idle dollars earn.",
    body: "Move dollars you aren't spending into Earn and watch the interest add up. Take them back whenever you need them.",
    note: "Rates are set by third-party providers and change over time. Not a bank deposit.",
    cta: { label: "Explore Earn", href: "/download" },
    backdrop: { image: "/prydd/landscape-field.jpg", position: "center 65%" },
    variants: [
      {
        id: "earning",
        label: "Earning",
        caption: "Earn balance",
        amount: "$1,240.00",
        rows: [
          { label: "Moved in this month", meta: "From USD balance", value: "+$200.00" },
          { label: "Interest so far", meta: "Added as it accrues", value: "+$6.12" },
        ],
      },
      {
        id: "withdraw",
        label: "Withdraw",
        caption: "Back to your balance",
        amount: "$300.00",
        rows: [
          { label: "Withdraw", meta: "Any time", value: "$300.00" },
          { label: "Network fee", meta: "Covered by Prydd", value: "$0.00" },
        ],
      },
    ],
  },
  {
    id: "crypto",
    title: "Crypto, in the same account.",
    body: "Hold bitcoin and SOL beside your dollars. One balance, one activity feed, one sign-in.",
    note: "Capital at risk. Bitcoin is held as wrapped bitcoin.",
    cta: { label: "Explore crypto", href: "/download" },
    backdrop: { image: "/prydd/landscape-sky.jpg", position: "center 40%" },
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
        id: "swap",
        label: "Swap",
        caption: "Dollars to SOL",
        amount: "$250.00",
        rows: [
          { label: "You swap", meta: "From USD balance", value: "$250.00" },
          { label: "You receive", meta: "At the live quote", value: "1.16 SOL" },
        ],
      },
      {
        id: "send",
        label: "Send",
        caption: "Sent to Leo",
        amount: "0.40 SOL",
        rows: [
          { label: "Settled", meta: "Today, in seconds", value: "Done" },
          { label: "Network fee", meta: "Covered by Prydd", value: "$0.00" },
        ],
      },
    ],
  },
  {
    id: "pay",
    title: "Pay online with your face.",
    body: "Tap Pay with Prydd at checkout, confirm with Face ID, done. No card number, no new account.",
    cta: { label: "Try it in our demo shop", href: "https://shop.prydd.co" },
    secondary: { label: "For businesses: accept Pay with Prydd", href: "https://merchant.prydd.co" },
    backdrop: {},
    variants: [
      {
        id: "checkout",
        label: "Checkout",
        caption: "Pay with Prydd",
        amount: "$48.00",
        rows: [
          { label: "Confirm", meta: "Face ID, no card number", value: "Paid" },
          { label: "Next time", meta: "One tap at this shop", value: "Saved" },
        ],
      },
      {
        id: "shops",
        label: "Your shops",
        caption: "Connected shops",
        amount: "2 shops",
        rows: [
          { label: "Remove a shop", meta: "From Settings, instantly", value: "Revoke" },
          { label: "Above your limit", meta: "Approve on your phone", value: "Ask" },
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
        {chapter.secondary && <a className={styles.secondaryLink} href={chapter.secondary.href}>{chapter.secondary.label}</a>}
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
      <section id={"prydd-" + chapter.id} className={styles.chapterSection} data-photo={photo}>
        <div className={styles.backdropLayer}><Backdrop chapter={chapter} /></div>
        <ChapterBody chapter={chapter} />
      </section>
    )
  }

  return (
    <section ref={section} id={"prydd-" + chapter.id} className={styles.chapterSection} data-photo={photo}>
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
        <h2>No single party can move your money. Not even us.</h2>
        <p>
          Every account needs two of three keys to move money: your passkey, your phone and your email.
          Change a security setting and it waits 24 hours, so nobody can rush you.
        </p>
        <ul className={styles.safeList}>
          <li>No password to remember or leak.</li>
          <li>Lose your phone and recover with your email.</li>
          <li>Set a daily quick-pay limit.</li>
        </ul>
        <a className={styles.safeCta} href="/download">
          Get the app
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

  if (reduced) return <section id="prydd-security" className={styles.safeSection}>{body}</section>
  return (
    <section ref={section} id="prydd-security" className={styles.safeSection}>
      <motion.div className={styles.revealed} style={{ opacity }}>{body}</motion.div>
    </section>
  )
}

const holdings = [
  { name: "Apple", short: "AP" },
  { name: "Tesla", short: "TS" },
  { name: "Nvidia", short: "NV" },
  { name: "S&P 500 ETF", short: "SP" },
  { name: "Nasdaq 100 ETF", short: "QQ" },
]

function InvestingSection({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLElement>(null)
  const { opacity } = useSectionMotion(section)
  const body = (
    <div className={styles.investingInner}>
      <div className={styles.copy}>
        <h2>Explore tokenized stocks and ETFs.</h2>
        <p>Put dollars into companies like Apple and Tesla, and into funds, without leaving the account your money already lives in.</p>
        <span className={styles.note}>Capital at risk. Tokenized stocks track a share price; they are not shares and give no shareholder rights. Not available in every country.</span>
        <a className={styles.chapterCta} href="/download">
          Explore investments
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.discRow} aria-hidden="true">
        {holdings.map((holding, index) => (
          <span key={holding.name} className={styles.disc} style={{ "--index": index } as CSSProperties} title={holding.name}>
            <span className={styles.discFace}>{holding.short}</span>
            <span className={styles.discFace} data-reverse />
          </span>
        ))}
      </div>
    </div>
  )

  if (reduced) return <section id="prydd-invest" className={styles.investingSection}>{body}</section>
  return (
    <section ref={section} id="prydd-invest" className={styles.investingSection}>
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
