import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { fetchMovies } from "../../services/movieService";
import styles from "./App.module.css";
import type { Movie } from "../../types/movie";
import type { FetchMoviesResponse } from "../../services/movieService";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    keepPreviousData: true,
  });

  const onSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Movie Search</h1>

      <SearchBar onSearch={onSearch} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage message="Error fetching movies" />}

      {!isLoading && data && data.results.length === 0 && (
        <ErrorMessage message="No movies found" />
      )}

      {data && data.results.length > 0 && (
        <>
          <ReactPaginate
            breakLabel="..."
            nextLabel="→"
            previousLabel="←"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={Math.min(data.total_pages, 500)}
            forcePage={page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
          />

          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />

          {data.total_pages > 1 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="→"
              previousLabel="←"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              pageCount={Math.min(data.total_pages, 500)}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default App;
