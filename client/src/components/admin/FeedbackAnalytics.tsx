import { useMemo } from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import { BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';

const FeedbackAnalytics = () => {
  const { feedbacks, categories } = useFeedback();
  
  const analytics = useMemo(() => {
    const totalCount = feedbacks.length;
    const averageRating = totalCount > 0
      ? +(feedbacks.reduce((sum, item) => sum + item.rating, 0) / totalCount).toFixed(1)
      : 0;
    
    // Count by status
    const statusCounts = feedbacks.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Count by category
    const categoryCounts = feedbacks.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Count by rating
    const ratingCounts = feedbacks.reduce((acc, item) => {
      acc[item.rating] = (acc[item.rating] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Recent trend (last 7 days vs previous 7 days)
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    const lastWeekCount = feedbacks.filter(item => 
      new Date(item.date) >= oneWeekAgo && new Date(item.date) <= now
    ).length;
    
    const previousWeekCount = feedbacks.filter(item => 
      new Date(item.date) >= twoWeeksAgo && new Date(item.date) < oneWeekAgo
    ).length;
    
    const weeklyChange = previousWeekCount > 0
      ? Math.round((lastWeekCount - previousWeekCount) / previousWeekCount * 100)
      : lastWeekCount > 0 ? 100 : 0;
    
    return {
      totalCount,
      averageRating,
      statusCounts,
      categoryCounts,
      ratingCounts,
      lastWeekCount,
      previousWeekCount,
      weeklyChange
    };
  }, [feedbacks]);
  
  const getStatusName = (status: string) => {
    switch(status) {
      case 'new': return 'New';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      case 'closed': return 'Closed';
      default: return status;
    }
  };
  
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Feedback</p>
              <h3 className="text-2xl font-bold text-gray-900">{analytics.totalCount}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <PieChart className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
              <h3 className="text-2xl font-bold text-gray-900">{analytics.averageRating}/5</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Weekly Change</p>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                {analytics.weeklyChange}%
                {analytics.weeklyChange > 0 && <span className="text-green-500 ml-1">↑</span>}
                {analytics.weeklyChange < 0 && <span className="text-red-500 ml-1">↓</span>}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last 7 Days</p>
              <h3 className="text-2xl font-bold text-gray-900">{analytics.lastWeekCount}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Feedback by Status</h3>
          </div>
          <div className="p-6">
            {Object.entries(analytics.statusCounts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(analytics.statusCounts).map(([status, count]) => (
                  <div key={status} className="flex items-center">
                    <span className="w-1/3 text-sm text-gray-600">{getStatusName(status)}</span>
                    <div className="w-2/3">
                      <div className="flex items-center">
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              status === 'new' ? 'bg-blue-500' :
                              status === 'in-progress' ? 'bg-yellow-500' :
                              status === 'planned' ? 'bg-purple-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${(count / analytics.totalCount) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          {count} ({Math.round((count / analytics.totalCount) * 100)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Feedback by Category</h3>
          </div>
          <div className="p-6">
            {Object.entries(analytics.categoryCounts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(analytics.categoryCounts).map(([categoryId, count]) => (
                  <div key={categoryId} className="flex items-center">
                    <span className="w-1/3 text-sm text-gray-600">{getCategoryName(categoryId)}</span>
                    <div className="w-2/3">
                      <div className="flex items-center">
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              categories.find(c => c.id === categoryId)?.color || 'bg-blue-500'
                            }`}
                            style={{ width: `${(count / analytics.totalCount) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          {count} ({Math.round((count / analytics.totalCount) * 100)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Rating Distribution</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = analytics.ratingCounts[rating] || 0;
              const percentage = analytics.totalCount > 0 
                ? Math.round((count / analytics.totalCount) * 100)
                : 0;
              
              return (
                <div key={rating} className="flex items-center">
                  <span className="w-20 text-sm text-gray-600">{rating} Stars</span>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">
                        {count} ({percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;