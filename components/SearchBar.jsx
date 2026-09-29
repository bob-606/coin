"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ placeholder }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  return (
    <form
      className="searchbar"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder || "Search coins — e.g. Morgan, 2 euro, silver…"}
        aria-label="Search coins"
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
}
