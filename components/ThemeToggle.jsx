"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(t);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("ecv-theme", next); } catch {}
  };
  return (
    <button className="btn theme-toggle" onClick={toggle} aria-label="Toggle dark mode" title="Toggle light / dark">
      <span aria-hidden>{theme === "dark" ? "☾" : "☀"}</span>
      <span className="theme-label"> {theme === "dark" ? "DARK" : "LIGHT"}</span>
    </button>
  );
}
