import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({
  className,
  label,
  error,
  icon: Icon,
  type = 'text',
  id,
  ...props
}, ref) => {
  const inputId = id || React.useId();
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-text-muted">
          {label} {props.required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full bg-bg-elevated border border-border text-text-primary text-[15px] rounded-[10px]",
            "px-4 py-3 placeholder:text-text-muted transition-all duration-150 ease-out",
            "focus:border-primary focus:ring-3 focus:ring-primary/12 focus:outline-none",
            Icon && "pl-10",
            error && "border-error focus:border-error focus:ring-error/12",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span id={errorId} className="text-[13px] text-error mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
