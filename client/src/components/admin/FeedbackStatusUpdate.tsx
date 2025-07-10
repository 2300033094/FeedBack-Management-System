import { useState } from 'react';
import { CheckCircle, Clock, HardDrive, AlertCircle } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';
import { Feedback, FeedbackStatus } from '../../types';

interface FeedbackStatusUpdateProps {
  feedback: Feedback;
  onStatusUpdated: () => void;
}

const FeedbackStatusUpdate = ({ feedback, onStatusUpdated }: FeedbackStatusUpdateProps) => {
  const { updateFeedbackStatus } = useFeedback();
  const [updating, setUpdating] = useState(false);
  
  const statusOptions: { value: FeedbackStatus; label: string; icon: JSX.Element; color: string }[] = [
    { value: 'new', label: 'New', icon: <AlertCircle className="h-5 w-5" />, color: 'text-blue-600 bg-blue-100' },
    { value: 'in-progress', label: 'In Progress', icon: <Clock className="h-5 w-5" />, color: 'text-yellow-600 bg-yellow-100' },
    { value: 'planned', label: 'Planned', icon: <HardDrive className="h-5 w-5" />, color: 'text-purple-600 bg-purple-100' },
    { value: 'closed', label: 'Closed', icon: <CheckCircle className="h-5 w-5" />, color: 'text-green-600 bg-green-100' },
  ];
  
  const handleStatusChange = (status: FeedbackStatus) => {
    if (status === feedback.status) return;
    
    setUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      updateFeedbackStatus(feedback.id, status);
      setUpdating(false);
      onStatusUpdated();
    }, 500);
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-md font-medium text-gray-700 mb-3">Update Status</h3>
      
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            disabled={updating || feedback.status === option.value}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              feedback.status === option.value
                ? option.color + ' font-medium'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span className="mr-1">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
      
      {updating && (
        <p className="mt-2 text-sm text-gray-500">Updating status...</p>
      )}
    </div>
  );
};

export default FeedbackStatusUpdate;