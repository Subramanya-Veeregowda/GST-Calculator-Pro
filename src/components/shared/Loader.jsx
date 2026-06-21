import React from 'react';
import './Loader.css';
import { cn } from '../../utils/cn';

export const Loader = ({ fullScreen = false, className }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 bg-bg-base flex items-center justify-center" 
    : cn("flex items-center justify-center min-h-[200px] w-full", className);

  return (
    <div className={containerClasses}>
      <div className="loader-wrapper">
        <div className="loader-ring" />
        <div className="loader-orbit">
          <div className="loader-dot" />
        </div>
        <span className="loader-rupee">₹</span>
      </div>
    </div>
  );
};
