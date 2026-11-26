import { RATES_URL, isDisplayRates } from "@/lib/currency-converter"

export const revalidate = 300

export async function GET() {
  try {
    const response = await fetch(RATES_URL, { next: { revalidate: 300 } })
    const body: unknown = response.ok ? await response.json() : null
    if (!isDisplayRates(body)) throw new Error("bad rates")
    return Response.json(body, {
      headers: { "Cache-Control": "public, max-age=300" },
    })
  } catch {
    return Response.json(
      { error: "Rates are unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    )
  }
}
