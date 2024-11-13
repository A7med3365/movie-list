import { StarIcon } from '@heroicons/react/20/solid';
import { Movie, TVShow } from '../types';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '../components/catalyst-ui-kit/description-list';
import { languages } from '../utils/languages';
import useRequest from '../hooks/useRequest';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from 'react-loading';

interface OverviewProps {
  media: Movie | TVShow;
}

function classNames(
  ...classes: Array<string | boolean | undefined | null>
): string {
  return classes.filter(Boolean).join(' ');
}

function isMovie(media: Movie | TVShow): media is Movie {
  return (media as Movie).title !== undefined;
}

export default function Overview({ media }: OverviewProps) {
  const [isInFavorites, setIsInFavorites] = useState(false);
  const { currentUser, isSignedIn } = useContext(AuthContext);

  const { doRequest: isMediaInFavorites } = useRequest({
    url: `/api/users/${currentUser?.id}/favorites/${media.id}`,
    method: 'get',
    onSuccess: (res) => {
      setIsInFavorites(res.data.result);
    },
    loading: false,
  });

  const { doRequest: addToFavorites, isLoading: addingLoading } = useRequest({
    url: `/api/users/${currentUser?.id}/favorites`,
    method: 'post',
    body: {
      id: media.id,
      title: isMovie(media) ? media.title : media.name,
      imageUrl: media.poster_path,
      year: isMovie(media) ? media.release_date : media.first_air_date,
      rating: media.vote_average,
      type: isMovie(media) ? 'movie' : 'tv',
    },
    onSuccess: () => {
      setIsInFavorites(true);
    },
    loading: false,
  });

  const { doRequest: removeFromFavorites, isLoading: removingLoading } =
    useRequest({
      url: `/api/users/${currentUser?.id}/favorites/${media.id}`,
      method: 'delete',
      onSuccess: () => {
        setIsInFavorites(false);
      },
      loading: false,
    });

  useEffect(() => {
    console.log({ isSignedIn });
    if (currentUser) {
      isMediaInFavorites();
    }
  }, [currentUser]);
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pb-24 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl mb-3 font-bold tracking-tight text-gray-50 sm:text-4xl">
              {isMovie(media) ? media.title : media.name}
            </h1>
          </div>
          <div className="flex items-center">
            <p className="text-lg text-gray-50 sm:text-xl">
              {media.vote_average.toFixed(1)}
            </p>

            <div className="ml-4 border-l border-gray-300 pl-4">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          media.vote_average > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                          'h-5 w-5 shrink-0'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {media.vote_count} reviews
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-300">{media.overview}</p>
          </div>
        </div>

        {/* Poster Image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              alt={isMovie(media) ? media.title : media.name}
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start ">
          <div className="sm:flex sm:justify-between">
            <DescriptionList className="w-full">
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>{media.status}</DescriptionDetails>

              <DescriptionTerm>Original Language</DescriptionTerm>
              <DescriptionDetails>
                {languages[media.original_language] || media.original_language}
              </DescriptionDetails>

              <DescriptionTerm>Genre</DescriptionTerm>
              <DescriptionDetails>
                {media.genres.map((genre) => genre.name).join(', ')}
              </DescriptionDetails>

              <DescriptionTerm>
                {isMovie(media) ? 'Release Date' : 'First Air Date'}
              </DescriptionTerm>
              <DescriptionDetails>
                {isMovie(media) ? media.release_date : media.first_air_date}
              </DescriptionDetails>

              {isMovie(media) && (
                <>
                  <DescriptionTerm>Budget</DescriptionTerm>
                  <DescriptionDetails>
                    {media.budget.toLocaleString()} USD
                  </DescriptionDetails>

                  <DescriptionTerm>Revenue</DescriptionTerm>
                  <DescriptionDetails>
                    {media.revenue.toLocaleString()} USD
                  </DescriptionDetails>
                </>
              )}

              {!isMovie(media) && (
                <>
                  <DescriptionTerm>Number of Seasons</DescriptionTerm>
                  <DescriptionDetails>
                    {media.number_of_seasons}
                  </DescriptionDetails>

                  <DescriptionTerm>Number of Episodes</DescriptionTerm>
                  <DescriptionDetails>
                    {media.number_of_episodes}
                  </DescriptionDetails>
                </>
              )}
            </DescriptionList>
          </div>
          <div className="mt-10">
            <button
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isSignedIn || addingLoading || removingLoading}
              onClick={() => {
                if (isInFavorites) {
                  removeFromFavorites();
                } else {
                  addToFavorites();
                }
              }}
            >
              {addingLoading || removingLoading ? (
                <Loading type="spin" color="white" height={20} width={20} />
              ) : isInFavorites ? (
                'Remove from Favorites'
              ) : (
                'Add to Favorites'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
