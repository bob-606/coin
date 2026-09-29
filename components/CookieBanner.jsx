"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("ecv-cookies")) setShow(true);
    } catch { setShow(true); }
  }, []);
  if (!show) return null;
  const decide = (v) => {
    try { localStorage.setItem("ecv-cookies", v); } catch {}
    setShow(false);
  };
  return (
    <div className="cookie-banner">
      <div className="container cookie-inner">
        <p className="muted" style={{ margin: 0, color: "#344054" }}>
          We use cookies to understand how visitors use this site and improve it. See our <Link href="/about" style={{ textDecoration: "underline" }}>About page</Link> for details.
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => decide("no")}>Decline</button>
          <button className="btn btn-primary" onClick={() => decide("yes")}>Accept</button>
        </div>
      </div>
    </div>
  );
}
