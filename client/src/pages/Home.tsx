import { Link } from 'react-router-dom';
import { MessageSquare, BarChart3, Sliders, PieChart } from 'lucide-react';
import Button from '../components/common/Button';
import FeedbackList from '../components/feedback/FeedbackList';
import { useFeedback } from '../context/FeedbackContext';

const Home = () => {
  const { feedbacks } = useFeedback();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-12 shadow-lg">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Help us improve our products and services by sharing your thoughts,
            suggestions, or concerns. Your feedback matters!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/submit">
              <Button
                variant="secondary"
                size="lg"
                icon={<MessageSquare className="h-5 w-5" />}
              >
                Submit Feedback
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                icon={<BarChart3 className="h-5 w-5" />}
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our feedback management system makes it easy to share your thoughts and see improvements in action.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 inline-block mb-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Feedback</h3>
            <p className="text-gray-600">
              Share your thoughts, ideas, or report issues through our simple feedback form.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 inline-block mb-4">
              <Sliders className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">We Process It</h3>
            <p className="text-gray-600">
              Our team reviews and categorizes your feedback to identify improvement opportunities.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-full bg-green-100 text-green-600 inline-block mb-4">
              <PieChart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">See Results</h3>
            <p className="text-gray-600">
              Watch as your feedback contributes to product improvements and new features.
            </p>
          </div>
        </div>
      </section>
      
      {feedbacks.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Feedback</h2>
            <Link to="/submit" className="text-blue-600 hover:text-blue-800 font-medium">
              Submit Yours →
            </Link>
          </div>
          
          <FeedbackList />
        </section>
      )}
    </div>
  );
};

export default Home;