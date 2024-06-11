import { useEffect, useState } from "react";

const Movie = ({
  title,
  language,
  vote_avg,
  img,
  release_date,
}: {
  title: string;
  language: string;
  vote_avg: number;
  img: string;
  release_date: string;
}) => {
  const [releaseYear, setReleaseYear] = useState<number>(0);

  const getYearFromDate = (release_date: string) => {
    setReleaseYear(Number(release_date.slice(0, 4)));
    console.log(releaseYear);
  };

  useEffect(() => {
    getYearFromDate(release_date);
  }, [release_date]);

  return (
    <div className="movie-link">
      <div className="movie-img-container">
        <span className="movie-rating">{vote_avg.toFixed(1)}</span>
        <img src={img} alt={title} className="movie-image" />
      </div>
      <h3 className="movie-title">
        {title} ({releaseYear})
      </h3>
      <p className="movie-language">Language: {language}</p>
    </div>
  );
};

export default Movie;
