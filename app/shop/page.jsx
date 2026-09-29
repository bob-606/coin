"use client";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../data/products";

export default function ShopPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = products.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (q === "" || (p.name + p.country + p.blurb).toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div className="section">
      <h2>Shop — {products.length} collectible coins</h2>
      <p className="muted">Filter by collection. All coins ship from the EU.</p>
      <div className="toolbar">
        {categories.map((c) => (
          <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: 360, marginBottom: 16 }}>
        <input placeholder="Search — e.g. Baltic, silver, graded, USSR" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="grid">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {list.length === 0 && <p className="muted">No matches — try “silver” or “Baltic”.</p>}
    </div>
  );
}
