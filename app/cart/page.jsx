"use client";
import Link from "next/link";
import Image from "next/image";
import { products, formatEUR } from "../../data/products";
import { useCart } from "../../components/CartProvider";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const lines = Object.entries(items).map(([id, qty]) => ({ p: products.find((x) => x.id === id), qty })).filter((l) => l.p);
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  if (lines.length === 0)
    return <div className="container section"><h2>Cart is empty</h2><p className="muted">Add some coins to get started.</p><Link href="/shop" className="btn btn-primary">Browse shop</Link></div>;
  return (
    <div className="container section">
      <h2>Cart — {lines.length} lines</h2>
      {lines.map(({ p, qty }) => (
        <div key={p.id} className="cart-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image src={p.image} alt={p.name} width={60} height={60} className="cart-thumb" />
          <div className="cart-info">
            <Link href={`/product/${p.id}`} style={{ fontWeight: 700 }}>{p.name}</Link>
            <div className="muted">{formatEUR(p.price)} · {p.country}</div>
          </div>
          <div className="qty">
            <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease quantity">-</button>
            <b>{qty}</b>
            <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase quantity">+</button>
          </div>
          <b className="cart-line-total">{formatEUR(p.price * qty)}</b>
          <button className="btn cart-remove" onClick={() => remove(p.id)}>Remove</button>
        </div>
      ))}
      <div className="cart-footer">
        <button className="btn btn-ghost" onClick={clear}>Clear</button>
        <div className="cart-total">Total: {formatEUR(total)}</div>
      </div>
      <div className="cart-actions">
        <Link href="/shop" className="btn">Continue shopping</Link>
        <Link href="/checkout" className="btn btn-primary">Checkout →</Link>
      </div>
    </div>
  );
}
