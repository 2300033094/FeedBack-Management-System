import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../common/Button';
import Rating from '../common/Rating';
import { useFeedback } from '../../context/FeedbackContext';
import emailjs from 'emailjs-com';

const FeedbackForm = () => {
  const { addFeedback } = useFeedback();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: 0,
    category: '',
    customCategory: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize EmailJS with your Public Key
  emailjs.init('jPxu5Tla8BvIw95c9');  // Replace with your actual Public Key

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.title.trim()) newErrors.title = 'Product title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (formData.category === 'other' && !formData.customCategory.trim()) {
      newErrors.customCategory = 'Please specify the category';
    }
    if (formData.rating === 0) newErrors.rating = 'Please select a rating';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const feedbackToSubmit = {
      ...formData,
      category: formData.category === 'other' ? formData.customCategory : formData.category,
    };

    // Prepare the data for the email template
    const templateParams = {
      name: formData.title,               // Assuming you're capturing name in the form
      email: formData.email,             // The user's email
      product: formData.title,           // Product name/title
      category: formData.category,       // Product category
      rating: formData.rating,           // Rating (1-5)
      message: formData.description,     // Description of the feedback
    };

    // Send the email using emailjs.send
    emailjs
      .send('service_9logocm', 'template_4j0rl4c', templateParams)
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
          setIsSubmitting(false);
          setIsSuccess(true);
          setFormData({
            title: '',
            description: '',
            rating: 0,
            category: '',
            customCategory: '',
            email: '',
          });
          setTimeout(() => setIsSuccess(false), 3000);  // Hide success message after 3 seconds
        },
        (error) => {
          console.error('Failed to send email:', error);
          setIsSubmitting(false);
        }
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
    if (errors.rating) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Feedback</h2>

        {isSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md border border-green-200 animate-pulse">
            Thank you! Your feedback has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Product Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Product Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              <option value="ecommerce">Ecommerce</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}

            {formData.category === 'other' && (
              <div className="mt-2">
                <input
                  type="text"
                  name="customCategory"
                  value={formData.customCategory}
                  onChange={handleChange}
                  placeholder="Please specify the category"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.customCategory ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.customCategory && (
                  <p className="mt-1 text-sm text-red-500">{errors.customCategory}</p>
                )}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex items-center">
              <Rating value={formData.rating} onChange={handleRatingChange} size="lg" />
              <span className="ml-2 text-sm text-gray-500">
                {formData.rating > 0
                  ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}`
                  : 'Select a rating'}
              </span>
            </div>
            {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description of Your Feedback
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Please provide detailed feedback..."
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            icon={<Send className="h-4 w-4" />}
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
