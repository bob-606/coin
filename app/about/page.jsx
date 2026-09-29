import Link from "next/link";
import BuyerChecklist from "../../components/BuyerChecklist";

export default function AboutPage() {
  return (
    <div className="container section">
      <span className="kicker">Pathway manual</span>
      <h2>How we pack, grade and ship every coin.</h2>
      <p className="muted">One manual, three parts: check before you buy, know the warnings, know how shipping works.</p>

      <div className="section" style={{ paddingBottom: 0 }}>
        <span className="chnum">01 — CHECKLIST</span>
        <h2 style={{ fontSize: 24 }}>Before you buy</h2>
        <div style={{ marginTop: 14, maxWidth: 720 }}>
          <BuyerChecklist />
        </div>
      </div>

      <div className="section" style={{ paddingBottom: 0 }}>
        <span className="chnum">02 — WARNINGS</span>
        <h2 style={{ fontSize: 24 }}>Key warnings</h2>
        <div className="warn-grid">
          <div className="warn-card">
            <span className="warn-icon">⚠</span>
            <h3>Never clean a coin</h3>
            <p className="muted">Cleaning destroys collector value instantly. A cleaned coin is worth melt — leave patina alone.</p>
          </div>
          <div className="warn-card">
            <span className="warn-icon">⚠</span>
            <h3>Cast copies look soft</h3>
            <p className="muted">Mushy details and tiny surface bubbles mean a cast fake. Compare against certified genuine photos.</p>
          </div>
          <div className="warn-card">
            <span className="warn-icon">⚠</span>
            <h3>Too good means fake</h3>
            <p className="muted">A gold rooster at half market price is not a bargain. Check weight, edge and seller guarantees first.</p>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingBottom: 0 }}>
        <span className="chnum">03 — SHIPPING & TRUST</span>
        <h2 style={{ fontSize: 24 }}>How every order works</h2>
        <div className="grid" style={{ marginTop: 14 }}>
          <div className="panel"><h3>Sourcing</h3><p className="muted">Central banks, collectors, dealers and auctions. Provenance for ancient coins. No counterfeits.</p></div>
          <div className="panel"><h3>Grading</h3><p className="muted">Uncirculated down to Fine, stated honestly. Photos of obverse + reverse, weight and diameter.</p></div>
          <div className="panel"><h3>Packing</h3><p className="muted">Flip or capsule, taped immobile, bubble mailer. Gold ships double-packed, unmarked, express.</p></div>
          <div className="panel"><h3>Delivery</h3><p className="muted">Tracked + insured, 24–48h dispatch. Signature over €150. 14-day returns if misdescribed.</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <Link href="/shop" className="btn btn-primary">Browse coins →</Link>
          <Link href="/contact" className="btn">Contact us</Link>
          <Link href="/guides" className="btn btn-ghost">Read the guides</Link>
        </div>
      </div>

      <div className="section" style={{ paddingBottom: 0, maxWidth: 760 }}>
        <span className="chnum">04 — FAQ</span>
        <h2 style={{ fontSize: 24 }}>Questions, answered</h2>
        <div style={{ marginTop: 14 }}>
          <details className="faq" open>
            <summary>Are your coins genuine?</summary>
            <p>Yes — every coin is checked for weight, diameter, edge and surfaces before listing, and every ancient or high-value coin is guaranteed genuine for life. Certified coins include verifiable NGC/PCGS numbers.</p>
          </details>
          <details className="faq">
            <summary>How long does shipping take?</summary>
            <p>Dispatch in 24–48h. Standard tracked: 3–6 business days in Europe, 7–14 days to the USA and Australia. Express: 1–3 days in Europe, 2–5 days worldwide. Tracking is emailed the day your parcel ships.</p>
          </details>
          <details className="faq">
            <summary>Will I pay customs or VAT?</summary>
            <p>Within the EU: no customs, no extra charges. To the USA, most collectible coins enter duty-free. Any import charges outside the EU are the buyer's responsibility but are rare at these values.</p>
          </details>
          <details className="faq">
            <summary>What if the coin is not as described?</summary>
            <p>14-day returns, no questions beyond a photo of what arrived. If a major grading service ever disagrees with our authenticity call, we refund in full — for life.</p>
          </details>
          <details className="faq">
            <summary>Can I combine shipping on several coins?</summary>
            <p>Yes — add everything to one cart and shipping is charged once. Sets already bundle the discount. Leave a note at checkout for gift wrap.</p>
          </details>
        </div>
      </div>
    </div>
  );
}
