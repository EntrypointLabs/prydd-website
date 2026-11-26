import type { ReactNode } from "react"
import { ArrowDown, ArrowDownLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Plus } from "lucide-react"
import { PryddWordmark } from "@/components/prydd-wordmark"
import { LifeSequence } from "./life-sequence"
import { SiteFooter } from "./site-footer"
import styles from "./story-sections.module.css"

function Photo({ tile, className = "" }: { tile: number; className?: string }) {
  const cellWidth = 1448 / 4
  const cellHeight = 1086 / 4
  return <span className={styles.photo + " " + className} aria-hidden="true"><svg className={styles.photoCrop} viewBox={(tile % 4) * cellWidth + " " + Math.floor(tile / 4) * cellHeight + " " + cellWidth + " " + cellHeight} preserveAspectRatio="xMidYMid slice" focusable="false"><image href="/prydd/photos-atlas.png" width="1448" height="1086" /></svg></span>
}

function BrandSymbol() { return <PryddWordmark variant="symbol" /> }

function ActivityRecord({ sent = false }: { sent?: boolean }) {
  return <div className={styles.activityRecord}>{sent ? <Photo tile={0} className={styles.activityPortrait} /> : <span className={styles.addedIcon} aria-hidden="true"><ArrowDownLeft size={16} /></span>}<div><strong>{sent ? "To Maya" : "Money added"}</strong><span>{sent ? "Sent · Today" : "Local currency → USD"}</span></div><b>{sent ? "−$25.00" : "+$250.00"}</b></div>
}

function FeatureChapter({ id, eyebrow, title, description, bullets, action, note, flip = false, children }: {
  id: string; eyebrow: string; title: string; description: string; bullets: string[]; action: { href: string; label: string }; note?: string; flip?: boolean; children: ReactNode
}) {
  return (
    <section id={id} className={styles.featureRow} data-flip={flip || undefined} aria-labelledby={id + "-heading"}>
      <div className={styles.featureCopy}>
        <div className={styles.featureHeading}><span className={styles.eyebrow}><span aria-hidden="true" />{eyebrow}</span><h2 id={id + "-heading"}>{title}</h2></div>
        <div className={styles.featureBody}><p>{description}</p><ul>{bullets.map((bullet) => <li key={bullet}><Check size={15} strokeWidth={1.6} aria-hidden="true" /><span>{bullet}</span></li>)}</ul><a className={styles.chapterAction} href={action.href}>{action.label}<ArrowUpRight size={15} aria-hidden="true" /></a>{note && <p className={styles.illustrativeNote}>{note}</p>}</div>
      </div>
      {children}
    </section>
  )
}

function FundingScene() {
  return (
    <figure className={styles.visualStage + " " + styles.fundingScene} aria-label="Illustrative local funding followed by a 250 dollar balance">
      <div className={styles.fundingFlow}>
        <div className={styles.localPanel}><span className={styles.panelHeading}>Add money</span><div className={styles.localField}><span className={styles.localIcon} aria-hidden="true"><Plus size={18} /></span><div><span className={styles.uiLabel}>From</span><strong>Local currency</strong></div></div></div>
        <span className={styles.fundingArrow} aria-hidden="true"><ArrowDown size={28} strokeWidth={1.4} /></span>
        <div className={styles.dollarPanel}><div className={styles.fragmentBrand}><BrandSymbol />PRYDD</div><span className={styles.uiLabel}>Dollar balance</span><strong className={styles.sceneBalance}>$250<span>.00</span></strong><div className={styles.currencyLine}><span className={styles.currencyDot}>$</span><span>US dollars</span><b>USD</b></div></div>
      </div>
      <div className={styles.fundingLegend}><span><b>01</b>Local currency</span><span><b>02</b>Add money</span><span><b>03</b>USD balance</span></div>
    </figure>
  )
}

function AccountScene() {
  return (
    <figure className={styles.visualStage + " " + styles.accountScene} aria-label="Illustrative account showing 250 dollars added and held in a dollar balance">
      <div className={styles.accountWindow}><div className={styles.windowHeader}><span><BrandSymbol />Your account</span><span>USD</span></div><div className={styles.accountMain}><span className={styles.uiLabel}>Dollar balance</span><strong className={styles.sceneBalance}>$250<span>.00</span></strong><div className={styles.accountActions} aria-hidden="true"><span><Plus size={15} />Add money</span><span><ArrowUpRight size={15} />Send</span></div></div><div className={styles.activityHeader}><strong>Activity</strong><span>Today</span></div><ActivityRecord /></div>
      <span className={styles.accountFloatingLabel}><span aria-hidden="true">$</span>US dollars</span>
    </figure>
  )
}

function PeopleScene() {
  return (
    <figure className={styles.visualStage + " " + styles.peopleScene} aria-label="Illustrative payment of 25 dollars to a saved contact named Maya">
      <Photo tile={2} className={styles.floatingPortrait1} /><Photo tile={8} className={styles.floatingPortrait2} />
      <div className={styles.recipientPanel}><div className={styles.recipientHeader}><span>Send</span><span className={styles.tinyCheck} aria-hidden="true"><Check size={15} /></span></div><div className={styles.recipientIdentity}><Photo tile={0} className={styles.mayaPortrait} /><div><span className={styles.uiLabel}>Recipient</span><strong>Maya</strong></div></div><div className={styles.recipientAmount}><span className={styles.uiLabel}>Amount sent</span><strong>$25<span>.00</span></strong></div><div className={styles.recipientResult}><span className={styles.resultCheck} aria-hidden="true"><Check size={15} /></span><span>Sent to Maya<small>Today</small></span></div></div>
      <span className={styles.usernamePill}>Saved contact</span>
    </figure>
  )
}

function ResultScene() {
  return (
    <figure className={styles.visualStage + " " + styles.resultScene} aria-label="Illustrative receipt and activity showing 250 dollars added, 25 dollars sent and 225 dollars remaining">
      <div className={styles.receiptPanel}><span className={styles.receiptCheck} aria-hidden="true"><Check size={24} /></span><span className={styles.uiLabel}>Payment sent</span><strong>$25<span>.00</span></strong><Photo tile={0} className={styles.receiptPortrait} /><span className={styles.receiptPerson}>To Maya</span><small>Today</small></div>
      <div className={styles.resultAccount}><div className={styles.windowHeader}><span><BrandSymbol />Your account</span><span>USD</span></div><div className={styles.resultBalance}><span className={styles.uiLabel}>Remaining balance</span><strong>$225<span>.00</span></strong></div><div className={styles.activityHeader}><strong>Activity</strong><span>Today</span></div><ActivityRecord /><ActivityRecord sent /></div>
      <div className={styles.resultLegend}>$250 added <ArrowRight size={13} aria-hidden="true" /> $25 sent <ArrowRight size={13} aria-hidden="true" /> $225 remaining</div>
    </figure>
  )
}

function HumanContext() {
  return (
    <section className={styles.humanSection} aria-labelledby="prydd-human-heading"><div className={styles.shell}><h2 id="prydd-human-heading">Money has a human side.</h2><p>A balance for you. A payment to someone else.</p><div className={styles.portraitStrip} aria-hidden="true"><Photo tile={2} className={styles.contextPortrait1} /><Photo tile={0} className={styles.contextPortrait2} /><Photo tile={8} className={styles.contextPortrait3} /></div></div></section>
  )
}

function PracticalOverview() {
  return (
    <section className={styles.practicalSection} aria-labelledby="prydd-practical-heading"><div className={styles.shell}><div className={styles.practicalSplit}><div className={styles.practicalPhoto}><h2 id="prydd-practical-heading">Small things<br />that add up.</h2></div><ul className={styles.practicalList}><li><Check size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>Fees covered</h3><p>We pay the network fee on every send, swap and Earn move.</p></div></li><li><span className={styles.practicalDollar} aria-hidden="true">$</span><div><h3>Convert a price</h3><p>See what anything costs in your own currency. <a href="/tools/currency-converter">Try the converter</a></p></div></li><li><ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>One feed</h3><p>Every payment, top-up and change, in one list.</p></div></li></ul></div></div></section>
  )
}

const comingNext = [
  { title: "Prydd Card", body: "Spend your balance anywhere, online and in store.", art: "card" },
  { title: "Prydd Plus", body: "A membership for people who use Prydd every day.", art: "plus" },
  { title: "Jars", body: "Keep money apart from spending and save towards a goal.", art: "/prydd/illustrations/jar.webp" },
  { title: "Group spending", body: "Invite up to four people to spend from one pot.", art: "/prydd/illustrations/group.webp" },
  { title: "Split a bill", body: "Share the cost and settle up in a tap.", art: "/prydd/illustrations/split.webp" },
  { title: "Scheduled transfers", body: "Set it up now and send it later, or on repeat.", art: "/prydd/illustrations/calendar.webp" },
  { title: "Find an ATM", body: "Find a cash machine near you.", art: "/prydd/illustrations/atm.webp" },
] as const

function ComingArt({ art }: { art: string }) {
  if (art === "card") return <span className={styles.cardArt} aria-hidden="true"><BrandSymbol /></span>
  if (art === "plus") return <span className={styles.plusArt} aria-hidden="true"><BrandSymbol /><Plus size={22} strokeWidth={2} /></span>
  return <img className={styles.comingImage} src={art} alt="" width={720} height={720} loading="lazy" decoding="async" />
}

function ComingNext() {
  return (
    <section id="prydd-next" className={styles.comingSection} aria-labelledby="prydd-next-heading">
      <div className={styles.shell}>
        <div className={styles.comingIntro}><h2 id="prydd-next-heading">What&rsquo;s coming next.</h2><p>Built in the open. Each of these is on the way, not live yet.</p></div>
        <ul className={styles.comingGrid}>
          {comingNext.map((item) => (
            <li key={item.title} className={styles.comingTile}>
              <div className={styles.comingArt}><ComingArt art={item.art} /></div>
              <span className={styles.comingBadge}>Coming soon</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const questions = [
  { question: "What is Prydd?", answer: "An app to hold dollars, add money in local currency, send, earn, invest and pay online with your face, all in one account." },
  { question: "How do I add money?", answer: "Send money by bank transfer in your local currency. It lands as dollars." },
  { question: "What currency is my balance in?", answer: "US dollars. You can view it in your own currency too." },
  { question: "Who can I send money to?", answer: "A saved contact, a local bank account, or anyone who shares a Prydd QR code." },
  { question: "Do I need ID?", answer: "Not to open an account. Adding or sending local currency above a daily limit needs one quick ID check." },
  { question: "Are there fees?", answer: "We cover network fees. Bank top-ups and bank sends carry the partner's fee, shown before you confirm." },
  { question: "What if I lose my phone?", answer: "Recover your account on a new phone with your email. Your money stays where it is." },
  { question: "How do I get the app?", answer: "Tap Get the app. On iPhone, Prydd installs through TestFlight while we're in beta. Android is coming soon." },
]

function QuestionsChapter() {
  return (
    <section id="prydd-faq" className={styles.questionsSection} aria-labelledby="prydd-questions-heading"><div className={styles.faqShell}><div className={styles.faqInner}><div className={styles.faqIntro}><h2 id="prydd-questions-heading">Frequently<br />asked questions</h2><p>A few answers about the account,<br /> payments and getting the app.</p><a className={styles.chapterAction} href="/download">Get the app<ArrowUpRight size={15} aria-hidden="true" /></a></div><div className={styles.questionsList}>{questions.map(({ question, answer }) => <details key={question} className={styles.question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></div></section>
  )
}

export function StorySections() {
  return (
    <div className={styles.storySections}>
      <div className={styles.featureRows}>
        <FeatureChapter id="prydd-funding" eyebrow="Add money" title="Add money in local currency. Keep it in dollars." description="Top up by bank transfer and see it land as a dollar balance." bullets={["Top up by bank transfer.", "Start with no ID.", "One quick ID check lifts your daily limit."]} action={{ href: "#prydd-account", label: "Explore your account" }} note="Illustrative product views and amounts throughout this page."><FundingScene /></FeatureChapter>
        <FeatureChapter id="prydd-account" eyebrow="Dollar account" title="Your balance and payments, in one place." description="A clear dollar balance above a readable list of money in and money out." bullets={["Hold your balance in US dollars.", "See every payment you send and receive.", "Your balance only moves when the money has actually moved."]} action={{ href: "#prydd-send", label: "Explore Send" }} flip><AccountScene /></FeatureChapter>
        <FeatureChapter id="prydd-send" eyebrow="Send" title="Send to anyone in seconds." description="Pick a contact, enter an amount, done. Or send straight to a local bank account." bullets={["Send to a saved contact.", "Send to a local bank account.", "Scan a QR code to pay."]} action={{ href: "#prydd-activity", label: "Follow the payment" }}><PeopleScene /></FeatureChapter>
        <FeatureChapter id="prydd-activity" eyebrow="Account activity" title="Your payments and your balance tell the same story." description="In this example, $250 comes in and a $25 payment leaves $225." bullets={["Money added: $250.", "Sent to Maya: $25.", "Remaining balance: $225."]} action={{ href: "#prydd-life", label: "Explore Earn" }} flip><ResultScene /></FeatureChapter>
      </div>
      <HumanContext /><LifeSequence /><PracticalOverview /><ComingNext /><QuestionsChapter />
    </div>
  )
}

export function ClosingInvitation() {
  return (
    <div className={styles.closingBody}>
      <section className={styles.invitation} aria-labelledby="prydd-invitation-heading"><div className={styles.invitationInner}><div className={styles.invitationCopy}><h2 id="prydd-invitation-heading">Money, but faster. Get the app.</h2></div><div className={styles.invitationActions}><a href="/download" className={styles.invitationLink}>Get the app<ArrowUpRight size={16} aria-hidden="true" /></a></div></div></section>
      <SiteFooter />
    </div>
  )
}
