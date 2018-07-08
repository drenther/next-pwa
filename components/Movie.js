import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import { getImageSrc } from '../utils/apiCalls';

class Movie extends Component {
  prefetchMoviePage = () => {
    Router.prefetch(`/movie?id=${this.props.id}`);
  };

  render() {
    const { id, poster_path, title, overview } = this.props;
    return (
      <Link as={`/movie/${id}`} href={`/movie?id=${id}`}>
        <div className="card" id={`movie-${id}`} onMouseEnter={this.prefetchMoviePage}>
          <div className="card-image">
            <img src={getImageSrc(poster_path, 342)} className="img-responsive" />
          </div>
          <div className="card-header">
            <div className="card-title h5 text-primary text-ellipsis">{title}</div>
          </div>
          <div className="card-body text-ellipsis">{overview}</div>
        </div>
      </Link>
    );
  }
}

export default Movie;
