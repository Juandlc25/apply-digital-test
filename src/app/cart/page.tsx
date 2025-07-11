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
    <div className="w-full flex flex-col px-8 md:px-16 py-8 gap-4">
      <div>
        <button
          className="mb-12 text-base text-gray-600"
          onClick={() => router.push("/")}
        >
          &larr; Back to Catalog
        </button>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          {!!cart.length && <span>{cart.length} items</span>}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8">
        {cart.length === 0 ? (
          <div className="text-gray-500 w-full md:w-3/5">
            Your cart is empty.
          </div>
        ) : (
          <div className="w-full md:w-3/5">
            {cart.map((game: Game, index: number) => (
              <CartItem
                key={game.id}
                game={game}
                onRemove={handleRemove}
                isLast={index === cart.length - 1}
              />
            ))}
          </div>
        )}
        <OrderSummary games={cart} />
      </div>
    </div>
  );
}
