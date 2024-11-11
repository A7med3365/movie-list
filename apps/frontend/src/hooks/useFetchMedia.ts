import { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiItem {
  id: number;
  title?: string;         // For movies
  name?: string;          // For TV shows
  poster_path: string;
  release_date?: string;   // For movies
  first_air_date?: string; // For TV shows
  vote_average: number;
}

interface MediaItem {
id: number;
  imageUrl: string;
  title: string;
  year: string;
  rating: string;
}

interface Error {
  message: string;
}

const useFetchMedia = (
  urls: string[],
  mediaType: 'movie' | 'tv',
  shouldShuffle = true
) => {
  const [mediaList, setMediaList] = useState<MediaItem[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };

    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const fetchDataWithDelay = async () => {
      const results: MediaItem[][] = [];
      for (let i = 0; i < urls.length; i++) {
        try {
          const response = await axios.get(urls[i], options);
          const apiItems: ApiItem[] = response.data.results;
          const transformedItems: MediaItem[] = apiItems.map((item) => ({
            id: item.id,
            imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            title:
              mediaType === 'movie' ? item.title || 'Untitled' : item.name || 'Untitled',
            year:
              mediaType === 'movie'
                ? (item.release_date || '').split('-')[0]
                : (item.first_air_date || '').split('-')[0],
            rating: item.vote_average.toString(),
          }));
          if (shouldShuffle) {
            shuffleArray(transformedItems);
          }
          results.push(transformedItems);
          if (i < urls.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        } catch (error) {
          setError({ message: (error as any).message });
          setLoading(false);
          return;
        }
      }
      setMediaList(results);
      setLoading(false);
    };

    fetchDataWithDelay();
  }, [urls, mediaType, shouldShuffle]);

  return { mediaList, loading, error };
};

export default useFetchMedia;
