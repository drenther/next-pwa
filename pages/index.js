import Link from 'next/link';

import { getUpcomingMovies, getImageSrc } from '../utils/apiCalls';

const Home = ({ movies }) => (
  <div className="home">
    {movies.map(({ title, id, poster_path, overview }) => (
      <Link as={`/movie/${id}`} href={`/movie?id=${id}`} key={id}>
        <div className="card" key={id}>
          <div className="card-image">
            <img src={getImageSrc(poster_path, 342)} className="img-responsive" />
          </div>
          <div className="card-header">
            <div className="card-title h5 text-primary text-ellipsis">{title}</div>
          </div>
          <div className="card-body text-ellipsis">{overview}</div>
        </div>
      </Link>
    ))}
  </div>
);

Home.getInitialProps = async () => {
  const res = await getUpcomingMovies();
  if (res.error) return res;

  const movies = res.results.map(({ title, id, poster_path, overview }) => ({
    title,
    poster_path,
    overview,
    id,
  }));

  return { movies };
};

export default Home;
