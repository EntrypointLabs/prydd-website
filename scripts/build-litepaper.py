#!/usr/bin/env python3
"""Render docs/litepaper.md to public/litepaper.pdf in the PRYDD brand.

Requires `pip install markdown` and Google Chrome. The previous PDF was a
wkhtmltopdf export of a document whose source lived outside the repo, so it
could not be rebranded; docs/litepaper.md is now the source of truth.

    python3 scripts/build-litepaper.py
"""
import base64
import pathlib
import shutil
import subprocess
import sys
import tempfile

import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CSS = """
@font-face { font-family: Display; src: url(montserrat.ttf) format('truetype'); font-weight: 100 900; }
@font-face { font-family: Body; src: url(inter.ttf) format('truetype'); font-weight: 100 900; }

@page { size: A4; margin: 19mm 18mm 18mm; }

* { box-sizing: border-box; }
body {
  font-family: Body, Helvetica, Arial, sans-serif;
  font-size: 9.7pt; line-height: 1.5; color: #15171a;
  margin: 0; -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 { font-family: Display, Helvetica, sans-serif; color: #000; page-break-after: avoid; }
h1 { font-size: 52pt; font-weight: 800; letter-spacing: -.05em; line-height: .92; margin: 0 0 18pt; }
h2 { font-size: 15pt; font-weight: 700; letter-spacing: -.025em; margin: 23pt 0 8pt; }
h3 { font-size: 11pt; font-weight: 600; letter-spacing: -.015em; margin: 15pt 0 5pt; }
h4 { font-size: 10.4pt; font-weight: 600; margin: 13pt 0 5pt; }
p { margin: 0 0 8pt; }
strong { font-weight: 600; }
a { color: #15171a; text-decoration: none; border-bottom: 1px solid #c8ccd2; }

blockquote {
  margin: 13pt 0; padding: 0 0 0 14pt; color: #42464c;
  font-style: italic; border-left: 1px solid #d7dade;
}
blockquote p:last-child { margin-bottom: 0; }

ul, ol { margin: 0 0 9pt; padding-left: 16pt; }
li { margin-bottom: 4pt; }

code { font-family: ui-monospace, Menlo, monospace; font-size: 8.9pt; background: #f3f4f6; padding: 1px 3px; border-radius: 3px; }
pre { background: #f6f7f8; border: 1px solid #e6e8ea; border-radius: 6px; padding: 10pt 12pt; overflow: hidden; page-break-inside: avoid; }
pre code { background: none; padding: 0; font-size: 8.4pt; line-height: 1.45; }

table { width: 100%; border-collapse: collapse; margin: 12pt 0; font-size: 9.2pt; page-break-inside: avoid; }
th, td { text-align: left; padding: 6pt 8pt 6pt 0; border-bottom: 1px solid #e6e8ea; vertical-align: top; }
th { font-weight: 600; border-bottom-color: #15171a; }

hr { border: 0; border-top: 1px solid #e6e8ea; margin: 20pt 0; }

/* The title block is set at the foot of its own page. */
.cover {
  height: 252mm; display: flex; flex-direction: column; justify-content: flex-end;
  page-break-after: always;
}
.cover h3 { margin: 0 0 9pt; font-size: 13pt; font-weight: 500; font-style: italic; }
.cover p { margin: 0 0 6pt; font-size: 10.5pt; }
.cover p:last-child { margin: 14pt 0 0; color: #5c6066; }
"""


def main() -> int:
    src = ROOT / "docs" / "litepaper.md"
    out = ROOT / "public" / "litepaper.pdf"
    if not src.exists():
        print(f"missing {src}", file=sys.stderr)
        return 1
    if not pathlib.Path(CHROME).exists():
        print(f"Chrome not found at {CHROME}", file=sys.stderr)
        return 1

    html_body = markdown.markdown(
        src.read_text(),
        extensions=["tables", "fenced_code", "sane_lists", "attr_list", "smarty"],
    )

    # Everything above the first rule is the cover; the rule itself is dropped.
    head, _, rest = html_body.partition("<hr />")
    html_body = f'<section class="cover">{head}</section>{rest}'


    with tempfile.TemporaryDirectory() as tmp:
        work = pathlib.Path(tmp)
        shutil.copy(ROOT / "public/prydd/montserrat-variable.ttf", work / "montserrat.ttf")
        shutil.copy(ROOT / "public/prydd/inter-variable.ttf", work / "inter.ttf")
        (work / "doc.html").write_text(
            f"<!doctype html><html><head><meta charset='utf-8'>"
            f"<title>PRYDD Litepaper</title><style>{CSS}</style></head>"
            f"<body>{html_body}</body></html>"
        )
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--no-sandbox",
             "--no-pdf-header-footer", f"--print-to-pdf={work / 'out.pdf'}",
             "--virtual-time-budget=10000", str(work / "doc.html")],
            check=True, capture_output=True,
        )
        shutil.copy(work / "out.pdf", out)

    print(f"wrote {out} ({out.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
