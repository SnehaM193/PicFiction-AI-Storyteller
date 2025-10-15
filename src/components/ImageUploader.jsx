import React, { useCallback } from 'react';
import { FiUpload, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Card from './UI/Card';

// Updated to accept an 'image' prop to show status
const ImageUploader = ({ onImageSelect, image }) => {
  const handleUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) onImageSelect(file);
  }, [onImageSelect]);
  
  // Determine if an image has been selected (we'll assume the parent component 
  // passes the selected file as the 'image' prop in a real application)
  const isImageSelected = image !== null; 

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Upload Art 🖼️
      </h2>

      <Card 
        className={`text-center border-dashed border-2 py-12 transition-all duration-300 rounded-2xl shadow-lg ${
          isImageSelected 
            ? 'border-green-500 bg-green-50' 
            : 'border-purple-400 hover:bg-purple-50'
        }`}
      >
        <label htmlFor="file-upload" className="cursor-pointer block">
          {isImageSelected ? (
            <FiCheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3 animate-pulse" />
          ) : (
            <FiUpload className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          )}
          
          <p className="text-gray-700 font-bold">
            {isImageSelected ? 'Image Uploaded! 🎉' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={handleUpload}
          className="hidden"
        />
      </Card>

      {!import.meta.env.VITE_GEMINI_API_KEY && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-start space-x-3 shadow-md">
          <FiAlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">API Key Missing:</p>
            <p className="text-sm">
              You need a Google Gemini API key to generate stories. Set up your key to enable full functionality!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;