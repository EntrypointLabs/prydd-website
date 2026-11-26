import type { CSSProperties } from "react"
import styles from "./currency-stream.module.css"

type Currency = { code: string; flag: string }

const rows: Currency[][] = [
  [
    { code: "USD", flag: "us" }, { code: "NGN", flag: "ng" }, { code: "GBP", flag: "gb" }, { code: "EUR", flag: "eu" },
    { code: "GHS", flag: "gh" }, { code: "KES", flag: "ke" }, { code: "ZAR", flag: "za" }, { code: "CAD", flag: "ca" },
    { code: "AED", flag: "ae" }, { code: "JPY", flag: "jp" }, { code: "INR", flag: "in" }, { code: "RWF", flag: "rw" },
  ],
  [
    { code: "MXN", flag: "mx" }, { code: "BRL", flag: "br" }, { code: "XOF", flag: "sn" }, { code: "AUD", flag: "au" },
    { code: "SGD", flag: "sg" }, { code: "CHF", flag: "ch" }, { code: "EGP", flag: "eg" }, { code: "MAD", flag: "ma" },
    { code: "TZS", flag: "tz" }, { code: "UGX", flag: "ug" }, { code: "XAF", flag: "cm" }, { code: "CNY", flag: "cn" },
  ],
]

function Pill({ currency }: { currency: Currency }) {
  return (
    <span className={styles.pill}>
      <img src={`/flags/v1/${currency.flag}.webp`} alt="" width={22} height={22} decoding="async" />
      {currency.code}
    </span>
  )
}

export function CurrencyStream({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={styles.stream + " " + className} style={style} role="img" aria-label="Prices and balances shown in your own currency">
      {rows.map((row, index) => (
        <div key={index} className={styles.row} data-reverse={index % 2 === 1 || undefined} aria-hidden="true">
          <div className={styles.track}>
            {[...row, ...row].map((currency, position) => <Pill key={currency.code + position} currency={currency} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
