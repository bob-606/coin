"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  "Compare weight + diameter against the specification",
  "Check the edge — reeded, lettered or plain as issued",
  "Magnet test: silver and gold are not magnetic",
  "Compare both sides with certified genuine photos",
  "Verify slab cert numbers on the NGC / PCGS website",
  "Never buy cleaned or polished coins",
  "Confirm returns and authenticity guarantee in writing",
];

export default function BuyerChecklist() {
  const [done, setDone] = useState({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ecv-checklist");
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("ecv-checklist", JSON.stringify(done)); } catch {}
  }, [done]);
  const n = ITEMS.filter((_, i) => done[i]).length;
  const all = n === ITEMS.length;
  return (
    <div className="panel">
      <div className="checklist-head">
        <h3 style={{ margin: 0 }}>Buyer checklist</h3>
        <button className="btn" onClick={() => setDone(all ? {} : Object.fromEntries(ITEMS.map((_, i) => [i, true])))}>
          {all ? "Reset" : "Check all"}
        </button>
      </div>
      <div className="progress"><div className="progress-bar" style={{ width: `${(n / ITEMS.length) * 100}%` }} /></div>
      <p className="muted">{n}/{ITEMS.length} checked</p>
      <ul className="checklist">
        {ITEMS.map((t, i) => (
          <li key={t}>
            <label className="filter-check">
              <input type="checkbox" checked={!!done[i]} onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))} />
              <span style={{ textDecoration: done[i] ? "line-through" : "none", opacity: done[i] ? 0.6 : 1 }}>{t}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
