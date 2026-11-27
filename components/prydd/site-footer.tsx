import type { ReactNode } from "react"
import { PryddWordmark } from "@/components/prydd-wordmark"
import styles from "./site-footer.module.css"

type FooterLink = { label: string; href: string; external?: boolean }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Send", href: "/#prydd-send" },
      { label: "Add money", href: "/#prydd-funding" },
      { label: "Earn", href: "/#prydd-life" },
      { label: "Invest", href: "/#prydd-invest" },
      { label: "Security", href: "/#prydd-security" },
      { label: "Pay with Prydd", href: "/#prydd-pay" },
    ],
  },
  {
    title: "Company",
    links: [
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
    Prydd is a dollar account (the &quot;Prydd Account&quot;) provided by{" "}
    {entrypointLink} (&quot;Entrypoint Labs&quot;), a financial technology
    company. Entrypoint Labs is not a bank or a digital asset custodian.
    Entrypoint Labs provides software that enables eligible people to open Prydd
    Accounts and transact using stablecoins.
  </>,
  <>
    Balances are held in smart accounts on the Solana blockchain that need two
    of three keys to move money. You hold two: your passkey, synced through your
    platform account, and a key secured on your phone. Entrypoint Labs holds the
    third, encrypted, for account recovery only. It cannot move money on its
    own.
  </>,
  <>
    Entrypoint Labs does not provide banking services. Connectivity to banking
    rails, used to add money from a local bank account or payment method, is
    made available through third-party partners.
  </>,
  <>
    Stablecoins available through Prydd are issued by third parties. Entrypoint
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
    Entrypoint Labs does not currently charge a fee to hold a balance or send to
    another Prydd account, and covers Solana network fees on sends, swaps and
    Earn. Bank top-ups and bank sends carry the payment partner&apos;s fee and
    exchange rate, shown before you confirm. Any Entrypoint Labs fee introduced
    later will be disclosed in the app before you complete an affected
    transaction.
  </>,
  <>
    Transfers between Prydd Accounts settle on the Solana blockchain. Settlement
    times are not guaranteed, and a completed transfer is generally
    irreversible: it cannot be reversed, cancelled or recovered once it has
    settled.
  </>,
  <>
    Services are available only to eligible people in supported jurisdictions.
    Prydd does not require identity verification to open an Account. Adding or
    sending local currency above a daily limit requires an identity check
    through our payment partner. Entrypoint Labs may require further
    verification at any time, and may limit, suspend or close an Account to
    comply with applicable law, including sanctions administered by the U.S.
    Office of Foreign Assets Control (OFAC), or to prevent fraud.
  </>,
  <>
    Prydd is in public beta on iPhone and certain features are not yet generally
    available. Product screens on this site are illustrative. Nothing on this
    site is financial, investment, legal or tax advice, and any figures or
    timelines may change without notice.
  </>,
  <>
    Earn places dollars with third-party lending providers. Rates change and are
    not guaranteed. Earn balances are not bank deposits and are not insured.
  </>,
  <>
    Tokenized stocks and ETFs are issued by third parties and track the price of
    a share or fund. They are not shares, carry no voting or shareholder rights,
    and may not be available in your country. Capital at risk.
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
          <a className={styles.brand} href="/" aria-label="Prydd home">
            <PryddWordmark variant="footer" />
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
                <a className={`${styles.cta} ${styles.ctaPrimary}`} href="/download">
                  Get the app
                </a>
                <a
                  className={`${styles.cta} ${styles.ctaSecondary}`}
                  href="https://merchant.prydd.co"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  For businesses
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
              <DisclaimerList start={1} items={disclaimers.slice(0, 6)} />
              <DisclaimerList start={7} items={disclaimers.slice(6)} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
