import { useParams, useLocation } from 'react-router-dom';
import Reviews from '../components/Reviews';
import Overview from '../components/overview';
import useFetchMediaById from '../hooks/useFetchMediaById';
import Section from '../components/section';
import Loading from '../components/loading';

type MediaType = 'movie' | 'tv';

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get('type') || 'movie';
  const type: MediaType =
    typeParam === 'movie' || typeParam === 'tv' ? typeParam : 'movie';

  const { details, reviews, similar, recommendations, loading, error } =
    useFetchMediaById(Number(id), type);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {details && <Overview media={details} />}
      <Section
        header="Recommendations"
        media={recommendations}
        type={typeParam}
      />
      <Section header="Similar" media={similar} type={typeParam} />
      <Reviews reviews={reviews} />
    </div>
  );
}
