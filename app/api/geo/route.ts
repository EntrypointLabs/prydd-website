import { describeCountry } from "@/lib/geo"

export const dynamic = "force-dynamic"

/**
 * The country a request comes from, read from the header Vercel's edge sets
 * from the caller's IP. The Prydd app uses it to pick which country card a
 * person sees on Home. Never cached: the answer is per caller.
 *
 * `?country=NG` answers for that country instead, so testers can preview any
 * card. It only changes what is displayed, so there is nothing to protect.
 */
export function GET(request: Request) {
  const asked = new URL(request.url).searchParams.get("country")
  const body = describeCountry(
    asked?.toUpperCase() ?? request.headers.get("x-vercel-ip-country"),
  )
  return Response.json(body, {
    headers: { "Cache-Control": "private, no-store" },
  })
}
