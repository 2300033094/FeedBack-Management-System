import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import SubmitFeedback from './pages/SubmitFeedback';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FeedbackDetail from './pages/FeedbackDetail';
import { FeedbackProvider } from './context/FeedbackContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitFeedback />} />
            <Route path="/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
            <Route 
              path="/dashboard/*" 
              element={
                isAuthenticated ? 
                <AdminDashboard /> : 
                <AdminLogin setIsAuthenticated={setIsAuthenticated} />
              } 
            />
            <Route path="/feedback/:id" element={<FeedbackDetail />} />
          </Routes>
        </div>
      </div>
    </FeedbackProvider>
  );
}

export default App;