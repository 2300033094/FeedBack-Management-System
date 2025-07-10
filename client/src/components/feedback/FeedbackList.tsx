import { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import FeedbackItem from './FeedbackItem';
import Button from '../common/Button';
import { useFeedback } from '../../context/FeedbackContext';
import { Feedback, FilterOptions } from '../../types';

const FeedbackList = () => {
  const { feedbacks, categories } = useFeedback();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    category: [],
    rating: [],
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const handleToggleFilter = (type: 'status' | 'category', value: string) => {
    setFilters((prev) => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return { ...prev, [type]: current };
    });
  };

  const handleToggleRating = (rating: number) => {
    setFilters((prev) => {
      const current = [...prev.rating];
      const index = current.indexOf(rating);
      
      if (index === -1) {
        current.push(rating);
      } else {
        current.splice(index, 1);
      }
      
      return { ...prev, rating: current };
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'date-asc' || value === 'date-desc') {
      setFilters({
        ...filters,
        sortBy: 'date',
        sortOrder: value.endsWith('-asc') ? 'asc' : 'desc',
      });
    } else if (value === 'rating-asc' || value === 'rating-desc') {
      setFilters({
        ...filters,
        sortBy: 'rating',
        sortOrder: value.endsWith('-asc') ? 'asc' : 'desc',
      });
    }
  };

  const filteredFeedbacks = useMemo(() => {
    let result = [...feedbacks];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowercasedTerm) ||
          item.description.toLowerCase().includes(lowercasedTerm) ||
          item.email.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter((item) => filters.status.includes(item.status));
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter((item) => filters.category.includes(item.category));
    }
    
    // Apply rating filter
    if (filters.rating.length > 0) {
      result = result.filter((item) => filters.rating.includes(item.rating));
    }
    
    // Apply sort
    result.sort((a: Feedback, b: Feedback) => {
      const sortBy = filters.sortBy;
      const sortOrder = filters.sortOrder;
      
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'rating') {
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
      
      return 0;
    });
    
    return result;
  }, [feedbacks, searchTerm, filters]);

  const resetFilters = () => {
    setFilters({
      status: [],
      category: [],
      rating: [],
      sortBy: 'date',
      sortOrder: 'desc',
    });
    setSearchTerm('');
  };

  const uniqueStatuses = [...new Set(feedbacks.map((f) => f.status))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search feedback..."
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            icon={<Filter className="h-4 w-4" />}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <select
            className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={handleSortChange}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="rating-desc">Highest Rating</option>
            <option value="rating-asc">Lowest Rating</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
              <div className="space-y-2">
                {uniqueStatuses.map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleToggleFilter('status', status)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {status.replace('-', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category.id)}
                      onChange={() => handleToggleFilter('category', category.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.rating.includes(rating)}
                      onChange={() => handleToggleRating(rating)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {rating} {rating === 1 ? 'Star' : 'Stars'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredFeedbacks.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-gray-500 mb-4">
            <Search className="h-12 w-12 mx-auto text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No feedback found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filters.status.length || filters.category.length || filters.rating.length
              ? 'Try adjusting your filters or search term'
              : 'Be the first to submit feedback!'}
          </p>
          {(searchTerm || filters.status.length || filters.category.length || filters.rating.length) && (
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <FeedbackItem
              key={feedback.id}
              feedback={feedback}
              categories={categories}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;