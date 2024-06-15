import { getAll, getById } from "./base";

const getAllMovies = async (page: number) => {
  try {
    const resp = await getAll(
      `/discover/movie?language=en-US&sort_by=popularity.desc&page=${page}`
    );
    const data = resp?.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllMoviesFromGenre = async (genre: number, page: number = 1) => {
  try {
    const resp = await getAll(
      `/discover/movie?language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genre}`
    );
    const data = resp?.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMovieById = async (id: number) => {
  try {
    const resp = await getById("/movie/", id);
    const data = resp?.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllGenres = async () => {
  try {
    const resp = await getAll("/genre/movie/list");
    const data = resp?.data.genres;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllMovies, getMovieById, getAllGenres, getAllMoviesFromGenre };
