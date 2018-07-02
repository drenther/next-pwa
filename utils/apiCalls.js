import 'isomorphic-unfetch';

import { API_KEY, BASE_URI, IMAGE_BASE_URI } from './config';

export const getMovieDetails = async id =>
  await (await fetch(`${BASE_URI}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)).json();

export const getUpcomingMovies = async () =>
  await (await fetch(`${BASE_URI}/upcoming?api_key=${API_KEY}&language=en-US&page=1`)).json();

export const getImageSrc = (path, size) => `${IMAGE_BASE_URI}/${size ? `w${size}` : 'original'}/${path}`;
