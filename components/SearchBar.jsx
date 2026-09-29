"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { countries } from "../data/products";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [c, setC] = useState("All countries");
  const router = useRouter();
  return (
    <form
      className="hero-search"
      onSubmit={(e) => {
        e.preventDefault();
        const sp = new URLSearchParams();
        if (q.trim()) sp.set("q", q.trim());
        if (c !== "All countries") sp.set("country", c);
        router.push(`/shop${sp.toString() ? `?${sp}` : ""}`);
      }}
    >
      <label className="hs-field">
        <span className="hs-icon">⌕</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Coin — e.g. Morgan dollar"
          aria-label="Search coins"
        />
      </label>
      <span className="hs-divider" />
      <label className="hs-field">
        <span className="hs-icon">◎</span>
        <select value={c} onChange={(e) => setC(e.target.value)} aria-label="Country">
          <option>All countries</option>
          {countries.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
      </label>
      <button type="submit" className="hs-btn">Search</button>
    </form>
  );
}
