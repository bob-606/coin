import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "../../../components/ProductCard";
import { products, categories } from "../../../data/products";
import { categorySlug } from "../page";

export function generateStaticParams() {
  return categories.filter((c) => c !== "All").map((c) => ({ slug: categorySlug(c) }));
}

export function generateMetadata({ params }) {
  const cat = categories.find((c) => categorySlug(c) === params.slug);
  if (!cat) return {};
  return {
    title: `${cat} coins — EU Coin Vault`,
    description: `Browse ${cat} coins: ${products.filter((p) => p.category === cat).length} listings, shipped from the EU.`,
  };
}

export default function CollectionPage({ params }) {
  const cat = categories.find((c) => categorySlug(c) === params.slug);
  if (!cat) notFound();
  const items = products.filter((p) => p.category === cat);
  return (
    <div className="container">
      <div className="section">
        <Link href="/collections" className="link-more">← All collections</Link>
        <h2 style={{ marginTop: 10 }}>{cat} coins</h2>
        <p className="muted">{items.length} coin{items.length === 1 ? "" : "s"} · all photographed, graded and shipped from the EU.</p>
        <div className="grid" style={{ marginTop: 16 }}>
          {items.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        <div style={{ marginTop: 18 }}>
          <Link href={`/shop?cat=${encodeURIComponent(cat)}`} className="btn">Open in filtered shop →</Link>
        </div>
      </div>
    </div>
  );
}
