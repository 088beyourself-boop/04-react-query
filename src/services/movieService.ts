import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';

export async function fetchMovies(
  query: string,
  page: number,
): Promise<MoviesResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error('VITE_TMDB_TOKEN is not configured');
  }

  const response = await axios.get<MoviesResponse>(TMDB_SEARCH_URL, {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
