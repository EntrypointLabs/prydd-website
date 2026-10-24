import type { ReactNode } from "react"
import { ArrowDown, ArrowDownLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Plus } from "lucide-react"
import { LifeSequence } from "./life-sequence"
import styles from "./story-sections.module.css"

function Photo({ tile, className = "" }: { tile: number; className?: string }) {
  const cellWidth = 1448 / 4
  const cellHeight = 1086 / 4
  return <span className={styles.photo + " " + className} aria-hidden="true"><svg className={styles.photoCrop} viewBox={(tile % 4) * cellWidth + " " + Math.floor(tile / 4) * cellHeight + " " + cellWidth + " " + cellHeight} preserveAspectRatio="xMidYMid slice" focusable="false"><image href="/prydd/photos-atlas.png" width="1448" height="1086" /></svg></span>
}

function BrandSymbol() { return <span className={styles.brandSymbol} aria-hidden="true" /> }

function ActivityRecord({ sent = false }: { sent?: boolean }) {
  return <div className={styles.activityRecord}>{sent ? <Photo tile={0} className={styles.activityPortrait} /> : <span className={styles.addedIcon} aria-hidden="true"><ArrowDownLeft size={16} /></span>}<div><strong>{sent ? "To @maya" : "Money added"}</strong><span>{sent ? "Sent · Today" : "Local currency → USD"}</span></div><b>{sent ? "−$25.00" : "+$250.00"}</b></div>
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
    <figure className={styles.visualStage + " " + styles.peopleScene} aria-label="Illustrative payment of 25 dollars to maya identified by username">
      <Photo tile={2} className={styles.floatingPortrait1} /><Photo tile={8} className={styles.floatingPortrait2} />
      <div className={styles.recipientPanel}><div className={styles.recipientHeader}><span>Send by username</span><span className={styles.tinyCheck} aria-hidden="true"><Check size={15} /></span></div><div className={styles.recipientIdentity}><Photo tile={0} className={styles.mayaPortrait} /><div><span className={styles.uiLabel}>Recipient</span><strong>@maya</strong></div></div><div className={styles.recipientAmount}><span className={styles.uiLabel}>Amount sent</span><strong>$25<span>.00</span></strong></div><div className={styles.recipientResult}><span className={styles.resultCheck} aria-hidden="true"><Check size={15} /></span><span>Sent to @maya<small>Today</small></span></div></div>
      <span className={styles.usernamePill}>@maya</span>
    </figure>
  )
}

function ResultScene() {
  return (
    <figure className={styles.visualStage + " " + styles.resultScene} aria-label="Illustrative receipt and activity showing 250 dollars added, 25 dollars sent and 225 dollars remaining">
      <div className={styles.receiptPanel}><span className={styles.receiptCheck} aria-hidden="true"><Check size={24} /></span><span className={styles.uiLabel}>Payment sent</span><strong>$25<span>.00</span></strong><Photo tile={0} className={styles.receiptPortrait} /><span className={styles.receiptPerson}>To @maya</span><small>Today</small></div>
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
    <section className={styles.practicalSection} aria-labelledby="prydd-practical-heading"><div className={styles.shell}><div className={styles.practicalSplit}><div className={styles.practicalPhoto}><h2 id="prydd-practical-heading">Everyday money,<br />brought together.</h2></div><ul className={styles.practicalList}><li><Plus size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>Bring money in</h3><p>Add money from local currency to your PRYDD balance.</p></div></li><li><span className={styles.practicalDollar} aria-hidden="true">$</span><div><h3>Hold dollars</h3><p>Your account balance is denominated in USD.</p></div></li><li><ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>Pay by username</h3><p>Send dollars to another PRYDD user and see the payment in your activity.</p></div></li></ul></div></div></section>
  )
}

const questions = [
  { question: "What is PRYDD?", answer: "PRYDD brings local funding, a dollar balance and payments between users by username into one app." },
  { question: "How do I add money?", answer: "Add money from local currency to your PRYDD dollar balance. Supported funding methods will be confirmed before launch." },
  { question: "What currency does my balance use?", answer: "Your PRYDD balance uses US dollars (USD)." },
  { question: "Who can I send money to?", answer: "Send dollars to another PRYDD user using their username." },
  { question: "How do I join early access?", answer: "Choose Join early access and leave your email on the waitlist." },
]

function QuestionsChapter() {
  return (
    <section id="prydd-faq" className={styles.questionsSection} aria-labelledby="prydd-questions-heading"><div className={styles.faqShell}><div className={styles.faqInner}><div className={styles.faqIntro}><h2 id="prydd-questions-heading">Frequently<br />asked questions</h2><p>A few answers about the account,<br /> payments and joining early access.</p><a className={styles.chapterAction} href="/waitlist">Join early access<ArrowUpRight size={15} aria-hidden="true" /></a></div><div className={styles.questionsList}>{questions.map(({ question, answer }) => <details key={question} className={styles.question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></div></section>
  )
}

export function StorySections() {
  return (
    <div className={styles.storySections}>
      <div className={styles.featureRows}>
        <FeatureChapter id="prydd-funding" eyebrow="Local funding" title="Add money in local currency. Keep it in dollars." description="Bring money into PRYDD and see it as a dollar balance." bullets={["Add money from local currency.", "Hold your balance in US dollars.", "See added money in your account activity."]} action={{ href: "#prydd-account", label: "Explore your account" }} note="Illustrative product views and amounts throughout this page."><FundingScene /></FeatureChapter>
        <FeatureChapter id="prydd-account" eyebrow="Dollar account" title="Your balance and payments, in one place." description="A clear dollar balance above a readable view of the money coming in and going out." bullets={["Hold a USD balance in your account.", "See the payments you receive and send.", "Understand each payment by its activity entry."]} action={{ href: "#prydd-people", label: "Explore username payments" }} flip><AccountScene /></FeatureChapter>
        <FeatureChapter id="prydd-people" eyebrow="Payments by username" title="A username connects a payment to a person." description="Move dollars to another PRYDD user with their username." bullets={["Send dollars to another PRYDD user.", "Identify the recipient by username.", "See the payment in readable activity."]} action={{ href: "#prydd-activity", label: "Follow the payment" }}><PeopleScene /></FeatureChapter>
        <FeatureChapter id="prydd-activity" eyebrow="Account activity" title="The payment and your balance tell the same story." description="In this example, a $25 payment leaves $225 in the account." bullets={["Money added: $250.", "Sent to @maya: $25.", "Remaining balance: $225."]} action={{ href: "#prydd-faq", label: "Find answers" }} flip><ResultScene /></FeatureChapter>
      </div>
      <HumanContext /><PracticalOverview /><LifeSequence /><QuestionsChapter />
    </div>
  )
}

export function ClosingInvitation() {
  return (
    <div className={styles.closingBody}>
      <section className={styles.invitation} aria-labelledby="prydd-invitation-heading"><div className={styles.invitationInner}><div className={styles.invitationCopy}><h2 id="prydd-invitation-heading">Everyday global money starts here.</h2></div><div className={styles.invitationActions}><a href="/waitlist" className={styles.invitationLink}>Join early access<ArrowUpRight size={16} aria-hidden="true" /></a></div></div></section>
      <footer className={styles.footerShell}>
        <div className={styles.footer}>
          <span className={styles.footerBrand}><BrandSymbol />PRYDD</span>
          <nav aria-label="PRYDD footer" className={styles.footerGroups}>
            <div className={styles.footerGroup}><h2>Product</h2><a href="#prydd-funding">Add money</a><a href="#prydd-account">Your account</a><a href="#prydd-people">Send by username</a></div>
            <div className={styles.footerGroup}><h2>Early access</h2><a href="/waitlist">Join early access</a></div>
            <div className={styles.footerGroup}><h2>Legal</h2><a href="/legal/privacy-policy">Privacy policy</a><a href="/legal/terms-of-service">Terms of service</a></div>
          </nav>
        </div>
      </footer>
    </div>
  )
}
