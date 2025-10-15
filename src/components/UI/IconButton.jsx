// src/components/UI/IconButton.jsx
import React from 'react';

/**
 * A reusable icon button component.
 */
const IconButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors
        focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}
      `}
    >
      {children}
    </button>
  );
};

export default IconButton;