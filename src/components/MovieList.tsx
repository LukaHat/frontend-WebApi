import { useEffect, useState } from "react";
import { getAllGenres, getAllMovies } from "../api/movie";
import { GenreInterface, MovieInterface } from "../types";
import Movie from "./Movie";
import { Link, useNavigate } from "react-router-dom";

import random from "../assets/random.svg";

export const MovieList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [genres, setGenres] = useState<GenreInterface[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number>(0);

  useEffect(() => {
    if (selectedGenre !== 0) {
      const timer = setTimeout(() => {
        navigate(`/movie/${selectedGenre}`);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedGenre, navigate]);

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

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const resp = await getAllGenres();
        console.log(resp);
        setGenres([...resp]);
        return resp;
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenreData();
  }, []);

  return (
    <>
      <div className="movie-list">
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="movie-list-load"
        >
          Load
        </button>
        <button className="movie-list-random">
          <img src={random} alt="random" />
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
        <div className="movie-roulette-modal-container">
          <div className="movie-roulette-modal">
            <h2 className="movie-roulette-title">Movie Roulette</h2>
            <legend>Select genre:</legend>
            {genres.map((genre) => (
              <div key={genre.id}>
                <input
                  type="radio"
                  id={genre.name}
                  name="genre"
                  value={genre.id}
                  className="radio-input"
                  onChange={(e) => {
                    setSelectedGenre(Number(e.target.value));
                  }}
                />
                <label htmlFor={genre.name}>{genre.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
