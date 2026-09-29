"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatEUR, products } from "../../data/products";
import { getOrders } from "../../lib/orders";
import { useCart } from "../../components/CartProvider";

export default function OrdersPage() {
  const [orders] = useState(() => (typeof window !== "undefined" ? getOrders() : []));
  const [open, setOpen] = useState(null);
  const { add } = useCart();
  const router = useRouter();

  const reorder = (order) => {
    order.items.forEach((it) => {
      if (products.find((p) => p.id === it.id)) add(it.id, it.qty);
    });
    router.push("/cart");
  };

  if (orders.length === 0)
    return (
      <div className="container section" style={{ maxWidth: 640 }}>
        <span className="chnum">MY ORDERS</span>
        <h2>No orders yet.</h2>
        <p className="muted">Orders placed on this device will appear here with tracking status.</p>
        <Link href="/shop" className="btn btn-primary">Browse coins →</Link>
      </div>
    );

  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      <span className="chnum">MY ORDERS</span>
      <h2>My orders ({orders.length})</h2>
      <p className="muted">Stored in this browser. Statuses update when parcels ship.</p>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {orders.map((o) => (
          <div key={o.id} className="panel">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <b>{o.id}</b>
              <span className="badge-new">{o.status}</span>
              <span className="muted">{new Date(o.date).toLocaleDateString()} · {o.items.reduce((a, i) => a + i.qty, 0)} items</span>
              <b style={{ marginLeft: "auto" }}>{formatEUR(o.total)}</b>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn" onClick={() => setOpen(open === o.id ? null : o.id)}>
                {open === o.id ? "Hide details" : "View details"}
              </button>
              <button className="btn" onClick={() => reorder(o)}>Reorder</button>
            </div>
            {open === o.id && (
              <div style={{ marginTop: 12 }}>
                {o.items.map((it) => (
                  <div key={it.id} className="sum-line">
                    <Image src={it.image} alt="" width={44} height={44} className="cart-thumb" style={{ width: 44, height: 44 }} />
                    <div style={{ flex: 1, fontSize: 13 }}>{it.qty}× {it.name}</div>
                    <b style={{ fontSize: 13 }}>{formatEUR(it.price * it.qty)}</b>
                  </div>
                ))}
                <p className="muted">Ship to: {o.address.street}, {o.address.city} {o.address.postcode}, {o.address.country} · {o.method} ({o.eta}) · Paid card •• {o.last4}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
