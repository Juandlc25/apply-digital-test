import { Game } from "@/utils/endpoint";

interface OrderSummaryProps {
  games: Game[];
}

export default function OrderSummary({ games }: OrderSummaryProps) {
  const total = games.reduce((sum, g) => sum + g.price, 0);
  return (
    <div className="w-full md:w-2/5">
      <div className="border rounded-lg p-4 bg-white w-full">
        <div className="font-semibold">Order Summary</div>
        <div className="text-sm mb-6">
          {games.length} item{games.length !== 1 ? "s" : ""}
        </div>
        <ul className="mb-2">
          {games.map((g) => (
            <li key={g.id} className="flex justify-between text-sm mb-1">
              <span>{g.name}</span>
              <span>${g.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold border-t pt-2 mb-4">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-neutral-700 text-white py-2 rounded hover:bg-neutral-800 transition">
        Checkout
      </button>
    </div>
  );
}
