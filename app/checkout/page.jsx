"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products, formatEUR } from "../../data/products";
import { useCart } from "../../components/CartProvider";
import { makeOrderId, saveOrder, shippingOptions, zoneOf, luhn, validExpiry, ZONES } from "../../lib/orders";

const ALL_COUNTRIES = [...ZONES.EU, ...ZONES.WORLD];

function Field({ label, error, children }) {
  return (
    <label>{label}{children}{error && <span className="field-error">{error}</span>}</label>
  );
}

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", street: "", city: "", postcode: "", country: "Germany",
    method: "standard", cardName: "", cardNum: "", expiry: "", cvc: "", note: "",
  });
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const lines = Object.entries(items).map(([id, qty]) => ({ p: products.find((x) => x.id === id), qty })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const zone = zoneOf(form.country);
  const options = useMemo(() => shippingOptions(zone, subtotal), [zone, subtotal]);
  const method = options.find((o) => o.id === form.method) || options[0];
  const total = subtotal + method.price;

  const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const fmtExp = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (!form.street.trim()) e.street = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.postcode.trim()) e.postcode = "Required";
    if (!form.cardName.trim()) e.cardName = "Required";
    if (!luhn(form.cardNum)) e.cardNum = "Invalid card number — try 4242 4242 4242 4242";
    if (!validExpiry(form.expiry)) e.expiry = "Use MM/YY, in the future";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const pay = () => {
    if (lines.length === 0 || !validate()) return;
    setPaying(true);
    setTimeout(() => {
      const order = {
        id: makeOrderId(),
        date: new Date().toISOString(),
        name: form.name.trim(),
        email: form.email.trim(),
        address: { street: form.street.trim(), city: form.city.trim(), postcode: form.postcode.trim(), country: form.country },
        method: method.label,
        eta: method.eta,
        items: lines.map(({ p, qty }) => ({ id: p.id, name: p.name, price: p.price, qty, image: p.image })),
        subtotal, shipping: method.price, total,
        last4: form.cardNum.replace(/\D/g, "").slice(-4),
        status: "Processing",
      };
      saveOrder(order);
      clear();
      router.push(`/order-success/${order.id}`);
    }, 1400);
  };

  if (lines.length === 0 && !paying)
    return (
      <div className="container section" style={{ maxWidth: 640 }}>
        <h2>Checkout</h2>
        <p className="muted">Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary">Browse coins →</Link>
      </div>
    );

  return (
    <div className="container section">
      <span className="chnum">CHECKOUT</span>
      <h2>Checkout</h2>
      <p className="muted">Demo checkout — no real charge. Use test card 4242 4242 4242 4242.</p>
      <div className="checkout-layout">
        <div style={{ display: "grid", gap: 16 }}>
          <div className="panel">
            <h3 className="co-title"><span className="co-num">1</span> Contact</h3>
            <div className="form-grid">
              <Field label="Full name" error={errors.name}>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Collector" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@…" />
              </Field>
            </div>
          </div>

          <div className="panel">
            <h3 className="co-title"><span className="co-num">2</span> Shipping address</h3>
            <div className="form-grid">
              <Field label="Street + number" error={errors.street}>
                <input value={form.street} onChange={(e) => set("street", e.target.value)} placeholder="Brīvības iela 12-4" />
              </Field>
              <Field label="Country" error={null}>
                <select value={form.country} onChange={(e) => { set("country", e.target.value); set("method", "standard"); }}>
                  {ALL_COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="City" error={errors.city}>
                <input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Riga" />
              </Field>
              <Field label="Postcode" error={errors.postcode}>
                <input value={form.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="LV-1010" />
              </Field>
            </div>
          </div>

          <div className="panel">
            <h3 className="co-title"><span className="co-num">3</span> Shipping method</h3>
            <div className="ship-options">
              {options.map((o) => (
                <label key={o.id} className={`ship-card ${form.method === o.id ? "active" : ""}`}>
                  <input type="radio" name="ship" checked={form.method === o.id} onChange={() => set("method", o.id)} />
                  <div style={{ flex: 1 }}>
                    <b>{o.label}</b>
                    <div className="muted">{o.eta} · {zone === "EU" ? "within Europe" : "worldwide"}</div>
                  </div>
                  <b>{o.price === 0 ? "Free" : formatEUR(o.price)}</b>
                </label>
              ))}
            </div>
            {subtotal >= 500 && <p className="muted" style={{ marginBottom: 0 }}>🎉 Express shipping is free on orders over €500.</p>}
          </div>

          <div className="panel">
            <h3 className="co-title"><span className="co-num">4</span> Payment</h3>
            <div className="form-grid">
              <Field label="Name on card" error={errors.cardName}>
                <input value={form.cardName} onChange={(e) => set("cardName", e.target.value)} placeholder="JANE COLLECTOR" />
              </Field>
              <Field label="Card number" error={errors.cardNum}>
                <input inputMode="numeric" value={form.cardNum} onChange={(e) => set("cardNum", fmtCard(e.target.value))} placeholder="4242 4242 4242 4242" />
              </Field>
              <Field label="Expiry (MM/YY)" error={errors.expiry}>
                <input inputMode="numeric" value={form.expiry} onChange={(e) => set("expiry", fmtExp(e.target.value))} placeholder="12/28" />
              </Field>
              <Field label="CVC" error={errors.cvc}>
                <input inputMode="numeric" value={form.cvc} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" />
              </Field>
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Order note (optional)<textarea rows={2} value={form.note} onChange={(e) => set("note", e.target.value)} placeholder="Combine shipping, gift wrap, questions…" /></label>
            </div>
          </div>
        </div>

        <div>
          <div className="panel order-summary">
            <h3 style={{ marginTop: 0 }}>Order summary</h3>
            {lines.map(({ p, qty }) => (
              <div key={p.id} className="sum-line">
                <Image src={p.image} alt="" width={44} height={44} className="cart-thumb" style={{ width: 44, height: 44 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{qty}× {p.name}</div>
                </div>
                <b style={{ fontSize: 13 }}>{formatEUR(p.price * qty)}</b>
              </div>
            ))}
            <hr style={{ borderColor: "var(--border)" }} />
            <div className="sum-row"><span className="muted">Subtotal</span><span>{formatEUR(subtotal)}</span></div>
            <div className="sum-row"><span className="muted">Shipping ({method.label})</span><span>{method.price === 0 ? "Free" : formatEUR(method.price)}</span></div>
            <div className="sum-total"><span>Total</span><span>{formatEUR(total)}</span></div>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: 12 }} onClick={pay} disabled={paying}>
              {paying ? "Processing payment…" : `Pay ${formatEUR(total)}`}
            </button>
            <p className="muted" style={{ marginBottom: 0, fontSize: 12 }}>🔒 Demo gateway — card details never leave your browser. VAT/customs notes on the confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
