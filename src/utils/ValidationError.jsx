import React from 'react';
import './ValidationError.css';

const ValidationError = ({ error, show = true }) => {
  if (!error || !show) return null;
  
  return (
    <div className="validation-error">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{error}</span>
    </div>
  );
};

export default ValidationError;