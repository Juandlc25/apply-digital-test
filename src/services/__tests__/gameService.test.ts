import { fetchGames } from "../gameService";

// Mock fetch globally
global.fetch = jest.fn();

describe("gameService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches games successfully", async () => {
    const mockResponse = {
      games: [],
      availableFilters: [],
      totalPages: 1,
      currentPage: 1,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGames();
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/games?page=1"
    );
  });

  it("fetches games with genre filter", async () => {
    const mockResponse = {
      games: [],
      availableFilters: [],
      totalPages: 1,
      currentPage: 1,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGames("Action", 2);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/games?genre=Action&page=2"
    );
  });

  it("throws error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchGames()).rejects.toThrow("Failed to fetch games");
  });
});
