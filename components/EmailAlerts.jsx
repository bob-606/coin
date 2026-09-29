"use client";
import { useEffect, useState } from "react";

export default function EmailAlerts() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("ecv-alerts")) setDone(true);
    } catch {}
  }, []);
  if (done)
    return (
      <div className="alert-box">
        <h2 style={{ margin: "0 0 8px" }}>You&apos;re on the list.</h2>
        <p className="muted">New arrivals will land in your inbox. Manage anytime by clearing this notice.</p>
        <button className="btn" style={{ marginTop: 12 }} onClick={() => { try { localStorage.removeItem("ecv-alerts"); } catch {} setDone(false); }}>
          Unsubscribe
        </button>
      </div>
    );
  return (
    <div className="alert-box">
      <h2 style={{ margin: "0 0 8px" }}>New arrivals, straight to your inbox.</h2>
      <p className="muted">Fresh Baltic euros, silver and gold — emailed when they land. No spam.</p>
      <form
        className="alert-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@")) return;
          try { localStorage.setItem("ecv-alerts", email); } catch {}
          setDone(true);
        }}
      >
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" />
        <button type="submit" className="btn btn-gold">Get alerts</button>
      </form>
    </div>
  );
}
