import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import MovieList from "../MovieList/MovieList";
import styles from "./App.module.css";
import type { Movie } from "../../types/movie";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const data = await fetchMovies(query, 1);
    setMovies(data.results);
    setPage(1);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage === page) return;
    setLoading(true);
    const data = await fetchMovies(query, newPage);
    setMovies(data.results);
    setPage(newPage);
    setLoading(false);
  };

  const renderPagination = () => {
    const pages = Array.from(
      { length: Math.min(totalPages, 10) },
      (_, i) => i + 1
    );

    return (
      <div className={styles.pagination}>
        {pages.map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`${styles.pageButton} ${
              page === num ? styles.active : ""
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Movie Search</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {movies.length > 0 && renderPagination()} <MovieList movies={movies} />
      {movies.length > 0 && renderPagination()}{" "}
    </div>
  );
};

export default App;
