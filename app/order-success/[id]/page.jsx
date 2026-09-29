"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatEUR } from "../../../data/products";
import { getOrder } from "../../../lib/orders";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const order = typeof window !== "undefined" ? getOrder(id) : undefined;
  if (!order)
    return (
      <div className="container section" style={{ maxWidth: 640 }}>
        <h2>Order not found</h2>
        <p className="muted">We could not find order {id} on this device. Orders are stored in this browser.</p>
        <Link href="/shop" className="btn btn-primary">Browse coins →</Link>
      </div>
    );
  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <span className="kicker">Payment successful ✓</span>
      <h2>Thank you, {order.name.split(" ")[0]}!</h2>
      <p className="muted">Order <b>{order.id}</b> is confirmed. A receipt was sent to {order.email} (demo — nothing was really emailed or charged).</p>

      <div className="timeline">
        {["Order placed", "Packing", "Shipped", "Delivered"].map((s, i) => (
          <div key={s} className={`tl-step ${i === 0 ? "done" : ""}`}>
            <span className="tl-dot">{i === 0 ? "✓" : i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>What happens next</h3>
        <p className="muted">1. We pack your coins in flips/capsules within 24h.<br />2. Tracking number by email the day it ships ({order.eta}).<br />3. Signature on delivery for orders over €150.</p>
        <table className="table">
          <tbody>
            {order.items.map((it) => (
              <tr key={it.id}><td>{it.qty}× {it.name}</td><td style={{ textAlign: "right" }}>{formatEUR(it.price * it.qty)}</td></tr>
            ))}
            <tr><td>Shipping — {order.method}</td><td style={{ textAlign: "right" }}>{order.shipping === 0 ? "Free" : formatEUR(order.shipping)}</td></tr>
            <tr><td><b>Total paid (card •• {order.last4})</b></td><td style={{ textAlign: "right" }}><b>{formatEUR(order.total)}</b></td></tr>
          </tbody>
        </table>
        <p className="muted">Ship to: {order.address.street}, {order.address.city} {order.address.postcode}, {order.address.country}</p>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
        <Link href="/orders" className="btn btn-primary">Track in My Orders →</Link>
        <Link href="/shop" className="btn">Keep browsing</Link>
      </div>
    </div>
  );
}
