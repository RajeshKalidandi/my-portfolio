import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSpinner = ({ color = 'black', size = 50 }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1, 
          ease: "linear" 
        }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `${size/12.5}px solid lightgray`,
          borderTop: `${size/12.5}px solid ${color}`,
        }}
      />
      <AnimatePresence>
        {showText && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 font-semibold text-gray-600"
          >
            Loading...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingSpinner;