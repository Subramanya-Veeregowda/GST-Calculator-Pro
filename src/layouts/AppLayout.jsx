import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

export const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary selection:bg-primary/30">
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      
      <div className="flex flex-1 w-full max-w-[1440px] mx-auto relative">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        
        <main className="flex-1 flex flex-col w-full min-w-0 pb-[64px] md:pb-0">
          <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-300">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>

      <BottomNav />
    </div>
  );
};
