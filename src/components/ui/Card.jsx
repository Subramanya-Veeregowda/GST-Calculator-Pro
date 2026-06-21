import React from 'react';
import { cn } from '../../utils/cn';

export const Card = React.forwardRef(({
  className,
  variant = 'default',
  children,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-bg-surface border border-border rounded-[14px] shadow-card hover:border-primary-border hover:shadow-hover hover:-translate-y-[1px] transition-all duration-200 ease-smooth',
    glass: 'bg-bg-surface/80 backdrop-blur-[12px] border border-primary/15 rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]',
    result: 'bg-[linear-gradient(135deg,rgba(0,212,170,0.05),#1A2320)] border border-primary/20 rounded-[14px]'
  };

  return (
    <div
      ref={ref}
      className={cn(
        "p-5 md:p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
