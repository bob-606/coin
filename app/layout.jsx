import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "EU Coin Vault — Collectible Coins from Europe",
  description: "Collectible coins from EU to the world. Baltic euros, silver, gold, graded.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="container">{children}</main>
          <footer className="footer">
            <div className="container">
              EU Coin Vault — collectible coins shipped from the EU worldwide.
              Tracked + insured · No counterfeits. <a href="/credits" style={{ textDecoration: "underline" }}>Photo credits</a>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
