import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "../../../data/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const g = guides.find((x) => x.slug === params.slug);
  if (!g) return {};
  return { title: `${g.title} — EU Coin Vault`, description: g.excerpt };
}

export default function GuidePage({ params }) {
  const g = guides.find((x) => x.slug === params.slug);
  if (!g) notFound();
  return (
    <div className="container">
      <div className="section" style={{ maxWidth: 760 }}>
        <Link href="/guides" className="link-more">← All guides</Link>
        <h2 style={{ marginTop: 10, fontSize: 36 }}>{g.title}</h2>
        <p className="muted">Updated {g.updated} · EU Coin Vault</p>
        <div className="article">
          {g.sections.map((s) => (
            <div key={s.h}>
              <h3>{s.h}</h3>
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          <Link href="/shop" className="btn btn-primary">Browse coins →</Link>
          <Link href="/guides" className="btn">More guides</Link>
        </div>
      </div>
    </div>
  );
}
