"use client";
import Link from "next/link";
import { formatEUR } from "../data/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ p }) {
  const { add } = useCart();
  return (
    <div className="card">
      <Link href={`/product/${p.id}`} className="coin-visual photo">
        <span className="badge">{p.tag}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <div className="muted">{p.country} · {p.year} · {p.grade}</div>
        <Link href={`/product/${p.id}`} style={{ fontWeight: 800, lineHeight: 1.3 }}>
          {p.name}
        </Link>
        <div className="muted">{p.blurb}</div>
        <div className="price-row">
          <span className="price">{formatEUR(p.price)}</span>
          <button className="btn btn-primary" onClick={() => add(p.id)}>
            Add
          </button>
        </div>
        <div className="muted">Stock: {p.stock} · {p.category}</div>
      </div>
    </div>
  );
}
