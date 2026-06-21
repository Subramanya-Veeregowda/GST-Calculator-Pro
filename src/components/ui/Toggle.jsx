import React from 'react';
import { cn } from '../../utils/cn';

export const Toggle = ({ options, value, onChange, className }) => {
  return (
    <div className={cn("flex bg-bg-elevated border border-border p-1 rounded-[10px]", className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 text-[13px] font-semibold py-2 px-5 rounded-lg transition-all duration-200 ease-smooth whitespace-nowrap",
              isActive 
                ? "bg-primary text-text-inverse shadow-[0_2px_8px_rgba(0,212,170,0.3)]" 
                : "text-text-muted hover:text-text-primary hover:bg-white/5"
            )}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
