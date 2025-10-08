import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_KEY = "Y374cc60661f442e0205aec739b89ac8f";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
      language: "en-US",
      include_adult: false,
    },
  });
  return data;
};
