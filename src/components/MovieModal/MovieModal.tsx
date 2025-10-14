import type { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: Props) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
        <p>⭐ {movie.vote_average}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MovieModal;
