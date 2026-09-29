"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import { products, categories, countries, priceBuckets } from "../../data/products";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
];

function ShopInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState(params.get("cat") || "All");
  const [country, setCountry] = useState(params.get("country") || "All");
  const [bucket, setBucket] = useState(params.get("price") || "All");
  const [sort, setSort] = useState(params.get("sort") || "featured");
  const [src, setSrc] = useState(params.get("src") || "");

  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (cat !== "All") sp.set("cat", cat);
    if (country !== "All") sp.set("country", country);
    if (bucket !== "All") sp.set("price", bucket);
    if (sort !== "featured") sp.set("sort", sort);
    if (src) sp.set("src", src);
    router.replace(`/shop${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cat, country, bucket, sort, src]);

  const list = useMemo(() => {
    const b = priceBuckets.find((x) => x.label === bucket);
    let l = products.filter((p) =>
      (cat === "All" || p.category === cat) &&
      (country === "All" || p.country === country) &&
      (!b || b.test(p)) &&
      (!src || p.source === src) &&
      (q.trim() === "" || (p.name + " " + p.country + " " + p.blurb + " " + p.year + " " + p.category).toLowerCase().includes(q.trim().toLowerCase()))
    );
    if (sort === "low") l = [...l].sort((a, b2) => a.price - b2.price);
    if (sort === "high") l = [...l].sort((a, b2) => b2.price - a.price);
    if (sort === "new") l = [...l].sort((a, b2) => (b2.added > a.added ? 1 : -1));
    return l;
  }, [q, cat, country, bucket, sort, src]);

  const countFor = (fn) => products.filter(fn).length;
  const clearAll = () => { setQ(""); setCat("All"); setCountry("All"); setBucket("All"); setSort("featured"); setSrc(""); };

  return (
    <div className="container">
      <div className="section">
        <span className="kicker">Coin listings</span>
        <h2>Find your next coin.</h2>
        <p className="muted">Every coin photographed, weighed and graded. All ship from the EU.</p>

        <div className="shop-layout">
          <aside className="filters">
            <div className="filter-block">
              <h4>Search</h4>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Morgan, 2 euro, silver…" aria-label="Search coins" />
            </div>
            <div className="filter-block">
              <h4>Collection</h4>
              {categories.filter((c) => c !== "All").map((c) => (
                <label key={c} className="filter-check">
                  <input type="radio" name="cat" checked={cat === c} onChange={() => setCat(c)} />
                  {c} <span className="count">{countFor((p) => p.category === c)}</span>
                </label>
              ))}
              <label className="filter-check">
                <input type="radio" name="cat" checked={cat === "All"} onChange={() => setCat("All")} />
                All <span className="count">{products.length}</span>
              </label>
            </div>
            <div className="filter-block">
              <h4>Country</h4>
              <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country">
                <option value="All">All countries</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="filter-block">
              <h4>Price</h4>
              {priceBuckets.map((b) => (
                <label key={b.label} className="filter-check">
                  <input type="radio" name="price" checked={bucket === b.label} onChange={() => setBucket(b.label)} />
                  {b.label} <span className="count">{countFor(b.test)}</span>
                </label>
              ))}
              <label className="filter-check">
                <input type="radio" name="price" checked={bucket === "All"} onChange={() => setBucket("All")} />
                Any price
              </label>
            </div>
            {(q || cat !== "All" || country !== "All" || bucket !== "All" || src) && (
              <button className="btn" onClick={clearAll}>Clear filters</button>
            )}
          </aside>

          <div>
            <div className="results-bar">
              <span className="muted">1–{list.length} of {list.length} coins{src ? ` · from ${src}` : ""}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" style={{ width: "auto" }}>
                {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className="toolbar">
              {categories.map((c) => (
                <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div className="grid-2">
              {list.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            {list.length === 0 && (
              <div className="panel" style={{ marginTop: 16 }}>
                <b>No matches.</b>
                <p className="muted">Try “silver”, “Baltic”, or clear the filters.</p>
                <button className="btn btn-primary" onClick={clearAll}>Clear filters</button>
              </div>
            )}
          </div>
        </div>
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
