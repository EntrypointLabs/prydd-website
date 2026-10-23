import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

export const alt = "PRYDD — one app for everyday global money"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const MARK =
  "M 48 40 L 94 40 C 102 40 107 35 113 29 L 119 23 C 123 19 127 18 135 18 L 180 18 L 180 158 C 180 163 177 166 172 166 L 114 166 C 112 166 110 167 108 169 L 94 182 C 92 184 90 184 87 184 L 28 184 C 23 184 20 181 20 176 L 20 91 C 20 85 24 82 30 82 L 58 82 L 58 144 C 58 147 60 149 63 149 L 86 149 C 89 149 91 148 94 145 L 110 129 C 112 127 115 126 119 126 L 143 126 L 143 59 L 133 59 C 125 59 119 65 114 71 C 109 76 104 78 96 78 L 58 78 C 45 78 36 58 36 50 C 36 44 42 40 48 40 Z"

// Satori cannot parse the variable originals, and Montserrat's default
// instance is Thin, so the display weights are instanced and subset at
// lib/og-fonts.
const font = (file: string) => readFile(path.join(process.cwd(), "lib", "og-fonts", file))
// scripts/build-brand-images.py renders this from the hero globe's own photographs
const field = () => readFile(path.join(process.cwd(), "public", "prydd", "og-field.png"))

export default async function OpengraphImage() {
  const [black, extraBold, body, backdrop] = await Promise.all([
    font("montserrat-900.ttf"),
    font("montserrat-800.ttf"),
    font("inter-400.ttf"),
    field(),
  ])
  const backdropSrc = `data:image/png;base64,${backdrop.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#17191d",
          padding: "56px 72px",
        }}
      >
        <img src={backdropSrc} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0 }} alt="" />

        <div style={{ position: "absolute", top: 56, left: 64, display: "flex", alignItems: "center", gap: 11 }}>
          <svg width="38" height="39" viewBox="-3 0 214 214">
            <g transform="translate(4 6)">
              <path fill="#fafaf7" d={MARK} />
            </g>
          </svg>
          <span style={{ fontFamily: "Montserrat", fontSize: 32, fontWeight: 800, letterSpacing: "-0.035em", color: "#fafaf7" }}>
            PRYDD
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            fontFamily: "Montserrat",
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 0.96,
            color: "#fafaf7",
          }}
        >
          <span>ONE APP FOR</span>
          <span>EVERYDAY</span>
          <span>GLOBAL MONEY.</span>
        </div>
        <span style={{ fontFamily: "Inter", fontSize: 24, letterSpacing: "-0.035em", color: "#9b9ea3", marginTop: 28 }}>
          Add money. Hold dollars. Send by username.
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: black, weight: 900, style: "normal" },
        { name: "Montserrat", data: extraBold, weight: 800, style: "normal" },
        { name: "Inter", data: body, weight: 400, style: "normal" },
      ],
    },
  )
}
