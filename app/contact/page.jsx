"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  if (sent)
    return (
      <div className="container section" style={{ maxWidth: 640 }}>
        <h2>Message saved.</h2>
        <p className="muted">Thanks {form.name || "collector"} — we reply within one business day. For urgent questions about a coin, add the coin name to your message.</p>
        <Link href="/shop" className="btn btn-primary">Back to shop</Link>
      </div>
    );
  return (
    <div className="container section" style={{ maxWidth: 640 }}>
      <span className="kicker">Contact</span>
      <h2>Ask about a coin.</h2>
      <p className="muted">Offers, combined shipping, provenance questions — we reply within one business day.</p>
      <form
        className="panel"
        style={{ marginTop: 16, display: "grid", gap: 12 }}
        onSubmit={(e) => {
          e.preventDefault();
          try { localStorage.setItem("ecv-contact", JSON.stringify({ ...form, at: Date.now() })); } catch {}
          setSent(true);
        }}
      >
        <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Jane Collector" /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="jane@…" /></label>
        <label>Message<textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="Hi — is the 1908 Rooster still available? Can you combine shipping with…" /></label>
        <button className="btn btn-primary" type="submit">Send message</button>
      </form>
    </div>
  );
}
