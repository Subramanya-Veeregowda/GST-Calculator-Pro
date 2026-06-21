import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const TypewriterText = ({ children }) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [blink, setBlink] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const played = sessionStorage.getItem('typewriter_played');
    if (played || reducedMotion) {
      setHasPlayed(true);
    } else {
      sessionStorage.setItem('typewriter_played', 'true');
      // Stop blinking cursor after 3 seconds total
      setTimeout(() => setBlink(false), 3000);
    }
  }, [reducedMotion]);

  if (hasPlayed && !blink) {
    return <span className="inline-flex items-center">{children}</span>;
  }

  return (
    <motion.span
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
      className={`inline-flex items-center whitespace-nowrap border-r-2 ${blink ? 'border-primary animate-pulse' : 'border-transparent'}`}
      style={{ paddingRight: '2px' }}
    >
      {children}
    </motion.span>
  );
};
