import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import { searchMovies } from "../services/tmdb";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      search();
    }
  }, [query]);

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <h1>Search Results for "{query}"</h1>
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found for your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
