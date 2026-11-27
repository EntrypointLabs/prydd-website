import type { Viewport } from "next"
import { PryddHome } from "@/components/prydd/prydd-home"

export const viewport: Viewport = {
  themeColor: "#17191d",
}

export default function Home() {
  return <PryddHome />
}
