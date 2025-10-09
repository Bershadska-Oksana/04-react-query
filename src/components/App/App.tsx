import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/movieService";
import MovieList from "../MovieList/MovieList";
import styles from "./App.module.css";
import type { Movie } from "../../types/movie";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(query, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    };
    getMovies();
  }, [query, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <MovieList movies={movies} />

      {movies.length > 0 && (
        <div className={styles.pagination}>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`${styles.pageBtn} ${
                page === i + 1 ? styles.activePage : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
