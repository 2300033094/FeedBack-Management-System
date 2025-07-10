import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import FeedbackItem from '../components/feedback/FeedbackItem';
import FeedbackStatusUpdate from '../components/admin/FeedbackStatusUpdate';
import FeedbackResponseForm from '../components/admin/FeedbackResponseForm';
import { useFeedback } from '../context/FeedbackContext';
import Button from '../components/common/Button';

const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getFeedbackById, categories } = useFeedback();
  const [feedback, setFeedback] = useState(getFeedbackById(id || ''));
  const [isUpdated, setIsUpdated] = useState(false);
  
  useEffect(() => {
    // Reload feedback data after any updates
    setFeedback(getFeedbackById(id || ''));
    
    if (isUpdated) {
      // Show success message briefly
      const timer = setTimeout(() => {
        setIsUpdated(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [id, getFeedbackById, isUpdated]);
  
  if (!feedback) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feedback Not Found</h2>
          <p className="text-gray-600 mb-6">The feedback you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handleStatusUpdated = () => {
    setIsUpdated(true);
  };
  
  const handleResponseSubmitted = () => {
    setIsUpdated(true);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Feedback List</span>
        </Link>
      </div>
      
      {isUpdated && (
        <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-md border border-green-200 animate-pulse">
          Feedback has been successfully updated!
        </div>
      )}
      
      <div className="mb-6">
        <FeedbackItem feedback={feedback} categories={categories} isDetailed />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackStatusUpdate 
          feedback={feedback} 
          onStatusUpdated={handleStatusUpdated} 
        />
        
        <FeedbackResponseForm 
          feedback={feedback} 
          onResponseSubmitted={handleResponseSubmitted} 
        />
      </div>
    </div>
  );
};

export default FeedbackDetail;