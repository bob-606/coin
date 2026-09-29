"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import ProductCard, { Verified } from "../../../components/ProductCard";
import { products, formatEUR } from "../../../data/products";
import { useCart } from "../../../components/CartProvider";

export default function ProductPage() {
  const { id } = useParams();
  const p = products.find((x) => x.id === id);
  const { add } = useCart();
  const [copied, setCopied] = useState(false);
  if (!p) return <div className="container section"><h2>Not found</h2><Link href="/shop" className="btn">Back to shop</Link></div>;

  const related = products.filter((x) => x.id !== p.id && (x.category === p.category || x.country === p.country)).slice(0, 4);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const share = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="container">
      <div className="section">
        <Link href="/shop" className="link-more">← All coins</Link>
        <div className="detail" style={{ paddingTop: 16 }}>
          <div>
            <div className="photo-frame">
              <span className="badge">{p.tag}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} />
            </div>
            <div className="panel" style={{ marginTop: 14 }}>
              <h3 style={{ margin: "0 0 8px" }}>Shipping & returns</h3>
              <p className="muted">
                Dispatched from the EU in 24–48h. Tracked + insured, signature over €150.
                14-day returns if the coin differs from photos or description.
              </p>
              <Link href="/about" className="link-more">How shipping works →</Link>
            </div>
          </div>

          <div>
            <div className="seller-row">
              <span className="seller-mark">€</span>
              <span>EU Coin Vault</span>
              <Verified />
            </div>
            <div className="muted" style={{ marginTop: 6 }}>{p.country} · {p.year}</div>
            <h2 style={{ margin: "6px 0 8px", fontSize: 34 }}>{p.name}</h2>
            <div className="price" style={{ fontSize: 30 }}>{formatEUR(p.price)}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => add(p.id)}>Add to cart →</button>
              <button className="btn" onClick={share}>{copied ? "Link copied ✓" : "Share"}</button>
            </div>

            <div className="tag-row">
              <Link className="chip" href={`/shop?cat=${encodeURIComponent(p.category)}`}>{p.category}</Link>
              <Link className="chip" href={`/shop?country=${encodeURIComponent(p.country)}`}>{p.country}</Link>
              <span className="chip" style={{ cursor: "default" }}>{p.grade}</span>
            </div>
            <p className="muted">Listed {p.added} · {p.stock <= 4 ? <span className="low-stock">Only {p.stock} left in stock</span> : `${p.stock} in stock`} · Sourced from {p.source}</p>

            <div className="panel" style={{ marginTop: 8 }}>
              {p.description.map((d, i) => <p key={i} style={{ margin: i === 0 ? "0 0 10px" : "0 0 10px", lineHeight: 1.65 }}>{d}</p>)}
              <table className="table" style={{ marginTop: 12 }}>
                <tbody>
                  <tr><td>Condition</td><td>{p.grade}</td></tr>
                  <tr><td>Country / Year</td><td>{p.country} / {p.year}</td></tr>
                  <tr><td>Weight / Diameter</td><td>{p.weight} / {p.diameter}</td></tr>
                  <tr><td>Source</td><td>{p.source}</td></tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => add(p.id)}>Add to cart →</button>
              <Link href="/cart" className="btn">Go to cart</Link>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>You might also like</h2>
          <div className="grid" style={{ marginTop: 16 }}>
            {related.map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
