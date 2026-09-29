"use client";
import Link from "next/link";
import { formatEUR, isNew } from "../data/products";
import { useCart } from "./CartProvider";

export function Verified() {
  return (
    <span title="Verified seller" style={{ color: "var(--green)", fontWeight: 900, fontSize: 13 }}>
      ✓
    </span>
  );
}

export default function ProductCard({ p }) {
  const { add } = useCart();
  const fresh = isNew(p);
  return (
    <div className="card">
      <Link href={`/product/${p.id}`} className="coin-visual photo">
        <span className="badge">{p.tag}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <div className="seller-row">
          <span className="seller-mark">€</span>
          <span>EU Coin Vault</span>
          <Verified />
          {fresh && <span className="badge-new">New</span>}
        </div>
        <div className="muted">{p.country} · {p.grade}</div>
        <Link href={`/product/${p.id}`} className="card-title">
          {p.name}
        </Link>
        <div className="muted">{p.blurb}</div>
        <div className="price-row">
          <span className="price">{formatEUR(p.price)}</span>
          <button className="btn btn-primary" onClick={() => add(p.id)}>
            Add
          </button>
        </div>
        <div className="muted">
          {p.stock <= 4 ? <span className="low-stock">Only {p.stock} left</span> : `${p.stock} in stock`} · {p.category}
        </div>
      </div>
    </div>
  );
}
