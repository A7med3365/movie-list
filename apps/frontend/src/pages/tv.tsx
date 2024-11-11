import { useMemo } from 'react';
import useFetchMedia from '../hooks/useFetchMedia';
import Section from '../components/section';
import Loading from '../components/loading';

const TvPage = () => {
  const urls = useMemo(
    () => [
      'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
      'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
      'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
      'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
    ],
    []
  );

  const { mediaList, loading, error } = useFetchMedia(urls, 'tv');
  const [popularList, airingTodayList, topRatedList, onTheAirList] =
    mediaList || [];

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Section media={popularList} header="Popular Shows" type="tv" />
      <Section media={airingTodayList} header="Airing Today" type="tv" />
      <Section media={topRatedList} header="Top Rated" type="tv" />
      <Section media={onTheAirList} header="On The Air" type="tv" />
    </div>
  );
};

export default TvPage;
