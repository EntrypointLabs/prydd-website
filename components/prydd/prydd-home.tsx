"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react"
import { PhotoGlobe, globeProjectionDiameter } from "./photo-globe"
import { photoPosition } from "./photo-atlas"
import { PryddWordmark } from "@/components/prydd-wordmark"
import { StorySections, ClosingInvitation } from "./story-sections"
import { CurrencyStream } from "./currency-stream"
import { useHeroHandoff } from "./use-hero-handoff"
import styles from "./prydd-home.module.css"

const HERO_THEME_COLOR = "#17191d"
const PAGE_THEME_COLOR = "#ffffff"
const clamp = (value: number) => Math.max(0, Math.min(1, value))
const portion = (value: number, start: number, end: number) => clamp((value - start) / (end - start))
const chapters = [
  { id: "prydd-funding", label: "Add money" },
  { id: "prydd-send", label: "Send" },
  { id: "prydd-life", label: "Earn" },
  { id: "prydd-pay", label: "Pay with Prydd" },
  { id: "prydd-security", label: "Security" },
  { id: "prydd-invest", label: "Invest" },
  { id: "prydd-faq", label: "FAQs" },
] as const

function Brand() {
  return <PryddWordmark variant="header" />
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
        <div><Avatar cell={2} /><span>From Sarah<small>Received · Today</small></span><b className={styles.received}>+$50.00</b></div>
        <div><Avatar cell={8} /><span>To Leo<small>Sent · Today</small></span><b>−$25.00</b></div>
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
      <span className={styles.cardEyebrow}>Send</span>
      <Avatar />
      <strong className={styles.username}>Maya</strong>
      <div className={styles.smallAmount}><span>$25.00</span><span><Check size={22} /></span></div>
    </>
  )
}

function HeroCopy() {
  return (
    <>
      <h1><span>One app for</span><span>everyday</span><span>global money.</span></h1>
      <a className={styles.heroCta} href="/download">Get the app <ArrowUpRight size={18} /></a>
      <span className={styles.heroNote}>Public beta on iPhone. Android soon.</span>
    </>
  )
}

function HeroSequence({ onHeroChange }: { onHeroChange: (visible: boolean) => void }) {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const skyPanel = useRef<HTMLDivElement>(null)
  const balanceCard = useRef<HTMLDivElement>(null)
  const productHeading = useRef<HTMLDivElement>(null)
  useHeroHandoff(section, stage)
  const globeStart = useMotionValue({ x: 0, y: 0, scale: 0.6 })
  const globeDestination = useMotionValue({ x: 0, y: 50, scale: 0.62 })
  const [productVisible, setProductVisible] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const { scrollYProgress: progress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const headlineOpacity = useTransform(progress, [0, 0.08, 0.28, 1], [1, 1, 0, 0])
  const headlineTransform = useTransform(progress, (value) => "translateY(" + -22 * portion(value, 0.08, 0.28) + "px)")
  const streamOpacity = useTransform(progress, [0, 0.04, 0.2, 1], [1, 1, 0, 0])
  const globeTransform = useTransform(() => {
    const value = progress.get()
    const start = globeStart.get()
    const target = globeDestination.get()
    const travel = portion(value, 0.08, 0.61)
    const x = start.x + (target.x - start.x) * travel
    const y = start.y + (target.y - start.y) * travel
    const scale = start.scale + (target.scale - start.scale) * travel
    return "translate3d(" + x + "px, " + y + "px, 0) scale(" + scale + ")"
  })
  const globeOpacity = useTransform(progress, [0, 0.42, 0.69, 1], [1, 1, 0.52, 0.52])
  const skyOpacity = useTransform(progress, [0, 0.50, 0.75, 1], [1, 1, 0, 0])
  const skyClip = useTransform(progress, (value) => {
    const contraction = portion(value, 0.08, 0.61)
    return "inset(" + 22 * contraction + "% " + 31 * contraction + "% " + 10 * contraction + "% round " + 32 * contraction + "px)"
  })
  const productsOpacity = useTransform(progress, [0, 0.40, 0.63, 1], [0, 0, 1, 1])
  const titleOpacity = useTransform(progress, [0, 0.42, 0.61, 1], [0, 0, 1, 1])
  const centerTransform = useTransform(progress, (value) => "translateY(" + 40 * (1 - portion(value, 0.40, 0.70)) + "px) scale(" + (0.96 + portion(value, 0.40, 0.70) * 0.04) + ")")
  const leftTransform = useTransform(progress, (value) => "translate3d(" + 34 * (1 - portion(value, 0.48, 0.83)) + "%, 0, 0)")
  const rightTransform = useTransform(progress, (value) => "translate3d(" + -34 * (1 - portion(value, 0.48, 0.83)) + "%, 0, 0)")
  const companionsOpacity = useTransform(progress, [0, 0.52, 0.82, 1], [0, 0, 1, 1])

  useEffect(() => {
    const host = stage.current
    const card = balanceCard.current
    const sky = skyPanel.current
    if (!host || !card || !sky) return
    const centreOf = (element: HTMLElement) => {
      // Layout offsets exclude Motion's transforms, so the resting geometry is
      // read without measuring on every scroll frame.
      let x = element.offsetWidth / 2
      let y = element.offsetHeight / 2
      let node: HTMLElement | null = element
      while (node && node !== host) {
        x += node.offsetLeft
        y += node.offsetTop
        node = node.offsetParent as HTMLElement | null
      }
      return { x: x - host.clientWidth / 2, y: y - host.clientHeight / 2 }
    }
    const update = () => {
      const sphere = globeProjectionDiameter(host.clientWidth, host.clientHeight)
      globeStart.set({ ...centreOf(sky), scale: Math.min(1, sky.offsetHeight * 0.9 / sphere) })
      const diameter = host.clientWidth <= 760
        ? Math.max(card.offsetHeight * 1.35, card.offsetWidth * 0.78)
        : Math.max(card.offsetHeight * 1.16, card.offsetWidth * 1.10)
      globeDestination.set({ ...centreOf(card), scale: Math.max(0.28, Math.min(0.85, diameter / sphere)) })
    }
    const observer = new ResizeObserver(update)
    observer.observe(host)
    observer.observe(card)
    observer.observe(sky)
    if (productHeading.current) observer.observe(productHeading.current)
    update()
    return () => observer.disconnect()
  }, [globeStart, globeDestination])

  useMotionValueEvent(progress, "change", (value) => {
    const nextHero = value < 0.26
    const nextProduct = value >= 0.47
    setHeroVisible((current) => current === nextHero ? current : nextHero)
    setProductVisible((current) => current === nextProduct ? current : nextProduct)
    onHeroChange(value < 0.13)
  })

  return (
    <section ref={section} className={styles.sequence} aria-label="Money, but faster: from the Prydd globe to your account">
      <div ref={stage} className={styles.sticky}>
        <motion.div ref={skyPanel} className={styles.sky} style={{ opacity: skyOpacity, clipPath: skyClip }} aria-hidden="true" />
        <motion.div className={styles.globeLayer} style={{ transform: globeTransform, opacity: globeOpacity }}><PhotoGlobe /></motion.div>
        <motion.div className={styles.heroCopy} style={{ opacity: headlineOpacity, transform: headlineTransform }} aria-hidden={!heroVisible} inert={!heroVisible}>
          <HeroCopy />
        </motion.div>
        <motion.div className={styles.heroStream} style={{ opacity: streamOpacity }}><CurrencyStream /></motion.div>
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
          <motion.p className={styles.illustrative} style={{ opacity: companionsOpacity }}>An illustrative look inside Prydd.</motion.p>
        </div>
      </div>
    </section>
  )
}

function ReducedSequence({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
  return (
    <>
      <section ref={heroRef} className={styles.reducedHero}>
        <div className={styles.sky} aria-hidden="true"><div className={styles.reducedGlobe}><PhotoGlobe reducedMotion /></div></div>
        <div className={styles.heroCopy}><HeroCopy /></div>
        <div className={styles.heroStream}><CurrencyStream /></div>
      </section>
      <section className={styles.reducedProducts}>
        <div className={styles.productHeading}><span>Everyday money. One place.</span><h2>Your money, made simple.</h2></div>
        <div className={styles.panelRow}>
          <div className={styles.fundingCard}><FundingCard /></div>
          <div className={styles.centerCard}><BalanceCard /></div>
          <div className={styles.smallSendCard}><SendCard /></div>
        </div>
        <p className={styles.illustrative}>An illustrative look inside Prydd.</p>
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
    // Safari re-samples the status bar from the page once it scrolls and does
    // not return to the initial theme-color on its own, so keep the tag in step
    // with whatever sits under the bar.
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = onHero ? HERO_THEME_COLOR : PAGE_THEME_COLOR
  }, [onHero])

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
      const threshold = Math.min(220, window.innerHeight * 0.35)
      let current = ""
      let nearest = -Infinity
      for (const chapter of chapters) {
        const top = document.getElementById(chapter.id)?.getBoundingClientRect().top
        if (top !== undefined && top <= threshold && top > nearest) {
          nearest = top
          current = chapter.id
        }
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
        <nav aria-label="Prydd navigation">
          <a href="#prydd-top" aria-label="Prydd home"><Brand /></a>
          <div className={styles.chapterNav} role="group" aria-label="Product chapters">
            {chapters.map((chapter) => <a key={chapter.id} href={"#" + chapter.id} aria-current={activeChapter === chapter.id ? "location" : undefined}>{chapter.label}</a>)}
          </div>
          <div className={styles.navActions}>
            <a className={styles.howLink} href="https://merchant.prydd.co">For businesses</a>
            <a className={styles.navCta} href="/download">Get the app <ArrowUpRight size={15} /></a>
          </div>
        </nav>
      </header>
      <div id="prydd-top" />
      {reduced ? <ReducedSequence heroRef={staticHeroRef} /> : <HeroSequence onHeroChange={onHeroChange} />}
      <div id="prydd-story" className={styles.storyAnchor}><StorySections /></div>
      <ClosingInvitation />
    </main>
  )
}
