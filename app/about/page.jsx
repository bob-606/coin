export default function AboutPage() {
  return (
    <div className="section">
      <h2>About — shipping & trust</h2>
      <p className="muted">How we pack, grade and ship every coin.</p>
      <div className="grid" style={{ marginTop: 14 }}>
        <div className="panel"><h3>1. Sourcing</h3><p className="muted">Central banks, collectors, dealers and auctions. Provenance for ancient / medieval coins. No counterfeits.</p></div>
        <div className="panel"><h3>2. Grading</h3><p className="muted">Graded: company + grade + cert. Ungraded: Uncirculated / Extra Fine / Fine. Photos of obverse + reverse, weight and diameter.</p></div>
        <div className="panel"><h3>3. Pricing</h3><p className="muted">Prices in EUR. VAT handled at checkout by destination country.</p></div>
        <div className="panel"><h3>4. Shipping</h3><p className="muted">Coin flip + bubble mailer, tracked + insured. Signature over €150. Dispatch in 24–48h.</p></div>
        <div className="panel"><h3>5. Returns</h3><p className="muted">14-day returns if the coin differs from photos or description. Graded coins verified by cert number.</p></div>
        <div className="panel"><h3>6. Contact</h3><p className="muted">Questions about a coin, offer for a set, or combined shipping — leave a note at checkout and we reply by email.</p></div>
      </div>
    </div>
  );
}
