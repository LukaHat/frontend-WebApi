import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movie";
import { MovieDetailInterface } from "../types";
import Skeleton from "./Skeleton";

const MovieDetail = () => {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState<MovieDetailInterface | null>(
    null
  );
  const [releaseYear, setReleaseYear] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        setIsLoading(true);
        const resp = await getMovieById(id);
        if (resp) {
          console.log(resp);
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
        </div>
      )}
    </>
  );
};

export default MovieDetail;
