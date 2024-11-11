import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './card';
import { Heading } from './catalyst-ui-kit/heading';
import { Button } from './catalyst-ui-kit/button';
import { MediaItem } from '../hooks/useFetchMediaById';

interface SectionProps {
  media: MediaItem[];
  header: string;
  type: string;
}

export default function Section({ media, header, type }: SectionProps) {
  const navigate = useNavigate();

  const handleCardClick = (id: number, type: string) => {
    navigate(`/details/${id}?type=${type}`);
  };

  return (
    <div className="pb-5">
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>{header}</Heading>
        <div className="flex gap-4">
          <Button outline>Show More</Button>
        </div>
      </div>
      <div className="overflow-x-auto whitespace-nowrap mt-4 pb-8">
        <div className="inline-flex space-x-4">
          {media.map((item, index) => (
            <Card
              id={item.id}
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              year={item.year}
              rating={item.rating}
              onClick={() => handleCardClick(item.id, type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
