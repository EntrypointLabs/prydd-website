import { cn } from "@/lib/utils"
import styles from "./prydd-wordmark.module.css"

const variants = {
  nav: styles.nav,
  header: styles.header,
  footer: styles.footer,
  symbol: styles.symbol,
} as const

export function PryddWordmark({
  variant = "nav",
  className,
}: {
  variant?: keyof typeof variants
  className?: string
}) {
  return (
    <span className={cn(styles.logo, variants[variant], className)}>
      <span className={styles.mark} aria-hidden="true" />
      {variant === "symbol" ? null : <span className={styles.word}>PRYDD</span>}
    </span>
  )
}
