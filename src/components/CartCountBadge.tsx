"use client";
import { useEffect, useState } from "react";
import { getCart } from "@/services/cartService";

export default function CartCountBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCart().length);
    const sync = () => setCount(getCart().length);
    window.addEventListener("storage", sync);
    window.addEventListener("cart-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cart-updated", sync);
    };
  }, []);

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
      {count}
    </span>
  );
}
