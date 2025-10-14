import type { Movie } from "../../types/movie";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: Props) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => onSelect(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
