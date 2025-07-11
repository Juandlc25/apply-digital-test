"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, removeFromCart } from "@/services/cartService";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Game } from "@/utils/endpoint";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Game[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    const syncCart = () => setCart(getCart());
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <button
          className="mb-4 text-sm text-blue-600 hover:underline"
          onClick={() => router.push("/")}
        >
          &larr; Back to Catalog
        </button>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          <div>
            {cart.map((game: any) => (
              <CartItem key={game.id} game={game} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full md:w-80">
        <OrderSummary games={cart} />
      </div>
    </div>
  );
}
