import Link from "next/link";
import { products, categories } from "../../data/products";

export const metadata = {
  title: "Coin collections — EU Coin Vault",
  description: "Browse coin collections: euro commemoratives, silver, gold, ancient and more.",
};

const blurbs = {
  "Euro Collector": "Baltic 2 euro commemoratives in capsules — the friendliest entry to European numismatics.",
  "Sets": "Curated multi-coin sets with combined shipping and gift-ready packing.",
  "USSR / History": "Soviet commemoratives and circulation coins with real stories attached.",
  "German History": "Imperial and colonial German material from dealer partners.",
  "Silver": "World silver crowns and commemoratives — liquid, beautiful, historic.",
  "Gold": "High-value gold coins, shipped express, insured and signed.",
  "Ancient": "Genuine ancient silver with provenance, guaranteed for life.",
};

function slug(c) {
  return c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export { slug as categorySlug };

export default function CollectionsPage() {
  const cats = categories.filter((c) => c !== "All");
  return (
    <div className="container">
      <div className="section">
        <span className="kicker">Collections</span>
        <h2>The collections behind the coins.</h2>
        <p className="muted">Every coin in the shop belongs to one of these collections. Pick one and start browsing.</p>
        <div className="grid" style={{ marginTop: 18 }}>
          {cats.map((c) => {
            const items = products.filter((p) => p.category === c);
            return (
              <Link key={c} href={`/collections/${slug(c)}`} className="card source-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={items[0].image} alt={c} loading="lazy" className="source-img" />
                <div className="card-body">
                  <b style={{ fontSize: 17 }}>{c} <span style={{ color: "var(--green)" }}>✓</span></b>
                  <div className="muted">{items.length} coin{items.length === 1 ? "" : "s"}</div>
                  <div className="muted">{blurbs[c] || ""}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
