import "./globals.css";
import Link from "next/link";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";
import CookieBanner from "../components/CookieBanner";
import { products, categories, countries, priceBuckets } from "../data/products";

export const metadata = {
  title: "EU Coin Vault — Every collectible coin, one search away",
  description: "Collectible coins from the EU shipped worldwide. Baltic euros, silver, gold, ancient.",
};

export default function RootLayout({ children }) {
  const cats = categories.filter((c) => c !== "All");
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="footer">
            <div className="container">
              <div className="footer-grid">
                <div>
                  <h4>Coins</h4>
                  <Link href="/shop">All coins ({products.length})</Link>
                  <Link href="/collections">Collections</Link>
                  <Link href="/sources">Sources</Link>
                  <Link href="/guides">Guides</Link>
                </div>
                <div>
                  <h4>Coins by collection</h4>
                  {cats.slice(0, 5).map((c) => (
                    <Link key={c} href={`/shop?cat=${encodeURIComponent(c)}`}>
                      {c} ({products.filter((p) => p.category === c).length})
                    </Link>
                  ))}
                </div>
                <div>
                  <h4>Coins by price</h4>
                  {priceBuckets.map((b) => (
                    <Link key={b.label} href={`/shop?price=${encodeURIComponent(b.label)}`}>
                      {b.label} ({products.filter(b.test).length})
                    </Link>
                  ))}
                  <Link href="/shop?country=Baltics">Baltic coins</Link>
                </div>
                <div>
                  <h4>Store</h4>
                  <Link href="/about">Shipping & trust</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/cart">Cart</Link>
                  <Link href="/credits">Photo credits</Link>
                </div>
              </div>
              <div>© 2026 EU Coin Vault — collectible coins shipped from the EU worldwide. {countries.length} countries of origin.</div>
              <div style={{ marginTop: 6 }}>Product photos: Wikimedia Commons contributors (CC licences) — see photo credits. Replace with your own photos before going live.</div>
            </div>
          </footer>
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
