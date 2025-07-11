import { Game } from "@/utils/endpoint";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

interface CartItemProps {
  game: Game;
  onRemove: (id: string) => void;
}

export default function CartItem({ game, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center border-b py-4 relative">
      <Image
        src={game.image}
        alt={game.name}
        width={80}
        height={64}
        className="w-20 h-16 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{game.name}</span>
          {game.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500">{game.genre}</div>
        <div className="text-xs text-gray-400 mb-1">{game.description}</div>
        <div className="font-bold">${game.price.toFixed(2)}</div>
      </div>
      <button
        className="ml-2 text-gray-400 hover:text-red-500"
        onClick={() => onRemove(game.id)}
        aria-label="Remove from cart"
      >
        <FaTimes />
      </button>
    </div>
  );
}
