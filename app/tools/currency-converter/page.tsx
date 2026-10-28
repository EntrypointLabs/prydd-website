import type { Metadata } from "next"

import { ToolPage, tools } from "@/components/tool-page"

const tool = tools.find((entry) => entry.slug === "currency-converter")!

export const metadata: Metadata = {
  title: tool.title,
  description: tool.summary,
  alternates: { canonical: "/tools/currency-converter" },
  robots: { index: false, follow: true },
}

export default function Page() {
  return <ToolPage title={tool.title} summary={tool.summary} />
}
