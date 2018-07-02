import React from 'react';
import Link from 'next/link';

import { getMovieDetails, getImageSrc } from '../utils/apiCalls';

const Movie = ({ title, poster_path, rating, overview, genres, cast, budget }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-title h3 text-primary">{title}</div>
      <div className="card-subtitle text-gray">
        Rating - {rating} | Budget - {budget}
      </div>
      <div className="chips">
        {genres.map(({ id, name }) => (
          <div key={id} className="chip">
            {name}
          </div>
        ))}
      </div>
    </div>
    <div className="card-image">
      <img src={getImageSrc(poster_path, 500)} alt={`Poster for ${title}`} className="img-responsive" />
    </div>
    <div className="card-body">
      <div className="card-title h4">Overview</div>
      <div className="card-subtitle">{overview}</div>
      <div className="card-title h4">Cast</div>
      <div className="cast">
        {cast.map(({ credit_id, profile_path, name }) => (
          <figure key={credit_id} className="avatar avatar-xl tooltip" data-tooltip={name}>
            <img src={getImageSrc(profile_path, 92)} alt={name} />
          </figure>
        ))}
      </div>
    </div>
    <div className="card-footer">
      <Link prefetch href="/">
        <button className="btn btn-primary">Back to Home</button>
      </Link>
    </div>
  </div>
);

Movie.getInitialProps = async ({ query: { id } }) => {
  const {
    budget,
    poster_path,
    overview,
    genres,
    credits: { cast },
    vote_average,
    original_title,
  } = await getMovieDetails(id);

  return {
    title: original_title,
    poster_path,
    rating: vote_average,
    overview,
    genres,
    cast: cast.filter((c, i) => i < 3),
    budget,
  };
};

export default Movie;
