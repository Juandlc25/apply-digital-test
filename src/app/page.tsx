"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchGames } from "@/services/gameService";
import { addToCart, removeFromCart, isInCart } from "@/services/cartService";
import GameCard from "@/components/GameCard";
import GenreFilter from "@/components/GenreFilter";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Game } from "@/utils/endpoint";

function CatalogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const genre = searchParams.get("genre") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const [_, setCartVersion] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchGames(genre, page)
      .then((data) => {
        setGames(data.games);
        setGenres(data.availableFilters);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setError(error.message || "Failed to load games");
      })
      .finally(() => setLoading(false));
  }, [genre, page]);

  useEffect(() => {
    const sync = () => setCartVersion((v) => v + 1);
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleGenreChange = (newGenre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newGenre) {
      params.set("genre", newGenre);
    } else {
      params.delete("genre");
    }
    params.set("page", "1");
    router.push("?" + params.toString());
  };

  const handleSeeMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(currentPage + 1));
    router.push("?" + params.toString());
  };

  const handleCartToggle = (game: any) => {
    if (isInCart(game.id)) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
    setCartVersion((v) => v + 1);
  };

  return (
    <div>
      <div className="flex flex-col border-b border-gray-200 mb-8 mx-auto px-8 md:px-16 py-10 gap-4">
        <h2 className="text-2xl text-gray-900 font-bold">Top Sellers</h2>
        <GenreFilter
          genres={genres}
          selectedGenre={genre}
          onChange={handleGenreChange}
        />
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <div className="mx-auto px-8 md:px-16">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-neutral-700 text-white px-6 py-2 rounded hover:bg-neutral-800 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game: Game) => (
              <GameCard
                key={game.id}
                game={game}
                inCart={isInCart(game.id)}
                onCartToggle={handleCartToggle}
              />
            ))}
          </div>
          {currentPage < totalPages && games.length === 12 && (
            <div className="flex mt-8">
              <button
                className="bg-neutral-700 w-full md:w-auto text-white px-6 py-2 rounded hover:bg-neutral-800 transition"
                onClick={handleSeeMore}
              >
                See More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <CatalogPageContent />
    </Suspense>
  );
}
