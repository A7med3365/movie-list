import { useMemo } from 'react';
import useFetchMedia from '../hooks/useFetchMedia';
import Section from '../components/section';
import Loading from '../components/loading';

const Home = () => {
  const movieUrls = useMemo(
    () => [
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    ],
    []
  );

  const tvUrls = useMemo(
    () => [
      'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
      'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
    ],
    []
  );

  const {
    mediaList: movieList,
    loading: movieLoading,
    error: movieError,
  } = useFetchMedia(movieUrls, 'movie', false);

  const {
    mediaList: tvList,
    loading: tvLoading,
    error: tvError,
  } = useFetchMedia(tvUrls, 'tv', false);

  if (movieLoading || tvLoading) return <Loading />;
  if (movieError) return <div>Error: {movieError.message}</div>;
  if (tvError) return <div>Error: {tvError.message}</div>;

  const [popularMovies, nowPlayingMovies] = movieList || [];
  const [popularShows, topRatedShows] = tvList || [];

  return (
    <div>
      <Section media={popularMovies} header="Popular Movies" type="movie" />
      <Section media={popularShows} header="Popular TV Shows" type="tv" />
      <Section media={nowPlayingMovies} header="Now Playing" type="movie" />
      <Section media={topRatedShows} header="Top Rated TV Shows" type="tv" />
    </div>
  );
};

export default Home;
