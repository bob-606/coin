"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products, formatEUR } from "../../../data/products";
import { useCart } from "../../../components/CartProvider";

export default function ProductPage() {
  const { id } = useParams();
  const p = products.find((x) => x.id === id);
  const { add } = useCart();
  if (!p) return <div className="container section"><h2>Not found</h2><Link href="/shop" className="btn">Back to shop</Link></div>;
  return (
    <div className="container detail">
      <div className="photo-frame">
        <span className="badge">{p.tag}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} />
      </div>
      <div>
        <div className="muted">{p.category} · {p.country} · {p.year}</div>
        <h2 style={{ margin: "6px 0 8px" }}>{p.name}</h2>
        <div className="price" style={{ fontSize: 30 }}>{formatEUR(p.price)}</div>
        <p className="muted">{p.blurb}</p>
        <div className="panel">
          <table className="table">
            <tbody>
              <tr><td>Condition</td><td>{p.grade}</td></tr>
              <tr><td>Weight / Diameter</td><td>{p.weight} / {p.diameter}</td></tr>
              <tr><td>Stock</td><td>{p.stock} pcs, ships in 24–48h</td></tr>
              <tr><td>Shipping</td><td>Tracked + insured, signature over €150</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button className="btn btn-primary" onClick={() => add(p.id)}>Add to cart</button>
          <Link href="/cart" className="btn">Go to cart</Link>
          <Link href="/shop" className="btn btn-ghost">Back</Link>
        </div>
      </div>
    </div>
  );
}
