import React from 'react';
import { Calculator, Menu } from 'lucide-react';
import { NavLink } from 'react-router';
import { TypewriterText } from '../../components/shared/TypewriterText';
import { ThemeToggle } from '../../components/shared/ThemeToggle';
import { cn } from '../../utils/cn';

export const TopBar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-50 h-16 bg-bg-base/70 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-8 lg:px-12 w-full shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle (only visible on tablet if needed, or mobile) */}
        <button 
          className="lg:hidden p-2 text-text-muted hover:text-text-primary"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Logo */}
        <NavLink to="/calculator" className="flex items-center gap-2 outline-none">
          <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <TypewriterText>
            <span className="font-bold text-lg text-text-primary hidden sm:block tracking-tight">
              GST Calculator <span className="text-primary">Pro</span>
            </span>
          </TypewriterText>
        </NavLink>
      </div>

      {/* Desktop Main Nav */}
      <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-slate-200/60 dark:bg-bg-elevated/60 border border-slate-300/50 dark:border-border/50 shadow-sm backdrop-blur-md">
        {[
          { path: '/calculator', label: 'Calculator' },
          { path: '/invoice', label: 'Invoice' },
          { path: '/history', label: 'History' },
          { path: '/settings', label: 'Settings' },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "px-6 py-2 rounded-full text-[15px] font-medium transition-all duration-300 relative",
              isActive 
                ? "bg-primary/15 text-primary shadow-md" 
                : "text-text-muted hover:text-text-primary hover:bg-white/60 dark:hover:bg-bg-base/50"
            )}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
};
