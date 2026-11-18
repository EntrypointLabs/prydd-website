import countryToCurrency from "country-to-currency"

export interface GeoResponse {
  /** ISO 3166-1 alpha-2, or null when the request's country is unknown. */
  country: string | null
  name: string | null
  currency: string | null
  symbol: string | null
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" })

function currencySymbol(currency: string): string {
  const part = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  })
    .formatToParts(0)
    .find((p) => p.type === "currency")
  return part?.value ?? currency
}

/** What a country looks like on the app's Home card: its name and money. */
export function describeCountry(code: string | null): GeoResponse {
  const country = code && /^[A-Z]{2}$/.test(code) ? code : null
  if (!country) return { country: null, name: null, currency: null, symbol: null }
  const currency =
    (countryToCurrency as Record<string, string | undefined>)[country] ?? null
  return {
    country,
    name: regionNames.of(country) ?? null,
    currency,
    symbol: currency ? currencySymbol(currency) : null,
  }
}
