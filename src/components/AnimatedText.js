import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  children, 
  variant = 'fade',
  delay = 0, 
  duration = 0.5,
  hoverEffect = false 
}) => {
  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    fadeDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    fadeLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 }
    },
    fadeRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.5 }
    }
  };

  return (
    <motion.div
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 10, 
        delay, 
        duration 
      }}
      whileHover={hoverEffect ? { scale: 1.05 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;