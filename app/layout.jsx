import "./globals.css";
import Link from "next/link";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "EU Coin Vault — Every collectible coin, one search away",
  description: "Collectible coins from the EU shipped worldwide. Baltic euros, silver, gold, ancient.",
};

export default function RootLayout({ children }) {
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
                  <h4>EU Coin Vault</h4>
                  <Link href="/shop">Browse coins</Link>
                  <Link href="/about">Shipping & trust</Link>
                  <Link href="/credits">Photo credits</Link>
                </div>
                <div>
                  <h4>Collections</h4>
                  <Link href="/shop">Euro Collector</Link>
                  <Link href="/shop">Silver</Link>
                  <Link href="/shop">Gold</Link>
                  <Link href="/shop">Ancient</Link>
                </div>
                <div>
                  <h4>Orders</h4>
                  <Link href="/cart">Cart</Link>
                  <Link href="/checkout">Checkout</Link>
                </div>
                <div>
                  <h4>Store</h4>
                  <Link href="/about">About</Link>
                  <Link href="/credits">Photo credits</Link>
                </div>
              </div>
              <div>© 2026 EU Coin Vault — collectible coins shipped from the EU worldwide.</div>
              <div style={{ marginTop: 6 }}>Product photos: Wikimedia Commons contributors (CC licences) — see photo credits. Replace with your own photos before going live.</div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
