interface CardProps {
  imageUrl: string;
  title: string;
  year: string;
  rating: string;
}

export default function Card({ imageUrl, title, year, rating }: CardProps) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 w-32 sm:w-48 md:w-56 lg:w-48 h-full">
      <div className="h-48 sm:h-64 md:h-72 lg:h-64">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="px-2 py-2 sm:px-3 sm:py-3 flex justify-between items-center">
        <div className="flex-1 min-w-0">
          <h2 className="text-md font-semibold text-white sm:text-lg truncate">
            {title}
          </h2>
          <p className="text-xs text-gray-50 sm:text-sm">{year}</p>
        </div>
        <div className="text-sm font-bold text-yellow-400 sm:text-lg ml-2">
          {rating}
        </div>
      </div>
    </div>
  );
}
