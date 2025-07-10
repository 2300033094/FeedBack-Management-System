import { CheckCircle } from 'lucide-react';
import FeedbackForm from '../components/feedback/FeedbackForm';
import { useFeedback } from '../context/FeedbackContext';

const SubmitFeedback = () => {
  const { feedbacks } = useFeedback();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          Share Your Feedback
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Your thoughts help us improve. Please share your experience, suggestions, or report any issues.
        </p>
        
        <div className="mb-8">
          <FeedbackForm />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-700">
                  <span className="font-medium">Review process:</span> Our team reviews all feedback submissions within 1-2 business days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-700">
                  <span className="font-medium">Updates:</span> You'll receive email updates about the status of your feedback.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-700">
                  <span className="font-medium">Implementation:</span> Valuable suggestions are prioritized for implementation in future updates.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-700">
                  <span className="font-medium">Follow-up:</span> For urgent matters, our team may reach out directly for additional information.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Thank you for helping us improve! Your feedback makes a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedback;