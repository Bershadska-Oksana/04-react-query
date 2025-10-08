import styles from "./MovieList.module.css";
import type { Movie } from "../../types/movie";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
