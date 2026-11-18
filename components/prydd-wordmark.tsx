import { cn } from "@/lib/utils"
import styles from "./prydd-wordmark.module.css"

const variants = {
  nav: styles.lockup,
  header: styles.lockup,
  footer: styles.lockup,
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
      {variant === "symbol" ? null : <span>PRYDD</span>}
    </span>
  )
}
