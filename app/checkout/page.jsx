"use client";
import { useState } from "react";
import Link from "next/link";
import { products, formatEUR } from "../../data/products";
import { useCart } from "../../components/CartProvider";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", country: "USA", shipping: "tracked" });
  const lines = Object.entries(items).map(([id, qty]) => ({ p: products.find((x) => x.id === id), qty })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const ship = lines.length === 0 ? 0 : form.shipping === "express" ? 19.9 : 9.9;
  const total = subtotal + ship;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (done)
    return (
      <div className="container section">
        <h2>Order received</h2>
        <p className="muted">Thanks {form.name || "collector"}! We will email you payment and tracking details.</p>
        <Link href="/shop" className="btn btn-primary">Back to shop</Link>
      </div>
    );

  return (
    <div className="container section">
      <h2>Checkout</h2>
      <p className="muted">Enter your details — we confirm payment and shipping by email.</p>
      <div className="detail">
        <div className="panel">
          <div className="form-grid">
            <label>Name<input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Collector" /></label>
            <label>Email<input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@… " /></label>
            <label>Destination
              <select value={form.country} onChange={(e) => set("country", e.target.value)}>
                <option>USA</option><option>Germany</option><option>UK</option><option>Australia</option><option>France</option><option>Other EU</option>
              </select>
            </label>
            <label>Shipping
              <select value={form.shipping} onChange={(e) => set("shipping", e.target.value)}>
                <option value="tracked">Tracked + insured €9.90 (5–9 days)</option>
                <option value="express">Express courier €19.90 (2–4 days, $500+)</option>
              </select>
            </label>
          </div>
          <div style={{ marginTop: 12 }}>
            <label>Note<textarea rows={3} placeholder="VAT, grading, offer for set…" /></label>
          </div>
          <button
            className="btn btn-primary"
            style={{ marginTop: 14, width: "100%" }}
            disabled={lines.length === 0}
            onClick={() => { setDone(true); clear(); }}
          >
            Place order — {formatEUR(total)}
          </button>
        </div>
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Summary</h3>
          {lines.length === 0 && <p className="muted">Cart empty.</p>}
          {lines.map(({ p, qty }) => <div key={p.id} className="muted">{qty}× {p.name} — {formatEUR(p.price * qty)}</div>)}
          <hr style={{ borderColor: "var(--border)" }} />
          <div className="muted">Subtotal: {formatEUR(subtotal)}</div>
          <div className="muted">Shipping: {formatEUR(ship)}</div>
          <div style={{ fontWeight: 800, fontSize: 20 }}>Total: {formatEUR(total)}</div>
          <p className="muted" style={{ marginTop: 10 }}>Export from EU: 0% VAT ex-EU. Import duty/VAT (if any) paid by buyer. HS 7118.90.</p>
        </div>
      </div>
    </div>
  );
}
