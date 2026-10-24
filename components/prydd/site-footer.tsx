import type { ReactNode } from "react"
import styles from "./site-footer.module.css"

type FooterLink = { label: string; href: string; external?: boolean }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Add money", href: "/#prydd-funding" },
      { label: "Your account", href: "/#prydd-account" },
      { label: "Send by username", href: "/#prydd-people" },
      { label: "FAQs", href: "/#prydd-faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Litepaper", href: "/litepaper.pdf", external: true },
      { label: "X (Twitter)", href: "https://x.com/pryddfinance", external: true },
      { label: "Contact", href: "mailto:support@prydd.co" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
    ],
  },
]

const freeTools: FooterLink[] = [
  { label: "Currency converter", href: "/tools/currency-converter" },
  { label: "IBAN checker", href: "/tools/iban-checker" },
  { label: "SWIFT/BIC codes", href: "/tools/swift-codes" },
  { label: "Routing number checker", href: "/tools/routing-number-checker" },
]

const ENTRYPOINT_URL = "https://entrypointlabs.xyz"

const entrypointLink = (
  <a href={ENTRYPOINT_URL} target="_blank" rel="noopener noreferrer">
    Entrypoint Labs, Inc.
  </a>
)
const termsLink = <a href="/legal/terms-of-service">Terms of Service</a>
const privacyLink = <a href="/legal/privacy-policy">Privacy Policy</a>

const disclaimers: ReactNode[] = [
  <>
    PRYDD is a dollar account (the &quot;PRYDD Account&quot;) provided by{" "}
    {entrypointLink} (&quot;Entrypoint Labs&quot;), a financial technology
    company. Entrypoint Labs is not a bank or a digital asset custodian.
    Entrypoint Labs provides software that enables eligible people to open PRYDD
    Accounts and transact using stablecoins.
  </>,
  <>
    Entrypoint Labs does not take custody of customer funds. Balances are held
    in smart accounts on the Solana blockchain, controlled by the customer
    through a passkey bound to the secure hardware on their device.
  </>,
  <>
    Entrypoint Labs does not provide banking services. Connectivity to banking
    rails, used to add money from a local bank account or payment method, is
    made available through third-party partners.
  </>,
  <>
    Stablecoins available through PRYDD are issued by third parties. Entrypoint
    Labs is not a stablecoin issuer, does not make any promise and does not have
    any obligation to redeem stablecoins. Reserves backing stablecoins are held
    by the issuers, not by Entrypoint Labs.
  </>,
  <>
    Balance information denominated in fiat currency is for informational
    purposes only. Balances are not bank deposits and are not insured by the
    Federal Deposit Insurance Corporation (FDIC), the Securities Investor
    Protection Corporation (SIPC) or any other government agency.
  </>,
  <>
    Entrypoint Labs does not currently charge a fee to hold a Balance, add
    money, or send to another PRYDD user. A minimal network fee, typically a
    fraction of a cent, is charged by the Solana network itself. Any Entrypoint
    Labs fee introduced later will be disclosed in the app before you complete
    an affected transaction.
  </>,
  <>
    Transfers between PRYDD Accounts settle on the Solana blockchain. Settlement
    times are not guaranteed, and a completed transfer is generally
    irreversible: it cannot be reversed, cancelled or recovered once it has
    settled on-chain.
  </>,
  <>
    Services are available only to eligible people in supported jurisdictions.
    PRYDD does not currently require identity verification to open an Account.
    Entrypoint Labs may require verification at any time, and may limit, suspend
    or close an Account to comply with applicable law, including sanctions
    administered by the U.S. Office of Foreign Assets Control (OFAC), or to
    prevent fraud.
  </>,
  <>
    PRYDD is in early access and certain features are not yet generally
    available. Product screens on this site are illustrative. Nothing on this
    site is financial, investment, legal or tax advice, and any figures or
    timelines, including those in the litepaper, may change without notice.
  </>,
  <>
    For more information, see the {termsLink}, the {privacyLink}, and the terms
    of service of relevant third-party service providers.
  </>,
]

function DisclaimerList({ start, items }: { start: number; items: ReactNode[] }) {
  return (
    <ol className={styles.disclaimersList} start={start}>
      {items.map((item, index) => {
        const number = start + index
        return (
          <li key={number} id={`disclaimer-${number}`}>
            <span className={styles.num} aria-hidden="true">
              {number}.
            </span>
            <span className={styles.srOnly}>Footnote {number}.</span>
            <p>{item}</p>
          </li>
        )
      })}
    </ol>
  )
}

export function SiteFooter() {
  return (
    <footer className={styles.footerShell}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <a className={styles.brand} href="/" aria-label="PRYDD home">
            <span className={styles.brandSymbol} aria-hidden="true" />
            PRYDD
          </a>

          <nav className={styles.columns} aria-label="Footer">
            {columns.map((column) => (
              <div className={styles.column} key={column.title}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul className={styles.linkList}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className={styles.navLink}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.column}>
              <h2 className={styles.ctaTitle}>Get started</h2>
              <div className={styles.ctaList}>
                <a className={`${styles.cta} ${styles.ctaPrimary}`} href="/waitlist">
                  Join early access
                </a>
                <a
                  className={`${styles.cta} ${styles.ctaSecondary}`}
                  href="/litepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the litepaper
                </a>
              </div>
            </div>
          </nav>
        </div>

        <nav className={styles.meta} aria-label="Free tools">
          <a className={styles.metaLabel} href="/tools">
            Free tools
          </a>
          <ul className={styles.metaList}>
            {freeTools.map((link) => (
              <li key={link.label}>
                <a
                  className={styles.metaLink}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            <span className={styles.year}>
              &copy; {new Date().getFullYear()}{" "}
              <a
                className={styles.yearLink}
                href={ENTRYPOINT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Entrypoint Labs, Inc.
              </a>
            </span>
            <div className={styles.legalLinks}>
              <a className={styles.legalLink} href="/legal/terms-of-service">
                Terms of Service
              </a>
              <a className={styles.legalLink} href="/legal/privacy-policy">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className={styles.disclaimers}>
            <h2 className={styles.disclaimersHeader}>Disclaimers</h2>
            <div className={styles.disclaimersGrid}>
              <DisclaimerList start={1} items={disclaimers.slice(0, 5)} />
              <DisclaimerList start={6} items={disclaimers.slice(5)} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
