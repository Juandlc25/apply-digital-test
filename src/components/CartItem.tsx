import { Game } from "@/utils/endpoint";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

interface CartItemProps {
  game: Game;
  onRemove: (id: string) => void;
  isLast?: boolean;
}

export default function CartItem({
  game,
  onRemove,
  isLast = false,
}: CartItemProps) {
  const button = (
    <button
      className="ml-2 text-gray-400 flex items-start hover:text-red-500"
      onClick={() => onRemove(game.id)}
      aria-label="Remove from cart"
    >
      <FaTimes />
    </button>
  );

  return (
    <div
      data-testid="cart-item"
      className={`flex flex-col md:flex-row items-center py-4 w-full ${
        !isLast ? "border-b" : ""
      }`}
    >
      <div className="w-full md:w-48 flex flex-row">
        <Image
          src={game.image}
          alt={game.name}
          width={80}
          height={64}
          className="w-full md:w-48 h-32 md:h-28 object-cover rounded mr-4"
        />
        <div className="block md:hidden">{button}</div>
      </div>

      <div className="flex-1 flex justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{game.name}</span>
            {game.isNew && (
              <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded shadow-md">
                New
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 uppercase">{game.genre}</div>
          <div className="text-xs text-gray-400 mb-1">{game.description}</div>
          <div className="font-bold text-right mr-2">
            ${game.price.toFixed(2)}
          </div>
        </div>
        <div className="hidden md:block">{button}</div>
      </div>
    </div>
  );
}
