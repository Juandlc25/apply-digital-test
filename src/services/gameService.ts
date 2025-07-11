import { config } from "@/config/environment";

export interface GamesResponse {
  games: any[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export async function fetchGames(
  genre?: string,
  page: number = 1
): Promise<GamesResponse> {
  try {
    const params = new URLSearchParams();
    if (genre) params.append("genre", genre);
    params.append("page", String(page));

    const res = await fetch(
      `${config.apiBaseUrl}/api/games?${params.toString()}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch games: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Failed to fetch games. Please try again later.");
  }
}
