const KEY = "ecv-orders";

export function getOrders() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getOrder(id) {
  return getOrders().find((o) => o.id === id);
}

export function saveOrder(order) {
  const all = getOrders();
  all.unshift(order);
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
}

export function makeOrderId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `ECV-${n}`;
}

export const ZONES = {
  EU: ["Germany", "France", "Netherlands", "Other EU"],
  WORLD: ["USA", "UK", "Australia", "Canada", "Other non-EU"],
};

export function zoneOf(country) {
  return ZONES.EU.includes(country) ? "EU" : "WORLD";
}

export function shippingOptions(zone, subtotal) {
  const freeExpress = subtotal >= 500;
  const opts = [];
  if (zone === "EU" && subtotal < 25) {
    opts.push({ id: "economy", label: "Economy letter (untracked, at your risk)", eta: "5–10 business days", price: 2.9 });
  }
  if (zone === "EU") {
    opts.push(
      { id: "standard", label: "Standard tracked + insured", eta: "3–6 business days", price: 6.9 },
      { id: "express", label: "Express courier, signature", eta: "1–3 business days", price: freeExpress ? 0 : 16.9 },
    );
  } else {
    opts.push(
      { id: "standard", label: "Standard tracked + insured", eta: "7–14 business days", price: 12.9 },
      { id: "express", label: "Express courier, signature", eta: "2–5 business days", price: freeExpress ? 0 : 29.9 },
    );
  }
  return opts;
}

export function luhn(num) {
  const d = num.replace(/\D/g, "");
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0, dbl = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let x = +d[i];
    if (dbl) { x *= 2; if (x > 9) x -= 9; }
    sum += x;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export function validExpiry(v) {
  const m = v.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!m) return false;
  const exp = new Date(2000 + +m[2], +m[1], 0);
  return exp >= new Date();
}
