import axios from "axios";

const API_KEY = '38931219-81f95ff04be64d9b8b5d6502d';

export default function getImages(nextSearchWord, nextPage) {
  return axios.get(
    `https://pixabay.com/api/?q=${nextSearchWord}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
