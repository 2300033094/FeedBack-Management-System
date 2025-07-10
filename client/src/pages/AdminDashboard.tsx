import { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { BarChart3, ListFilter, TagIcon, MessageSquareText } from 'lucide-react';
import FeedbackList from '../components/feedback/FeedbackList';
import FeedbackAnalytics from '../components/admin/FeedbackAnalytics';
import CategoryManager from '../components/admin/CategoryManager';

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/dashboard/categories'
      ? 'categories'
      : location.pathname === '/dashboard/analytics'
      ? 'analytics'
      : 'feedbacks'
  );
  
  const tabs = [
    { id: 'feedbacks', label: 'Feedback List', icon: <ListFilter className="h-5 w-5" />, path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, path: '/dashboard/analytics' },
    { id: 'categories', label: 'Categories', icon: <TagIcon className="h-5 w-5" />, path: '/dashboard/categories' },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border-b border-gray-200 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Manage feedback, analyze trends, and track customer satisfaction.
        </p>
        
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              end={tab.id === 'feedbacks'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 border-b-2 text-sm font-medium ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={<FeedbackList />} />
        <Route path="/analytics" element={<FeedbackAnalytics />} />
        <Route path="/categories" element={<CategoryManager />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;