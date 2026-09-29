"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState({}); // id -> qty
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ecv-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("ecv-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo(() => {
    const add = (id, qty = 1) => setItems((s) => ({ ...s, [id]: (s[id] || 0) + qty }));
    const remove = (id) => setItems((s) => { const n = { ...s }; delete n[id]; return n; });
    const setQty = (id, qty) => setItems((s) => (qty <= 0 ? (() => { const n = { ...s }; delete n[id]; return n; })() : { ...s, [id]: qty }));
    const clear = () => setItems({});
    const count = Object.values(items).reduce((a, b) => a + b, 0);
    return { items, add, remove, setQty, clear, count };
  }, [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart outside provider");
  return ctx;
}
