import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  const featured = products.slice(0, 6);
  return (
    <>
      <div className="hero">
        <div>
          <span className="kicker">Shipped from the EU · Worldwide</span>
          <h1>Collectible coins. Trusted, tracked, graded.</h1>
          <p className="sub">
            EU Coin Vault sells Baltic euro commemoratives, history coins, world silver and
            graded gold to collectors in the USA, Germany, UK and Australia.
            Small parcel, high trust, careful packaging.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/shop" className="btn btn-primary">Browse 13 coins</Link>
            <Link href="/about" className="btn btn-ghost">Shipping & trust</Link>
          </div>
          <div className="stats">
            <div className="stat"><b>Worldwide</b><span>USA · DE · UK · AU · EU</span></div>
            <div className="stat"><b>24–48h dispatch</b><span>from EU, tracked + insured</span></div>
            <div className="stat"><b>Graded</b><span>NGC / PCGS with certificates</span></div>
          </div>
        </div>
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Why collectors buy from us</h3>
          <p className="muted">
            Every coin is photographed, weighed and described by condition.
            Graded coins include certification numbers. Ancient and medieval
            coins come with provenance.
          </p>
          <table className="table">
            <tbody>
              <tr><td>Starter</td><td>Baltic 2€ sets — easy first purchase</td></tr>
              <tr><td>History</td><td>USSR lots €6–€19 — stories + gifts</td></tr>
              <tr><td>Certified</td><td>NGC/PCGS slabs — photos of cert</td></tr>
              <tr><td>Rare</td><td>Gold 5 Roubles 1899 — insured courier</td></tr>
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <Link href="/shop" className="btn btn-primary">See full catalog →</Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Featured coins</h2>
        <p className="muted">6 of 13 — full catalog in Shop. Prices in EUR.</p>
        <div className="grid" style={{ marginTop: 16 }}>
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      <div className="section">
        <h2>Built for trust</h2>
        <div className="trust" style={{ marginTop: 12 }}>
          <div><b>Graded where it matters</b><div className="muted">NGC/PCGS cert numbers shown with slab photos.</div></div>
          <div><b>Tracked + insured</b><div className="muted">Tracked shipping, signature over €150, careful packaging.</div></div>
          <div><b>Clear conditions</b><div className="muted">Graded or Ungraded — Uncirculated to Fine, weight + diameter listed.</div></div>
          <div><b>No fakes ever</b><div className="muted">Provenance for ancient / medieval coins.</div></div>
        </div>
      </div>
    </>
  );
}
