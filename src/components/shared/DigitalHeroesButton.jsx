import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const DigitalHeroesButton = ({ className }) => {
  return (
    <motion.a
      href="https://digitalheroesco.com"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -4, boxShadow: "0 8px 28px rgba(0,212,170,0.6)" }}
      whileTap={{ scale: 0.98, y: 0, boxShadow: "0 4px 10px rgba(0,212,170,0.4)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl w-full",
        "bg-[linear-gradient(135deg,#00D4AA,#00BFA0)] text-[#0A0F0D]",
        "font-bold text-[15px] shadow-[0_4px_20px_rgba(0,212,170,0.4)]",
        "whitespace-nowrap origin-center",
        className
      )}
    >
      <Sparkles className="h-4 w-4 fill-current shrink-0" />
      Built for Digital Heroes
    </motion.a>
  );
};
