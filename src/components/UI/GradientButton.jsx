// src/components/UI/GradientButton.jsx
import React from 'react';

/**
 * A reusable button component with a purple-to-pink gradient.
 */
const GradientButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-full font-semibold text-white transition-all
        bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700
        hover:to-pink-600 shadow-lg shadow-purple-500/50
        focus:outline-none focus:ring-4 focus:ring-purple-300 ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GradientButton;