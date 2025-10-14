import { FC } from "react";
import styles from "./MovieList.module.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieCard}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className={styles.poster}
          />
          <h3 className={styles.title}>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
