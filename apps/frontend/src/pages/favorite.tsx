import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Section from '../components/section';
import { PlusIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';

const FavoritePage = () => {
  const { currentUser } = useContext(AuthContext);
  const favorites = currentUser?.favorites || [];
  const nav = useNavigate();

  const movies = favorites.filter((item) => item.type === 'movie');
  const tvShows = favorites.filter((item) => item.type === 'tv');

  console.log({ movies, tvShows });

  return (
    <div>
      {movies.length !== 0 && (
        <Section header="Movies" media={movies} type="movie" />
      )}
      {tvShows.length !== 0 && (
        <Section header="TV Shows" media={tvShows} type="tv" />
      )}
      {movies.length === 0 && tvShows.length === 0 && (
        <div className="text-center mt-40">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mx-auto size-12 text-gray-400"
          >
            <path
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-white">
            No Favorites
          </h3>
          <p className="mt-1 text-sm text-gray-300">
            Explore Content to Add Movies and Tv shows.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => nav('/')}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Explore
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
