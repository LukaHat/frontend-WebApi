export interface MovieInterface {
  id: number;
  original_language: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
}

export interface MovieDetailInterface {
  id: number;
  img: string;
  title: string;
  release_date: string;
  description: string;
  rating: number;
  popularity: number;
  language: string;
  productionCompanies: string[];
}

export interface GenreInterface {
  id: number;
  name: string;
}
