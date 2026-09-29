import Link from "next/link";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import EmailAlerts from "../components/EmailAlerts";
import Transit from "../components/Transit";
import { products, categories } from "../data/products";

const sources = [
  "Eesti Pank", "Latvijas Banka", "Lietuvos Bankas",
  "Collector auctions", "German dealers", "Moscow Mint",
  "Paris Mint", "Vienna Mint", "US consignments",
  "Estate lots", "Numismatic fairs",
];

export default function Home() {
  const arrivals = products.slice(0, 6);
  const featured = products.filter((p) => p.price >= 65).slice(0, 6);
  return (
    <>
      <div className="container">
        <div className="hero">
          <div className="hero-center">
            <span className="kicker">{products.length} coins in stock · ships worldwide</span>
            <h1>Every collectible coin, one search away.</h1>
            <p className="sub">
              EU Coin Vault pulls Baltic euros, Soviet history, world silver and gold
              into one queue — so you compare coins and prices in one place, not a dozen tabs.
            </p>
            <SearchBar />
            <div className="stats">
              <div className="stat"><b>{products.length}</b><span>Coins in stock</span></div>
              <div className="stat"><b>{categories.length - 1}</b><span>Collections</span></div>
              <div className="stat"><b>24–48h</b><span>Dispatch from the EU</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="strip">
        <div className="container strip-inner">
          <div className="strip-label">Sourcing from</div>
          <div className="marquee">
            {[0, 1].map((n) => (
              <div key={n} className="marquee-track" aria-hidden={n === 1}>
                {sources.map((s) => (
                  <span key={s} className="src"><i>€</i>{s}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section">
          <div className="section-head">
            <div>
              <span className="chnum">01 — ARRIVALS</span>
              <h2>Fresh arrivals</h2>
              <p className="muted" style={{ margin: 0 }}>New Baltic euros, silver and ancient coins.</p>
            </div>
            <Link href="/shop" className="link-more">View all coins →</Link>
          </div>
          <div className="grid" style={{ marginTop: 16 }}>
            {arrivals.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </div>

      <Transit left="Tracked shipping" right="EU → World" />

      <div className="container">
        <div className="section">
          <div className="section-head">
            <div>
              <span className="chnum">02 — FEATURED</span>
              <h2>Worth a closer look.</h2>
            </div>
            <Link href="/shop" className="link-more">View all coins →</Link>
          </div>
          <div className="grid" style={{ marginTop: 16 }}>
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </div>

      <Transit left="No fakes" right="Guaranteed genuine" />

      <div className="container">
        <div className="section">
          <span className="chnum">03 — HOW IT WORKS</span>
          <h2>From scattered dealers to one queue.</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Find your coin</h3>
              <p className="muted">Search by country, metal or era. Every coin is photographed, weighed and graded.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>Order in one place</h3>
              <p className="muted">One cart, one checkout — combine shipping across collections instead of a dozen parcels.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Tracked to your door</h3>
              <p className="muted">Dispatched from the EU in 24–48h, tracked + insured, signature over €150.</p>
            </div>
          </div>
        </div>

        <div className="section">
          <EmailAlerts />
        </div>
      </div>
    </>
  );
}
