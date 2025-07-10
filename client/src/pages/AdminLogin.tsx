import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, UserCircle } from 'lucide-react';
import Button from '../components/common/Button';

interface AdminLoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const AdminLogin = ({ setIsAuthenticated }: AdminLoginProps) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 8);
    setCaptcha(newCaptcha);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    if (captchaInput.trim().toLowerCase() !== captcha.toLowerCase()) {
      setError('Captcha does not match');
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Dashboard Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the feedback management dashboard
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Captcha Section */}
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                Enter Captcha
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <strong className="bg-gray-100 px-3 py-1 rounded text-blue-600 tracking-widest">{captcha}</strong>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Refresh
                </button>
              </div>
              <input
                id="captcha"
                name="captcha"
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type the captcha above"
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
