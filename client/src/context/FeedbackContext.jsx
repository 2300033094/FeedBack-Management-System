import { createContext, useContext, useState } from 'react';

// Initial data for demonstration purposes
const initialFeedbacks = [
  {
    id: '1',
    title: 'Excellent customer service',
    description: 'The support team was extremely helpful and resolved my issue promptly.',
    rating: 5,
    category: 'support',
    status: 'new',
    date: new Date('2023-06-15').toISOString(),
    email: 'john.doe@example.com',
  },
  {
    id: '2',
    title: 'App crashes frequently',
    description: 'The mobile app keeps crashing when I try to upload photos.',
    rating: 2,
    category: 'bug',
    status: 'in-progress',
    date: new Date('2023-06-10').toISOString(),
    email: 'alice.smith@example.com',
  },
  {
    id: '3',
    title: 'Feature request for dark mode',
    description: 'Please add a dark mode option to reduce eye strain during night usage.',
    rating: 4,
    category: 'feature',
    status: 'planned',
    date: new Date('2023-06-08').toISOString(),
    email: 'bob.johnson@example.com',
  },
  {
    id: '4',
    title: 'Confusing navigation',
    description: 'The navigation menu is not intuitive and hard to find important features.',
    rating: 3,
    category: 'ux',
    status: 'new',
    date: new Date('2023-06-05').toISOString(),
    email: 'emma.wilson@example.com',
  },
  {
    id: '5',
    title: 'Love the new design!',
    description: 'The recent redesign looks fantastic and makes everything easier to find.',
    rating: 5,
    category: 'design',
    status: 'closed',
    date: new Date('2023-06-01').toISOString(),
    email: 'michael.brown@example.com',
  },
];

const initialCategories = [
  { id: 'bug', name: 'Bug Report', color: 'bg-red-500' },
  { id: 'feature', name: 'Feature Request', color: 'bg-purple-500' },
  { id: 'support', name: 'Support', color: 'bg-blue-500' },
  { id: 'ux', name: 'User Experience', color: 'bg-yellow-500' },
  { id: 'design', name: 'Design', color: 'bg-green-500' },
];

const FeedbackContext = createContext();

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [categories, setCategories] = useState(initialCategories);

  const addFeedback = (feedback) => {
    const newFeedback = {
      ...feedback,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new',
    };
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const updateFeedbackStatus = (id, status) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, status } : feedback
      )
    );
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-'),
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const getFeedbackById = (id) => {
    return feedbacks.find((feedback) => feedback.id === id);
  };

  const addResponse = (feedbackId, response) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              response,
              status: 'closed',
            }
          : feedback
      )
    );
  };

  const value = {
    feedbacks,
    categories,
    addFeedback,
    updateFeedbackStatus,
    addCategory,
    deleteCategory,
    getFeedbackById,
    addResponse,
  };

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}