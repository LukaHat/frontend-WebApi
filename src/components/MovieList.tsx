import React, { useEffect, useState } from "react";
import {
  getAllGenres,
  getAllMovies,
  getAllMoviesFromGenre,
} from "../api/movie";
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedGenre !== 0) {
      const fetchMovieGenre = async () => {
        try {
          const randomPage: number = Math.floor(Math.random() * 500) + 1;
          const randomMovies = await getAllMoviesFromGenre(
            selectedGenre,
            randomPage
          );
          const randomMoviesArray: MovieInterface[] = randomMovies.results;
          const randomMoviePage: number = Math.floor(Math.random() * 20) + 1;
          const randomId: number = randomMoviesArray[randomMoviePage].id;
          navigate(`/movie/${randomId}`);
        } catch (error) {
          console.log(error);
        }
      };
      fetchMovieGenre();
    }
  }, [navigate, selectedGenre]);

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <>
      <div className="movie-list">
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="movie-list-load"
        >
          Load
        </button>
        <button
          className="movie-list-random"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
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
        {isModalOpen && (
          <div
            className="movie-roulette-modal-container"
            onClick={handleContainerClick}
          >
            <div className="movie-roulette-modal">
              <div className="movie-roulette-header">
                <h2 className="movie-roulette-title">Movie Roulette</h2>
                <button
                  className="movie-roulette-close"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  &times;
                </button>
              </div>
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
        )}
      </div>
    </>
  );
};
