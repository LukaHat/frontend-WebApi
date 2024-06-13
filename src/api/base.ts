import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY: string = import.meta.env.VITE_MOVIE_API_KEY;
const config = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const getAll = async (url: string) => {
  try {
    const resp = await axios.get(`${BASE_URL}${url}`, config);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (url: string, id: number) => {
  try {
    const resp = await axios.get(`${BASE_URL}${url}/${id}`, config);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export { getAll, getById };
