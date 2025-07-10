import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Rating = ({ value, onChange, readonly = false, size = 'md' }: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const starSize = sizeStyles[size];
  
  const handleMouseOver = (rating: number) => {
    if (readonly) return;
    setHoverValue(rating);
  };
  
  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverValue(null);
  };
  
  const handleClick = (rating: number) => {
    if (readonly || !onChange) return;
    onChange(rating);
  };
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={`p-1 focus:outline-none ${!readonly ? 'cursor-pointer' : 'cursor-default'}`}
          onMouseOver={() => handleMouseOver(rating)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(rating)}
          disabled={readonly}
          aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
        >
          <Star
            className={`${starSize} ${
              (hoverValue !== null ? rating <= hoverValue : rating <= value)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            } transition-colors duration-150`}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;