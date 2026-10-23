"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react"
import { PhotoGlobe, globeProjectionDiameter } from "./photo-globe"
import { photoPosition } from "./photo-atlas"
import { StorySections, ClosingInvitation } from "./story-sections"
import { useHeroHandoff } from "./use-hero-handoff"
import styles from "./prydd-home.module.css"

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const portion = (value: number, start: number, end: number) => clamp((value - start) / (end - start))
const chapters = [
  { id: "prydd-funding", label: "Add money" },
  { id: "prydd-account", label: "Your account" },
  { id: "prydd-people", label: "Send by username" },
  { id: "prydd-faq", label: "FAQs" },
] as const

function Brand() {
  return <span className={styles.brand}><span className={styles.mark} aria-hidden="true" />PRYDD</span>
}

function Avatar({ cell = 0 }: { cell?: number }) {
  return (
    <span
      className={styles.avatar}
      aria-hidden="true"
      style={{ backgroundPosition: photoPosition(cell) }}
    />
  )
}

function BalanceCard() {
  return (
    <div className={styles.balanceContents}>
      <span className={styles.cardEyebrow}>Hold dollars</span>
      <span className={styles.balanceLabel}>USD balance</span>
      <strong className={styles.balance}>$250<span>.00</span></strong>
      <div className={styles.activity}>
        <div><Avatar cell={2} /><span>From @sarah<small>Received · Today</small></span><b className={styles.received}>+$50.00</b></div>
        <div><Avatar cell={8} /><span>To @leo<small>Sent · Today</small></span><b>−$25.00</b></div>
      </div>
    </div>
  )
}

function FundingCard() {
  return (
    <>
      <span className={styles.cardEyebrow}>Add money</span>
      <div className={styles.fundingIcons}><span><Plus size={31} strokeWidth={1.6} /></span><ArrowRight size={22} /><span className={styles.dollar}>$</span></div>
      <p>Local money <ArrowRight size={14} /> USD</p>
    </>
  )
}

function SendCard() {
  return (
    <>
      <span className={styles.cardEyebrow}>Send by username</span>
      <Avatar />
      <strong className={styles.username}>@maya</strong>
      <div className={styles.smallAmount}><span>$25.00</span><span><Check size={22} /></span></div>
    </>
  )
}

function HeroSequence({ onHeroChange }: { onHeroChange: (visible: boolean) => void }) {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const balanceCard = useRef<HTMLDivElement>(null)
  const productHeading = useRef<HTMLDivElement>(null)
  useHeroHandoff(section, stage)
  const globeDestination = useMotionValue({ x: 0, y: 50, scale: 0.62 })
  const [productVisible, setProductVisible] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const { scrollYProgress: progress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const headlineOpacity = useTransform(progress, [0, 0.12, 0.36, 1], [1, 1, 0, 0])
  const headlineTransform = useTransform(progress, (value) => "translateY(" + -22 * portion(value, 0.12, 0.36) + "px)")
  const globeTransform = useTransform(() => {
    const value = progress.get()
    const target = globeDestination.get()
    const contraction = portion(value, 0.08, 0.61)
    return "translate3d(" + target.x * contraction + "px, " + target.y * contraction + "px, 0) scale(" + (1 + (target.scale - 1) * contraction) + ")"
  })
  const globeOpacity = useTransform(progress, [0, 0.42, 0.69, 1], [1, 1, 0.52, 0.52])
  const sceneClip = useTransform(progress, (value) => {
    const contraction = portion(value, 0.08, 0.61)
    return "inset(" + 22 * contraction + "% " + 31 * contraction + "% " + 10 * contraction + "% round " + 32 * contraction + "px)"
  })
  const sceneOpacity = useTransform(progress, [0, 0.50, 0.75, 1], [1, 1, 0, 0])
  const productsOpacity = useTransform(progress, [0, 0.40, 0.63, 1], [0, 0, 1, 1])
  const titleOpacity = useTransform(progress, [0, 0.42, 0.61, 1], [0, 0, 1, 1])
  const centerTransform = useTransform(progress, (value) => "translateY(" + 40 * (1 - portion(value, 0.40, 0.70)) + "px) scale(" + (0.96 + portion(value, 0.40, 0.70) * 0.04) + ")")
  const leftTransform = useTransform(progress, (value) => "translate3d(" + 34 * (1 - portion(value, 0.48, 0.83)) + "%, 0, 0)")
  const rightTransform = useTransform(progress, (value) => "translate3d(" + -34 * (1 - portion(value, 0.48, 0.83)) + "%, 0, 0)")
  const companionsOpacity = useTransform(progress, [0, 0.52, 0.82, 1], [0, 0, 1, 1])
  const hintOpacity = useTransform(progress, [0, 0.12, 0.27, 1], [1, 1, 0, 0])

  useEffect(() => {
    const host = stage.current
    const card = balanceCard.current
    if (!host || !card) return
    const update = () => {
      // Layout offsets exclude Motion's transforms, keeping the settled sphere
      // centred on the account card without measuring on every scroll frame.
      let x = card.offsetWidth / 2
      let y = card.offsetHeight / 2
      let node: HTMLElement | null = card
      while (node && node !== host) {
        x += node.offsetLeft
        y += node.offsetTop
        node = node.offsetParent as HTMLElement | null
      }
      const diameter = host.clientWidth <= 760
        ? Math.max(card.offsetHeight * 1.35, card.offsetWidth * 0.78)
        : Math.max(card.offsetHeight * 1.16, card.offsetWidth * 1.10)
      globeDestination.set({
        x: x - host.clientWidth / 2,
        y: y - host.clientHeight / 2,
        scale: Math.max(0.28, Math.min(0.85, diameter / globeProjectionDiameter(host.clientWidth, host.clientHeight))),
      })
    }
    const observer = new ResizeObserver(update)
    observer.observe(host)
    observer.observe(card)
    if (productHeading.current) observer.observe(productHeading.current)
    update()
    return () => observer.disconnect()
  }, [globeDestination])

  useMotionValueEvent(progress, "change", (value) => {
    const nextHero = value < 0.30
    const nextProduct = value >= 0.47
    setHeroVisible((current) => current === nextHero ? current : nextHero)
    setProductVisible((current) => current === nextProduct ? current : nextProduct)
    onHeroChange(value < 0.13)
  })

  return (
    <section ref={section} className={styles.sequence} aria-label="From everyday global money to your PRYDD account">
      <div ref={stage} className={styles.sticky}>
        <motion.div className={styles.sceneFill} style={{ clipPath: sceneClip, opacity: sceneOpacity }} aria-hidden="true" />
        <motion.div className={styles.globeLayer} style={{ transform: globeTransform, opacity: globeOpacity }}><PhotoGlobe /></motion.div>
        <motion.div className={styles.heroCopy} style={{ opacity: headlineOpacity, transform: headlineTransform }} aria-hidden={!heroVisible} inert={!heroVisible}>
          <h1><span>One app for</span><span>everyday</span><span>global money.</span></h1>
          <p>Add money. Hold dollars. Send by username.</p>
          <a className={styles.heroCta} href="/waitlist">Join early access <ArrowUpRight size={18} /></a>
        </motion.div>
        <motion.div className={styles.scrollHint} style={{ opacity: hintOpacity }} aria-hidden="true">Scroll to explore <ArrowDown size={16} /></motion.div>
        <div className={styles.products} aria-hidden={!productVisible} inert={!productVisible}>
          <motion.div ref={productHeading} className={styles.productHeading} style={{ opacity: titleOpacity }}>
            <span>Everyday money. One place.</span>
            <h2>Your money, made simple.</h2>
          </motion.div>
          <div className={styles.panelRow}>
            <motion.div className={styles.fundingCard} style={{ transform: leftTransform, opacity: companionsOpacity }}><FundingCard /></motion.div>
            <motion.div ref={balanceCard} className={styles.centerCard} style={{ transform: centerTransform, opacity: productsOpacity }}><BalanceCard /></motion.div>
            <motion.div className={styles.smallSendCard} style={{ transform: rightTransform, opacity: companionsOpacity }}><SendCard /></motion.div>
          </div>
          <motion.p className={styles.illustrative} style={{ opacity: companionsOpacity }}>An illustrative look inside PRYDD.</motion.p>
        </div>
      </div>
    </section>
  )
}

function ReducedSequence({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
  return (
    <>
      <section ref={heroRef} className={styles.reducedHero}>
        <div className={styles.reducedGlobe}><PhotoGlobe reducedMotion /></div>
        <div className={styles.heroCopy}>
          <h1><span>One app for</span><span>everyday</span><span>global money.</span></h1>
          <p>Add money. Hold dollars. Send by username.</p>
          <a className={styles.heroCta} href="/waitlist">Join early access <ArrowUpRight size={18} /></a>
        </div>
      </section>
      <section className={styles.reducedProducts}>
        <div className={styles.productHeading}><span>Everyday money. One place.</span><h2>Your money, made simple.</h2></div>
        <div className={styles.panelRow}>
          <div className={styles.fundingCard}><FundingCard /></div>
          <div className={styles.centerCard}><BalanceCard /></div>
          <div className={styles.smallSendCard}><SendCard /></div>
        </div>
        <p className={styles.illustrative}>An illustrative look inside PRYDD.</p>
      </section>
    </>
  )
}

export function PryddHome() {
  const [onHero, setOnHero] = useState(true)
  const [activeChapter, setActiveChapter] = useState("")
  const [shortViewport, setShortViewport] = useState(false)
  const [systemReducedMotion, setSystemReducedMotion] = useState(false)
  const staticHeroRef = useRef<HTMLElement>(null)
  const reduced = systemReducedMotion || shortViewport
  const onHeroChange = useCallback((visible: boolean) => setOnHero((current) => current === visible ? current : visible), [])

  useEffect(() => {
    const query = window.matchMedia("(max-height: 600px)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      setShortViewport(query.matches)
      setSystemReducedMotion(motionQuery.matches)
    }
    update()
    query.addEventListener("change", update)
    motionQuery.addEventListener("change", update)
    return () => {
      query.removeEventListener("change", update)
      motionQuery.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!reduced) return
    const update = () => onHeroChange(window.scrollY < (staticHeroRef.current?.offsetHeight ?? window.innerHeight) - 90)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [reduced, onHeroChange])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let current = ""
      for (const chapter of chapters) {
        const element = document.getElementById(chapter.id)
        if (element && element.getBoundingClientRect().top <= Math.min(220, window.innerHeight * 0.35)) current = chapter.id
      }
      setActiveChapter((previous) => previous === current ? previous : current)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <main className={styles.page} data-reduced-motion={reduced}>
      <a href="#prydd-story" className={styles.skip}>Skip to the product story</a>
      <header className={styles.header} data-on-hero={onHero}>
        <nav aria-label="PRYDD navigation">
          <a href="#prydd-top" aria-label="PRYDD home"><Brand /></a>
          <a className={styles.howLink} href="#prydd-story">How it works</a>
          <div className={styles.chapterNav} role="group" aria-label="Product chapters">
            {chapters.map((chapter) => <a key={chapter.id} href={"#" + chapter.id} aria-current={activeChapter === chapter.id ? "location" : undefined}>{chapter.label}</a>)}
          </div>
          <a className={styles.navCta} href="/waitlist">Join early access <ArrowUpRight size={15} /></a>
        </nav>
      </header>
      <div id="prydd-top" />
      {reduced ? <ReducedSequence heroRef={staticHeroRef} /> : <HeroSequence onHeroChange={onHeroChange} />}
      <div id="prydd-story" className={styles.storyAnchor}><StorySections /></div>
      <ClosingInvitation />
    </main>
  )
}
