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

export { getAllMovies, getMovieById };
