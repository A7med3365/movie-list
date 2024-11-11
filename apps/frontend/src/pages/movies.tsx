import { useMemo } from 'react';
import useFetchMedia from '../hooks/useFetchMedia';
import Section from '../components/section';
import Loading from '../components/loading';

const MoviesPage = () => {
  const urls = useMemo(
    () => [
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    ],
    []
  );

  const { mediaList, loading, error } = useFetchMedia(urls, 'movie');
  const [popularList, nowPlayingList, topRatedList, upcomingList] =
    mediaList || [];

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Section media={nowPlayingList} header="Now Playing" type="movie" />
      <Section media={upcomingList} header="Upcoming Movies" type="movie" />
      <Section media={topRatedList} header="Top Rated" type="movie" />
      <Section media={popularList} header="Popular Movies" type="movie" />
    </div>
  );
};

export default MoviesPage;
