import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';

export const AnimatedNumber = ({ value, className }) => {
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const [isInitial, setIsInitial] = useState(true);
  
  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }

    if (reducedMotion) {
      motionValue.set(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value, motionValue, reducedMotion, isInitial]);

  const formatted = useTransform(motionValue, (latest) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(latest);
  });

  return <motion.span className={className}>{formatted}</motion.span>;
};
