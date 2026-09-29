import Link from "next/link";
import { guides } from "../../data/guides";

export const metadata = {
  title: "Coin collecting guides — EU Coin Vault",
  description: "What coins actually cost, how grading works, how to spot fakes, and how shipping works.",
};

export default function GuidesPage() {
  return (
    <div className="container">
      <div className="section">
        <span className="kicker">Guides</span>
        <h2>Guides</h2>
        <p className="muted">What grading actually means, how to spot fakes, and how our shipping works.</p>
        <div className="grid" style={{ marginTop: 18 }}>
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="card" style={{ padding: 20 }}>
              <b style={{ fontSize: 18, lineHeight: 1.35 }}>{g.title}</b>
              <div className="muted" style={{ marginTop: 8 }}>{g.excerpt}</div>
              <div className="muted" style={{ marginTop: 8 }}>Updated {g.updated}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
