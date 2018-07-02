import Link from 'next/link';

import { getUpcomingMovies, getImageSrc } from '../utils/apiCalls';

const Home = ({ movies }) => (
  <div className="home">
    {movies.map(({ title, id, poster_path, overview }) => (
      <div className="tile" key={id}>
        <div className="tile-icon">
          <figure className="avatar avatar-xl tooltip" data-tooltip={title}>
            <img src={getImageSrc(poster_path, 92)} alt={title} />
          </figure>
        </div>
        <div className="tile-content">
          <div className="tile-title">{title}</div>
          <div className="tile-subtitle text-gray text-ellipsis">{overview}</div>
        </div>
        <div className="tile-action">
          <Link as={`/movie/${id}`} href={`/movie?id=${id}`}>
            <button className="btn btn-primary">More...</button>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

Home.getInitialProps = async () => {
  const res = await getUpcomingMovies();
  console.log('error here');

  const movies = res.results.map(({ title, id, poster_path, overview }) => ({
    title,
    poster_path,
    overview,
    id,
  }));

  return { movies };
};

export default Home;
