"""
Builds public/steve-calderon-cv.pdf from /cv.json (src/content/resume.ts).

One Letter page, one column, real selectable text in reading order, standard
section names: what ATS parsers and AI readers handle best.

Usage (dev server running on :3100):
  pip install reportlab
  python3 scripts/export-cv.py
"""
import json
import os
import sys
import urllib.request

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle, HRFlowable, ListFlowable, ListItem
from xml.sax.saxutils import escape as esc

URL = os.environ.get("CV_URL", "http://localhost:3100/cv.json")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "steve-calderon-cv.pdf")
FONTS = os.path.expanduser("~/Library/Fonts")

try:
    pdfmetrics.registerFont(TTFont("Inter", f"{FONTS}/Inter-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("Inter-Medium", f"{FONTS}/Inter-Medium.ttf"))
    pdfmetrics.registerFont(TTFont("Inter-SemiBold", f"{FONTS}/Inter-SemiBold.ttf"))
    REG, MED, BOLD = "Inter", "Inter-Medium", "Inter-SemiBold"
except Exception:
    REG, MED, BOLD = "Helvetica", "Helvetica", "Helvetica-Bold"

INK, BODY, MUTED, LINE = HexColor("#131316"), HexColor("#2a2b31"), HexColor("#6b6c78"), HexColor("#e4e4e8")

S = {
    "name": ParagraphStyle("name", fontName=BOLD, fontSize=20, leading=23, textColor=INK),
    "sub": ParagraphStyle("sub", fontName=REG, fontSize=11, leading=15, textColor=MUTED),
    "contact": ParagraphStyle("contact", fontName=REG, fontSize=8.3, leading=12, textColor=MUTED),
    "h2": ParagraphStyle("h2", fontName=MED, fontSize=8.3, leading=11, textColor=MUTED, spaceBefore=10, spaceAfter=3),
    "body": ParagraphStyle("body", fontName=REG, fontSize=9.3, leading=12.8, textColor=BODY),
    "role": ParagraphStyle("role", fontName=BOLD, fontSize=10, leading=13, textColor=INK),
    "date": ParagraphStyle("date", fontName=REG, fontSize=9.4, leading=13, textColor=MUTED, alignment=2),
    "li": ParagraphStyle("li", fontName=REG, fontSize=9.3, leading=12.6, textColor=BODY),
}


def link(href, text, color="#6b6c78"):
    return f'<a href="{esc(href)}" color="{color}">{esc(text)}</a>'


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(esc(b), S["li"]), leftIndent=11, value="–") for b in items],
        bulletType="bullet", start="–", bulletFontName=REG, bulletFontSize=9, bulletColor=MUTED,
        leftIndent=11, bulletOffsetY=0, spaceBefore=1,
    )


def main():
    r = json.load(urllib.request.urlopen(URL))
    W = LETTER[0] - 2 * 0.6 * 72
    doc = SimpleDocTemplate(
        OUT, pagesize=LETTER, leftMargin=0.6 * 72, rightMargin=0.6 * 72, topMargin=0.5 * 72, bottomMargin=0.45 * 72,
        title=f"{r['name']} — Résumé", author=r["name"], subject=r["headline"],
        keywords="design engineer, product designer, UX, UI, React, Next.js, TypeScript, SwiftUI, AI, fintech",
    )
    f = []
    f.append(Paragraph(esc(r["name"]), S["name"]))
    f.append(Paragraph(esc(r["headline"]), S["sub"]))
    f.append(Spacer(0, 4))
    contact = [esc(r["location"]), link(f"mailto:{r['email']}", r["email"])] + [link(l["href"], l["label"]) for l in r["links"]]
    f.append(Paragraph("  ·  ".join(contact), S["contact"]))
    f.append(Spacer(0, 8))
    f.append(HRFlowable(width="100%", thickness=0.6, color=LINE, spaceAfter=0))

    def h2(t):
        f.append(Paragraph(t.upper(), S["h2"]))

    h2("Summary")
    f.append(Paragraph(esc(r["summary"]), S["body"]))

    h2("Experience")
    for i, e in enumerate(r["experience"]):
        if i:
            f.append(Spacer(0, 6))
        company = link(e["url"], e["company"], "#131316") if e.get("url") else esc(e["company"])
        row = Table(
            [[Paragraph(f"{esc(e['title'])}, {company}", S["role"]), Paragraph(f"{e['start']} – {e['end']}", S["date"])]],
            colWidths=[W * 0.75, W * 0.25 - 6], hAlign="LEFT",
        )
        row.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                                 ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                                 ("VALIGN", (0, 0), (-1, -1), "BOTTOM")]))
        f.append(row)
        f.append(bullets(e["bullets"]))

    h2("Projects")
    for p in r["projects"]:
        f.append(Paragraph(f'<font name="{BOLD}" color="#131316">{link(p["href"], p["name"], "#131316")}.</font> {esc(p["text"])}', S["body"]))
        f.append(Spacer(0, 3))

    h2("Skills")
    for s in r["skills"]:
        f.append(Paragraph(f'<font name="{BOLD}" color="#131316">{esc(s["label"])}:</font> {esc(s["items"])}', S["body"]))
        f.append(Spacer(0, 2))

    h2("Languages")
    f.append(Paragraph(esc(r["languages"]), S["body"]))

    pages = []
    doc.build(f, onLaterPages=lambda c, d: pages.append(d.page), onFirstPage=lambda c, d: pages.append(d.page))
    n = max(pages) if pages else 1
    print(f"Wrote {os.path.normpath(OUT)} ({n} page{'s' if n > 1 else ''})")
    if n > 1:
        sys.exit("Résumé runs past one page: trim the content in src/content/resume.ts")


if __name__ == "__main__":
    main()
