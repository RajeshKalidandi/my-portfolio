import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SmoothComponent = ({ 
  children, 
  threshold = 0.1, 
  triggerOnce = true, 
  variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 }
  },
  transition = { duration: 0.5, type: 'spring' },
  className = ''
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(SmoothComponent);