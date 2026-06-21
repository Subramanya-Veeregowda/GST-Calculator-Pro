import React from 'react';
import { NavLink } from 'react-router';
import { Calculator, FileText, Clock, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { DigitalHeroesButton } from '../../components/shared/DigitalHeroesButton';
import { cn } from '../../utils/cn';

export const Sidebar = ({ isOpen, onClose }) => {
  const tabs = [
    { path: '/calculator', icon: Calculator, label: 'Calculator' },
    { path: '/invoice', icon: FileText, label: 'Invoice Generator' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed lg:sticky top-[64px] lg:top-16 left-0 h-[calc(100vh-64px)] w-[240px] z-50",
        "bg-bg-base/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none",
        "border-r border-border flex flex-col transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2 relative">
          <div className="z-10 flex flex-col gap-2">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => cn(
                  "flex items-center lg:justify-start gap-3 h-11 px-4 rounded-[12px] text-[14px] font-medium transition-all duration-300",
                  isActive 
                    ? "bg-primary/15 text-primary shadow-sm" 
                    : "text-text-muted hover:bg-white/5 hover:text-text-primary hover:translate-x-1"
                )}
              >
                <tab.icon className="h-5 w-5 shrink-0" />
                {tab.label}
              </NavLink>
            ))}
          </div>

          {/* Watermark text */}
          <motion.div 
            animate={{ opacity: [0.20, 0.35, 0.20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute hidden lg:flex inset-0 lg:left-[-50px] lg:inset-y-0 items-center justify-center lg:justify-start pointer-events-none select-none z-[999]"
          >
            <div className="text-[32px] lg:text-[38px] font-black tracking-[0.1em] whitespace-nowrap text-primary lg:rotate-180 rotate-180 mt-[150px] lg:mt-0" style={{ writingMode: 'vertical-lr' }}>
              GST CALCULATOR PRO<span className="inline-block text-[18px]" style={{ transform: "rotate(90deg)", marginTop: "8px",}}>®</span>
            </div>
          </motion.div>
        </nav>

        <div className="px-1 py-3 border-t border-border bg-bg-base/50 backdrop-blur-sm z-10 relative left-[-30px]">
          <DigitalHeroesButton className="w-full min-w-full justify-center py-3.5 rounded-lg" />
        </div>
      </aside>
    </>
  );
};
