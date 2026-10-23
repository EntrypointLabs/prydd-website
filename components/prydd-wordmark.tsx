const sizes = {
  sm: { mark: 22, text: 19, gap: 6 },
  md: { mark: 30, text: 26, gap: 8 },
} as const

export function PryddWordmark({ size = "md" }: { size?: keyof typeof sizes }) {
  const { mark, text, gap } = sizes[size]
  return (
    <span className="inline-flex items-center text-foreground" style={{ gap }}>
      <span
        aria-hidden="true"
        className="inline-block bg-current"
        style={{
          width: mark,
          height: mark * (214 / 208),
          mask: 'url("/prydd/mark.svg") center / contain no-repeat',
          WebkitMask: 'url("/prydd/mark.svg") center / contain no-repeat',
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-prydd), sans-serif",
          fontSize: text,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        PRYDD
      </span>
    </span>
  )
}
