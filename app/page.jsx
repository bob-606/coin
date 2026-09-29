import Link from "next/link";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import EmailAlerts from "../components/EmailAlerts";
import Transit from "../components/Transit";
import { Stars } from "../components/Reviews";
import { products, categories } from "../data/products";
import { seedReviews } from "../data/reviews";

const sources = [
  { name: "Eesti Pank", logo: "/logos/eesti-pank.svg", logoDark: "/logos/eesti-pank-white.svg" },
  { name: "Latvijas Banka", logo: "/logos/latvijas-banka.png" },
  { name: "Lietuvos Bankas", logo: "/logos/lietuvos-bankas.svg" },
  { name: "European Central Bank", logo: "/logos/ecb.svg" },
  { name: "Monnaie de Paris", logo: "/logos/monnaie-de-paris.svg" },
  { name: "Münze Österreich", logo: "/logos/munze-oesterreich.svg" },
  { name: "United States Mint", logo: "/logos/us-mint.svg" },
  { name: "Collector auctions", code: "AH", color: "#7C3AED" },
  { name: "German dealers", code: "DE", color: "#B45309" },
  { name: "Estate lots", code: "EL", color: "#A16207" },
  { name: "Numismatic fairs", code: "NF", color: "#C026D3" },
];

export default function Home() {
  const arrivals = products.slice(0, 6);
  const featured = products.filter((p) => p.price >= 65).slice(0, 6);
  const testimonials = [
    { pid: "morgan-1889", key: 0 },
    { pid: "france-20fr-1908-rooster", key: 0 },
    { pid: "roman-denarius-severus", key: 0 },
  ].map(({ pid, key }) => ({ pid, r: seedReviews[pid][key] }));
  return (
    <>
      <div className="dark-hero">
        <div className="container">
          <div className="eyebrow">{products.length} coins in stock · refreshed weekly</div>
          <h1>Every collectible coin,<br />one search away.</h1>
          <p className="hero-sub">
            EU Coin Vault pulls Baltic euros, Soviet history, world silver and gold
            into one queue — so you compare coins and prices in one place, not a dozen tabs.
          </p>
          <SearchBar />
          <div className="hero-stats">
            <div><b>{products.length}</b><span>Coins in stock</span></div>
            <div><b>{categories.length - 1}</b><span>Collections</span></div>
            <div><b>24–48h</b><span>EU dispatch</span></div>
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
                  <span key={s.name} className="src">
                    {s.logo ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.logo} alt={`${s.name} logo`} className="src-logo show-light" />
                        {s.logoDark && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={s.logoDark} alt="" aria-hidden className="src-logo show-dark" />
                        )}
                      </>
                    ) : (
                      <i style={{ background: s.color }}>{s.code}</i>
                    )}
                    {s.name}
                  </span>
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
          <span className="chnum">04 — COLLECTORS SAY</span>
          <h2>Trusted parcel after parcel.</h2>
          <div className="testi-grid">
            {testimonials.map(({ pid, r }) => (
              <Link key={pid} href={`/product/${pid}`} className="panel">
                <Stars n={r.rating} />
                <b style={{ display: "block", marginTop: 8 }}>{r.title}</b>
                <p className="muted" style={{ color: "var(--text)" }}>“{r.text}”</p>
                <div className="muted">— {r.name}, {r.country}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="section">
          <EmailAlerts />
        </div>
      </div>
    </>
  );
}
