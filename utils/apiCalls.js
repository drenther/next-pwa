import 'isomorphic-unfetch';

import { API_KEY } from './config';

const BASE_URI = 'https://api.themoviedb.org/3/movie';
const IMAGE_BASE_URI = 'https://image.tmdb.org/t/p';

const fetchWithErrorHandling = async url => {
  try {
    return await (await fetch(url)).json();
  } catch (err) {
    return { error: true };
  }
};

export const getMovieDetails = async id =>
  fetchWithErrorHandling(
    `${BASE_URI}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
  );

export const getUpcomingMovies = async () =>
  fetchWithErrorHandling(
    `${BASE_URI}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  );

export const getImageSrc = (path, size) =>
  `${IMAGE_BASE_URI}/${size ? `w${size}` : 'original'}${path}`;
