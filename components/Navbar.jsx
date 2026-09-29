"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { count } = useCart();
  return (
    <div className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">€</span>
          <span>EU Coin Vault</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/shop">Coins</Link>
          <Link href="/about">About</Link>
          <Link href="/cart">Cart ({count})</Link>
          <Link href="/checkout" className="btn btn-primary" style={{ padding: "8px 14px" }}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
