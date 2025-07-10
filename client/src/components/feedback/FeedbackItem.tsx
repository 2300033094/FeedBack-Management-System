import { useState } from 'react';
import { Calendar, User, Tag, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Feedback, Category } from '../../types';
import Rating from '../common/Rating';

interface FeedbackItemProps {
  feedback: Feedback;
  categories: Category[];
  isDetailed?: boolean;
}

const FeedbackItem = ({ feedback, categories, isDetailed = false }: FeedbackItemProps) => {
  const [isExpanded, setIsExpanded] = useState(isDetailed);
  
  const category = categories.find((c) => c.id === feedback.category);
  
  const formattedDate = new Date(feedback.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    planned: 'bg-purple-100 text-purple-800',
    closed: 'bg-green-100 text-green-800',
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{feedback.title}</h3>
          <div className="flex items-center space-x-2">
            <Rating value={feedback.rating} readonly size="sm" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{feedback.email.split('@')[0]}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-3 mb-3 space-x-2">
          {category && (
            <span className={`flex items-center px-2 py-1 text-xs rounded-full ${category.color.replace('bg-', 'bg-opacity-15 text-')}`}>
              <Tag className="h-3 w-3 mr-1" />
              {category.name}
            </span>
          )}
          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[feedback.status]}`}>
            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
          </span>
        </div>
        
        <div className={`mt-2 ${isExpanded ? '' : 'line-clamp-2'} text-gray-700`}>
          {feedback.description}
        </div>
        
        {!isDetailed && feedback.description.length > 120 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
        
        {feedback.response && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-start space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Response from Team</p>
                <p className="mt-1 text-sm text-gray-700">{feedback.response}</p>
              </div>
            </div>
          </div>
        )}
        
        {!isDetailed && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Link
              to={`/feedback/${feedback.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Details →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackItem;