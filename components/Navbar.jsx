"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Coins" },
  { href: "/collections", label: "Collections" },
  { href: "/sources", label: "Sources" },
  { href: "/guides", label: "Guides" },
  { href: "/orders", label: "My orders" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <div className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">€</span>
          <span>EU Coin Vault</span>
        </Link>
        <div className="nav-links desktop-only">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <Link href="/cart">Cart ({count})</Link>
          <ThemeToggle />
          <Link href="/checkout" className="btn btn-primary" style={{ padding: "8px 14px" }}>
            Checkout
          </Link>
        </div>
        <div className="mobile-only" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/cart" className="btn" style={{ padding: "8px 12px" }}>Cart ({count})</Link>
          <ThemeToggle />
          <button className="btn" style={{ padding: "8px 12px" }} onClick={() => setOpen((o) => !o)} aria-label="Menu">
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="container">
          <div className="mobile-menu">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>Cart ({count})</Link>
            <Link href="/checkout" className="btn btn-primary" onClick={() => setOpen(false)}>Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
