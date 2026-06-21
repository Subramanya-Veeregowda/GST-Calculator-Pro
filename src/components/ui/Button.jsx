import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  children,
  icon: Icon,
  disabled,
  ...props
}, ref) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-bg-elevated text-text-primary border border-border hover:bg-bg-base shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm",
    ghost: "bg-transparent text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
    danger: "bg-error/10 text-error hover:bg-error/20 active:bg-error/30 hover:-translate-y-0.5",
  };

  const sizes = {
    sm: 'text-sm py-1.5 px-3 rounded-md',
    md: 'text-sm font-semibold py-2.5 px-6 rounded-md',
    lg: 'text-base font-semibold py-3.5 px-8 rounded-lg',
    icon: 'p-2 rounded-md h-9 w-9 flex items-center justify-center',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 ease-smooth active:translate-y-0 active:shadow-none',
        variants[variant],
        sizes[size],
        disabled && 'opacity-40 cursor-not-allowed hover:translate-y-0 hover:shadow-none',
        className
      )}
      {...props}
    >
      {Icon && <Icon className={cn('h-4 w-4', size === 'icon' && 'h-5 w-5')} />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
