import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getMovieDetails } from "../services/tmdb";
import Spinner from "../components/Spinner";

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, loading, error } = useFetch(getMovieDetails, id);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getRatingColor = (voteAverage) => {
    if (voteAverage >= 7) return "rating-high";
    if (voteAverage >= 5) return "rating-mid";
    return "rating-low";
  };

  if (loading) return <Spinner />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!movie) return <div className="error-message">No movie found</div>;

  return (
    <div className="movie-details">
      <div className="container">
        <div className="details-container">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.jpg"
            }
            alt={movie.title}
          />
          <div className="details-content">
            <h1>{movie.title}</h1>
            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}

            <div className="meta-grid">
              <div className="meta-item">
                <div className="meta-label">Rating</div>
                <div
                  className={`meta-value ${getRatingColor(movie.vote_average)}`}
                >
                  {movie.vote_average.toFixed(1)}/10
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Release Date</div>
                <div className="meta-value">{movie.release_date}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Runtime</div>
                <div className="meta-value">{formatRuntime(movie.runtime)}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Status</div>
                <div className="meta-value">{movie.status}</div>
              </div>
            </div>

            <div className="genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-badge">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="official-site-btn"
              >
                Visit Official Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
