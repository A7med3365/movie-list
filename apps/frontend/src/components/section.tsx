import React from 'react';
import Card from './card';
import { Heading } from './catalyst-ui-kit/heading';
import { Button } from './catalyst-ui-kit/button';

interface Movie {
  imageUrl: string;
  title: string;
  year: string;
  rating: string;
}

interface SectionProps {
  movies: Movie[];
  header: string;
}

export default function Section({ movies, header }: SectionProps) {
  return (
    <div className='pb-5'>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>{header}</Heading>
        <div className="flex gap-4">
          <Button outline>Show More</Button>
        </div>
      </div>
      <div className="overflow-x-auto whitespace-nowrap mt-4 pb-8">
        <div className="inline-flex space-x-4">
          {movies.map((movie, index) => (
            <Card
              key={index}
              imageUrl={movie.imageUrl}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
