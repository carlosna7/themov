const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const imageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export async function tmdb(path, params = {}) {
  if (!API_KEY) throw new Error("Defina NEXT_PUBLIC_TMDB_API_KEY no .env.local");

  const qs = new URLSearchParams({ api_key: API_KEY, language: "pt-BR", ...params });
  const response = await fetch(`${BASE_URL}${path}?${qs}`);

  if (!response.ok) throw new Error(`TMDB respondeu ${response.status}`);

  return response.json();
}
