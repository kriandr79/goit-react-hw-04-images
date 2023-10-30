import axios from "axios";

const API_KEY = '38931219-81f95ff04be64d9b8b5d6502d';

export default async function getImages(query, page) {
  return axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
