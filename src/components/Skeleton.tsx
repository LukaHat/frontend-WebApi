import placeholder from "../assets/placeholder.png";

interface SkeletonProps {
  type: string;
  count?: number;
}

const Skeleton = ({ type, count }: SkeletonProps) => {
  const renderSkeletonItems = () => {
    switch (type) {
      case "movie-list":
        return Array.from({ length: Number(count) }).map((_, index) => (
          <div className="movie skeleton" key={index}>
            <div className="movie-link skeleton">
              <div className="movie-img-container skeleton">
                <div className="movie-rating skeleton">&nbsp;</div>
                <img
                  className="movie-image skeleton"
                  src={placeholder}
                  alt="placeholder"
                />
              </div>
              <div className="movie-title skeleton">&nbsp;</div>
              <div className="movie-language skeleton">&nbsp;</div>
            </div>
          </div>
        ));
      case "movie-detail":
        return (
          <div className="movie-detail skeleton">
            <h2 className="movie-detail-title skeleton">&nbsp;</h2>
            <div className="movie-detail-img-container skeleton">
              <img
                src={placeholder}
                className="movie-detail-img skeleton"
                alt="placeholder"
              />
              <p className="movie-detail-description skeleton">&nbsp;</p>
            </div>
            <div className="movie-detail-more-info skeleton">
              <p className="movie-detail-rating skeleton">&nbsp;</p>
              <p className="movie-detail-popularity skeleton">&nbsp;</p>
              <p className="movie-detail-language skeleton">&nbsp;</p>
              <p className="movie-detail-prod-comp skeleton">&nbsp;</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderSkeletonItems()}</>;
};

export default Skeleton;
