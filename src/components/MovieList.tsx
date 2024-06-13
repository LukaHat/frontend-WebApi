import { useEffect, useState } from "react";
import { getAllMovies } from "../api/movie";
import { MovieInterface } from "../types";
import Movie from "./Movie";
import { Link } from "react-router-dom";

export const MovieList = () => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MovieInterface[]>([]);

  useEffect(() => {
    const fetchMovieData = async (page: number) => {
      try {
        const resp = await getAllMovies(page);
        console.log(resp);
        setMovies((prevMovies) => [...prevMovies, ...resp.results]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieData(page);
  }, [page]);

  return (
    <div className="movie-list">
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className="movie-list-load"
      >
        Load
      </button>
      <div className="movie-list-movies">
        {movies.map((movie) => (
          <Link to={`movie/${movie.id}`} key={movie.id} className="movie">
            <Movie
              title={movie.title}
              language={movie.original_language}
              vote_avg={movie.vote_average}
              img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              release_date={movie.release_date}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
