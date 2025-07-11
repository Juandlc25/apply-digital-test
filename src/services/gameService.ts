export async function fetchGames(genre?: string, page: number = 1) {
  const params = new URLSearchParams();
  if (genre) params.append("genre", genre);
  params.append("page", String(page));

  const res = await fetch(`/api/games?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}
