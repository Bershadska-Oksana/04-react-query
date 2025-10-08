import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import MovieList from "../MovieList/MovieList";
import styles from "./App.module.css";
import type { MovieResponse } from "../../types/movie";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const data = await fetchMovies(query, 1);
    setMovies(data.results);
    setPage(1);
    setTotalPages(data.total_pages);
  };

  const loadMore = async () => {
    if (page >= totalPages) return;
    const nextPage = page + 1;
    const data = await fetchMovies(query, nextPage);
    setMovies((prev) => [...prev, ...data.results]);
    setPage(nextPage);
  };

  return (
    <div className={styles.container}>
      <h1>🎬 Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />

      {movies.length > 0 && page < totalPages && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default App;
