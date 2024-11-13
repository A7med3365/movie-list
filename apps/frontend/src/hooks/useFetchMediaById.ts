import { useEffect, useState } from 'react';
import axios from 'axios';

export interface MediaDetails {
  title: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  poster_path: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  popularity: number;
  production_companies: { id: number; logo_path: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  video: boolean;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[]; // Changed from number[] | undefined to number[]
  first_air_date: string; // Changed from string | undefined to string
  in_production: boolean;
  languages: string[];
  last_air_date?: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name?: string;
  next_episode_to_air: any;
  networks?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  original_name?: string;
  seasons?: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  type?: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  author_details: {
    avatar_path: string | null;
    rating: number | null;
  };
}

export interface MediaItem {
  id: number;
  imageUrl: string;
  title: string;
  year: string;
  rating: string;
  type?: string;
}

interface Error {
  message: string;
}

const useFetchMediaById = (id: number, mediaType: 'movie' | 'tv') => {
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<MediaItem[]>([]);
  const [similar, setSimilar] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };

    const fetchData = async () => {
      try {
        const [
          detailsResponse,
          reviewsResponse,
          recommendationsResponse,
          similarResponse,
        ] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}`, options),
          axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${id}/reviews`,
            options
          ),
          axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`,
            options
          ),
          axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${id}/similar`,
            options
          ),
        ]);

        setDetails(detailsResponse.data);
        setReviews(reviewsResponse.data.results);

        const transformItem = (item: any): MediaItem => ({
          id: item.id,
          imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          title:
            mediaType === 'movie'
              ? item.title || 'Untitled'
              : item.name || 'Untitled',
          year:
            mediaType === 'movie'
              ? (item.release_date || '').split('-')[0]
              : (item.first_air_date || '').split('-')[0],
          rating: item.vote_average.toString(),
        });

        setRecommendations(
          recommendationsResponse.data.results.map(transformItem)
        );
        setSimilar(similarResponse.data.results.map(transformItem));
        setLoading(false);
      } catch (error) {
        setError({ message: (error as any).message });
        setLoading(false);
      }
    };

    fetchData();
  }, [id, mediaType]);

  return { details, reviews, recommendations, similar, loading, error };
};

export default useFetchMediaById;
