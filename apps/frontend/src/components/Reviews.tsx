import { StarIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

interface ClassNamesProps {
  classes: (string | boolean | undefined | null)[];
}

function classNames(...classes: ClassNamesProps['classes']): string {
  return classes.filter(Boolean).join(' ');
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

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-32">
      {reviews.map((review) => (
        <div key={review.id} className="py-12 border-b border-gray-200">
          <div className="flex items-center">
            {review.author_details.avatar_path ? (
              <img
                alt={`${review.author}`}
                src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <span className="h-12 w-12 rounded-full bg-indigo-600 px-5 py-3 text-base font-bold text-white hover:bg-indigo-700 flex items-center justify-center">
                {review.author.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="ml-4">
              <h4 className="text-sm font-bold text-gray-100">
                {review.author}
              </h4>
              <div className="mt-1 flex items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      (review.author_details.rating || 0) > rating
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                      'h-5 w-5 shrink-0'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'mt-4 space-y-6 text-base italic text-gray-300 overflow-hidden transition-all duration-300',
              expandedReview === review.id ? 'max-h-full' : 'max-h-24'
            )}
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
          <button
            onClick={() => toggleExpand(review.id)}
            className="mt-2 text-indigo-600 hover:text-indigo-900"
          >
            {expandedReview === review.id ? 'Show Less' : 'Read More'}
          </button>
        </div>
      ))}
    </div>
  );
}