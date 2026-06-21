import React from 'react';
import { NavLink } from 'react-router';
import { Calculator, FileText, Clock, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

export const BottomNav = () => {
  const tabs = [
    { path: '/calculator', icon: Calculator, label: 'Calculator' },
    { path: '/invoice', icon: FileText, label: 'Invoice' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(64px+env(safe-area-inset-bottom))] bg-bg-base/90 backdrop-blur-[20px] border-t border-border z-50 safe-pb">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => cn(
              "relative flex flex-col items-center justify-center gap-1 transition-colors duration-200",
              isActive ? "text-primary" : "text-text-muted"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute top-0 w-6 h-[2px] bg-primary rounded-b-[2px]" />
                )}
                <tab.icon className="h-6 w-6" />
                <span className="text-[11px] font-medium">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
