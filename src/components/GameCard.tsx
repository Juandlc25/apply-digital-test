import { Game } from "@/utils/endpoint";
import Image from "next/image";

interface GameCardProps {
  game: Game;
  inCart: boolean;
  onCartToggle: (game: Game) => void;
}

export default function GameCard({
  game,
  inCart,
  onCartToggle,
}: GameCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center shadow bg-white relative">
      {game.isNew && (
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          New
        </span>
      )}
      <Image
        src={game.image}
        alt={game.name}
        width={160}
        height={112}
        className="w-40 h-28 object-cover rounded mb-2"
      />
      <div className="text-xs text-gray-500 mb-1">{game.genre}</div>
      <div className="font-semibold mb-1 text-center">{game.name}</div>
      <div className="text-sm font-bold mb-2">${game.price.toFixed(2)}</div>
      <button
        className={`w-full border rounded py-1 mt-auto ${
          inCart
            ? "bg-red-100 text-red-700 border-red-400"
            : "bg-gray-100 text-gray-700 border-gray-300"
        } transition`}
        onClick={() => onCartToggle(game)}
      >
        {inCart ? "Remove" : "Add to Cart"}
      </button>
    </div>
  );
}
