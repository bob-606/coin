"use client";
import { useEffect, useState } from "react";
import { seedReviews, loadUserReviews, saveUserReview } from "../data/reviews";

export function Stars({ n, size }) {
  return (
    <span className="stars" style={{ fontSize: size || 14 }} aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(n) ? "on" : ""}>★</span>
      ))}
    </span>
  );
}

export function avg(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
}

export default function Reviews({ productId }) {
  const [user, setUser] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, title: "", text: "" });
  const [thanks, setThanks] = useState(false);
  useEffect(() => {
    setUser((loadUserReviews()[productId] || []));
  }, [productId]);
  const all = [...(seedReviews[productId] || []), ...user];

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || !form.title.trim()) return;
    const r = { ...form, name: form.name.trim(), title: form.title.trim(), text: form.text.trim(), country: "", date: new Date().toISOString().slice(0, 10) };
    saveUserReview(productId, r);
    setUser((u) => [...u, r]);
    setForm({ name: "", rating: 5, title: "", text: "" });
    setThanks(true);
  };

  return (
    <div className="section" style={{ paddingBottom: 0 }}>
      <h2>Collector reviews</h2>
      {all.length > 0 ? (
        <p className="muted"><Stars n={avg(all)} /> <b>{avg(all).toFixed(1)}</b> · {all.length} review{all.length === 1 ? "" : "s"}</p>
      ) : (
        <p className="muted">No reviews yet — be the first.</p>
      )}
      <div className="review-grid">
        {all.map((r, i) => (
          <div key={i} className="panel review-card">
            <Stars n={r.rating} />
            <b style={{ display: "block", marginTop: 6 }}>{r.title}</b>
            <p className="muted" style={{ color: "var(--text)" }}>{r.text}</p>
            <div className="muted">— {r.name}{r.country ? `, ${r.country}` : ""} · {r.date}</div>
          </div>
        ))}
      </div>
      <div className="panel" style={{ marginTop: 16, maxWidth: 640 }}>
        <h3 style={{ marginTop: 0 }}>Write a review</h3>
        {thanks && <p className="muted" style={{ color: "var(--green)", fontWeight: 700 }}>Thanks! Your review is saved on this device.</p>}
        <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
          <div className="form-grid">
            <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Your name" /></label>
            <label>Rating
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })}>
                <option value={5}>★★★★★ — Excellent</option>
                <option value={4}>★★★★ — Good</option>
                <option value={3}>★★★ — OK</option>
                <option value={2}>★★ — Poor</option>
                <option value={1}>★ — Bad</option>
              </select>
            </label>
          </div>
          <label>Headline<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Sums it up" /></label>
          <label>Review<textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required placeholder="Condition, shipping, accuracy…" /></label>
          <button className="btn btn-primary" type="submit" style={{ justifySelf: "start" }}>Submit review</button>
        </form>
      </div>
    </div>
  );
}
