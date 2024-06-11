import { getAll } from "./base";

const BASE_URL = "/discover/movie?language=en-US&sort_by=popularity.desc";

const getAllMovies = async (page: number) => {
  try {
    const resp = await getAll(`${BASE_URL}&page=${page}`);
    const data = resp?.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllMovies };
