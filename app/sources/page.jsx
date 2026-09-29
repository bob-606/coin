import Link from "next/link";
import { products, sources } from "../../data/products";

export const metadata = {
  title: "Our sources — EU Coin Vault",
  description: "Where our coins come from: Baltic central banks, auctions, dealers, estates.",
};

export default function SourcesPage() {
  return (
    <div className="container">
      <div className="section">
        <span className="kicker">Sources</span>
        <h2>The sources behind the coins.</h2>
        <p className="muted">Every coin in the shop comes from one of these sources. Here is who they are.</p>
        <div className="grid" style={{ marginTop: 18 }}>
          {sources.map((s) => {
            const n = products.filter((p) => p.source === s.name).length;
            const img = (products.find((p) => p.source === s.name) || {}).image;
            return (
              <Link key={s.name} href={`/shop?src=${encodeURIComponent(s.name)}`} className="card source-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {img && <img src={img} alt={s.name} loading="lazy" className="source-img" />}
                <div className="card-body">
                  <b style={{ fontSize: 17 }}>{s.name} <span style={{ color: "var(--green)" }}>✓</span></b>
                  <div className="muted">{n} coin{n === 1 ? "" : "s"}</div>
                  <div className="muted">{s.blurb}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
