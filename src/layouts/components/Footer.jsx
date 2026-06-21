import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitalHeroesButton } from '../../components/shared/DigitalHeroesButton';

export const Footer = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText("subramanyav2002@gmail.com");
      setToastMessage("Email copied to clipboard");
      setTimeout(() => setToastMessage(null), 2500);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="bg-bg-base border-t border-border mt-auto w-full relative z-10"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 flex flex-col gap-8 w-full">
        
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[18px] md:text-xl font-bold">
          <a 
            href="https://www.linkedin.com/in/subramanyav2002" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-primary hover:text-primary transition-colors tracking-wide"
          >
            SUBRAMANYA V
          </a>
          <span className="hidden md:block text-border">|</span>
          <a 
            href="mailto:subramanyav2002@gmail.com" 
            onClick={handleEmailClick}
            className="text-text-primary hover:text-primary transition-colors tracking-wide cursor-pointer"
          >
            subramanyav2002@gmail.com
          </a>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border/40">
          
          {/* Left Side */}
          <div className="text-text-muted text-[13px] md:text-sm text-center md:text-left">
            <span className="font-bold text-text-primary">&copy; 2026 GST Calculator Pro</span> Developed by Subramanya V
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/Subramanya-Veeregowda" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/subramanyav2002" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://wa.me/qr/IH3W2XLDW7FHE1" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
            </a>
            <a href="mailto:subramanyav2002@gmail.com" onClick={handleEmailClick} className="text-text-muted hover:text-primary transition-colors cursor-pointer" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        {/* Mobile Only: Built for Digital Heroes Button */}
        <div className="flex md:hidden justify-center w-full mt-2">
          <DigitalHeroesButton className="w-[85%] max-w-[340px]" />
        </div>

      </div>
      
      {/* Mobile spacing for BottomNav */}
      <div className="h-20 md:hidden" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[100] bg-bg-elevated border border-border text-text-primary px-5 py-3 rounded-full shadow-modal flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};
