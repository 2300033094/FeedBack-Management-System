import { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';
import Button from '../common/Button';

const CategoryManager = () => {
  const { categories, addCategory, deleteCategory } = useFeedback();
  const [newCategory, setNewCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-blue-500');
  const [isAdding, setIsAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  
  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-red-500', label: 'Red' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-yellow-500', label: 'Yellow' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-teal-500', label: 'Teal' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      setError('Category name is required');
      return;
    }
    
    if (categories.some(c => c.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      setError('Category with this name already exists');
      return;
    }
    
    setIsAdding(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      addCategory({ name: newCategory.trim(), color: selectedColor });
      setNewCategory('');
      setSelectedColor('bg-blue-500');
      setIsAdding(false);
      setShowForm(false);
    }, 500);
  };
  
  const handleDeleteCategory = (id: string) => {
    // Simulate API call
    deleteCategory(id);
  };
  
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Feedback Categories</h3>
        {!showForm && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowForm(true)}
            icon={<Plus className="h-4 w-4" />}
          >
            Add Category
          </Button>
        )}
      </div>
      
      <div className="p-6">
        {showForm && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-100 text-red-800 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      className={`h-10 rounded-md ${color.value} ${
                        selectedColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                      aria-label={`Select ${color.label} color`}
                    ></button>
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Preview: </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedColor.replace('bg-', 'bg-opacity-15 text-')}`}>
                    <Tag className="h-3 w-3 mr-1" />
                    {newCategory || 'Category Name'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isAdding}
                >
                  Add Category
                </Button>
              </div>
            </form>
          </div>
        )}
        
        <div className="space-y-2">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No categories yet. Add your first category!</p>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <span className={`h-4 w-4 rounded-full ${category.color} mr-2`}></span>
                  <span className="font-medium text-gray-700">{category.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none"
                  aria-label={`Delete ${category.name} category`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;