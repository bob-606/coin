import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: "center", padding: "80px 20px" }}>
      <h2>That page is not in the collection.</h2>
      <p className="muted">The coin — or page — you are looking for does not exist.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
        <Link href="/shop" className="btn btn-primary">Browse coins →</Link>
        <Link href="/" className="btn">Home</Link>
      </div>
    </div>
  );
}
