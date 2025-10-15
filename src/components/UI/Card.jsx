// src/components/UI/Card.jsx
import React from 'react';

/**
 * A reusable card component with a gentle gradient background.
 */
const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`
        bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-xl
        border border-white/30 transition-all duration-300
        hover:shadow-2xl ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;