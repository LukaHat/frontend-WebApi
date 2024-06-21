import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getAccountMovieDetails, addRating } from "../api/movie";
import { MovieDetailInterface } from "../types";
import Skeleton from "./Skeleton";
import { Rating, Star } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [movieDetail, setMovieDetail] = useState<MovieDetailInterface | null>(
    null
  );
  const [releaseYear, setReleaseYear] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);
  const [isRated, setIsRated] = useState<boolean>(false);

  const ratingStyle = {
    itemShapes: Star,
    activeFillColor: "#ebc934",
    inactiveFillColor: "#000",
  };

  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        setIsLoading(true);
        const resp = await getMovieById(id);
        const resp1 = await getAccountMovieDetails(id);
        if (resp1.rated !== false) {
          setIsRated(true);
          setRating(resp1.rated.value);
        } else {
          setIsRated(false);
        }
        if (resp) {
          console.log(resp);
          console.log(resp1);
          setMovieDetail({
            id: resp.id,
            img: resp.backdrop_path,
            title: resp.title,
            release_date: resp.release_date,
            description: resp.overview,
            rating: resp.vote_average,
            popularity: resp.popularity,
            language: resp.original_language,
            productionCompanies: resp.production_companies
              ? resp.production_companies.map(
                  (company: { name: string }) => company.name
                )
              : [],
          });
          getYearFromDate(resp.release_date);
        }
        setIsLoading(false);
        return resp;
      } catch (error) {
        console.log(error);
      }
    };

    const getYearFromDate = (release_date: string) => {
      setReleaseYear(Number(release_date.slice(0, 4)));
      console.log(releaseYear);
    };

    fetchData(Number(id));
  }, [id, releaseYear]);

  const handleRating = async (rating: number) => {
    try {
      const resp = await addRating(Number(id), String(rating));
      const resp1 = await getAccountMovieDetails(Number(id));
      console.log(resp);
      console.log(resp1);
      setRating(resp1.rated.value);
      console.log(rating);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton type="movie-detail" />
      ) : (
        <div className="movie-detail">
          <h2 className="movie-detail-title">
            {movieDetail?.title} ({releaseYear})
          </h2>
          <div className="movie-detail-img-container">
            <img
              src={
                movieDetail?.img
                  ? `https://image.tmdb.org/t/p/original/${movieDetail?.img}`
                  : "https://placehold.co/1300x750?text=Movie+image+not+found"
              }
              className="movie-detail-img"
            />
            <p className="movie-detail-description">
              {movieDetail?.description}
            </p>
          </div>
          <div className="movie-detail-more-info">
            <p className="movie-detail-rating">
              <span className="bold">Rating:</span>{" "}
              {movieDetail?.rating.toFixed(1)}
            </p>
            <p className="movie-detail-popularity">
              <span className="bold">Popularity:</span>{" "}
              {movieDetail?.popularity}
            </p>
            <p className="movie-detail-language">
              <span className="bold">Language:</span> {movieDetail?.language}
            </p>
            <p className="movie-detail-prod-comp">
              <span className="bold">Production companies:</span>{" "}
              {movieDetail?.productionCompanies?.join(", ")}
            </p>
          </div>
          <div className="movie-detail-rating">
            {isRated ? (
              <Rating
                readOnly
                value={rating}
                items={10}
                itemStyles={ratingStyle}
              />
            ) : (
              <Rating
                value={rating}
                onChange={handleRating}
                items={10}
                itemStyles={ratingStyle}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
