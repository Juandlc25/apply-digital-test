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
    <div className="border rounded-lg p-4 flex flex-col shadow bg-white relative">
      {game.isNew && (
        <span className="absolute top-6 left-6 bg-white text-gray-800 text-xs px-2 py-1 rounded shadow-sm">
          New
        </span>
      )}
      <Image
        src={game.image}
        alt={game.name}
        width={400}
        height={280}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <div className="text-sm text-gray-500 mb-1 uppercase">{game.genre}</div>
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold mb-1">{game.name}</span>
        <span className="text-sm font-bold mb-2">${game.price.toFixed(2)}</span>
      </div>
      <button
        className={`w-full border rounded py-1 mt-auto ${
          inCart
            ? "bg-red-100 text-red-700 border-red-400"
            : "bg-white text-gray-700 border-gray-300"
        } transition`}
        onClick={() => onCartToggle(game)}
      >
        {inCart ? "Remove" : "Add to Cart"}
      </button>
    </div>
  );
}
