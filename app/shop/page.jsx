"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../data/products";

function ShopInner() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState(initialQ);
  const list = products.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (q.trim() === "" || (p.name + " " + p.country + " " + p.blurb + " " + p.year).toLowerCase().includes(q.trim().toLowerCase()))
  );
  return (
    <div className="container">
      <div className="section">
        <span className="kicker">{products.length} open listings</span>
        <h2>Browse all coins</h2>
        <p className="muted">Compare coins and prices in one queue. All coins ship from the EU.</p>
        <div style={{ maxWidth: 560, margin: "16px 0 4px" }}>
          <input
            placeholder="Search — e.g. Morgan, 2 euro, silver, gold…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search coins"
          />
        </div>
        <div className="toolbar">
          {categories.map((c) => (
            <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {list.length === 0 && <p className="muted">No matches — try “silver” or “Baltic”.</p>}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopInner />
    </Suspense>
  );
}
