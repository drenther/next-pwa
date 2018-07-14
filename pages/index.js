import Head from 'next/head';

import Movie from '../components/Movie';
import Oops from '../components/Oops';

import { getUpcomingMovies } from '../utils/apiCalls';

const Home = ({ movies, error }) => (
  <div className="home">
    <Head>
      <title>Index | Movies PWA</title>
    </Head>
    {error ? <Oops /> : movies.map(props => <Movie {...props} key={props.id} />)}
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
