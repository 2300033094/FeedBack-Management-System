import { useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import Button from '../common/Button';
import { useFeedback } from '../../context/FeedbackContext';
import { Feedback } from '../../types';

interface FeedbackResponseFormProps {
  feedback: Feedback;
  onResponseSubmitted: () => void;
}

const FeedbackResponseForm = ({ feedback, onResponseSubmitted }: FeedbackResponseFormProps) => {
  const { addResponse } = useFeedback();
  const [response, setResponse] = useState(feedback.response || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim()) {
      setError('Response cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      try {
        addResponse(feedback.id, response);
        setIsSubmitting(false);
        onResponseSubmitted();
      } catch (err) {
        setError('Failed to submit response. Please try again.');
        setIsSubmitting(false);
      }
    }, 1000);
  };
  
  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Respond to Feedback</h3>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md border border-red-200">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">
            Your Response
          </label>
          <textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your response here..."
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            icon={<MessageSquareText className="h-4 w-4" />}
          >
            Submit Response
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackResponseForm;