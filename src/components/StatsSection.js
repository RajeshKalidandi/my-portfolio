import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedNumber = ({ value, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      });
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const startTime = Date.now();

      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        setDisplayValue(currentValue);

        if (progress === 1) {
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, inView, controls]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
    >
      {displayValue}{suffix}
    </motion.span>
  );
};

const StatsSection = () => {
  const stats = [
    { label: 'Projects Completed', value: 20, suffix: '+', icon: '🚀' },
    { label: 'Companies Worked With', value: 10, suffix: '+', icon: '🏢' },
    { label: 'Years of Experience', value: 2, suffix: '+', icon: '⏳' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-gray-900 to-black py-20 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#8B5CF6" d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.1C53.4,-3.8,57.4,8.3,56.6,21.5C55.8,34.7,50.1,49,39,57.8C29.7,66.6,14.9,69.8,-1.2,71.5C-17.3,73.2,-34.6,73.3,-45.4,64.7C-56.2,56.1,-60.5,38.8,-65.2,21.6C-69.9,4.4,-75,-12.7,-70.6,-27.7C-68.2,-42.7,-56.3,-55.7,-42.4,-63.8C-28.5,-71.9,-14.2,-75.1,1.9,-77.7C18,-80.3,36,-72.9,42.7,-62.9Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          className="text-center text-4xl font-extrabold text-white mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          My Journey in Numbers
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 + index * 0.1 }}
              >
                {stat.icon}
              </motion.div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <motion.p 
                className="mt-2 text-xl text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsSection;