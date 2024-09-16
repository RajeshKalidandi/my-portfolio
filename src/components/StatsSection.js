import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const AnimatedNumber = ({ value, suffix }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-3xl sm:text-4xl font-bold text-blue-500"
    >
      {value}{suffix}
    </motion.span>
  );
};

const StatsSection = () => {
  const stats = useMemo(() => [
    { label: 'Projects Completed', value: 20, suffix: '+', icon: '🚀' },
    { label: 'Companies Worked With', value: 10, suffix: '+', icon: '🏢' },
    { label: 'Years of Experience', value: 2, suffix: '+', icon: '⏳' },
  ], []);

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
    <section className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-gray-300 py-16 relative overflow-hidden">
      <Helmet>
        <title>Statistics - Rajesh Kalidandi</title>
        <meta name="description" content="Explore Rajesh Kalidandi's professional journey in numbers, including projects completed, companies worked with, and years of experience." />
        <meta name="keywords" content="Rajesh Kalidandi, Statistics, Projects, Experience, Full Stack Developer" />
      </Helmet>

      {/* Dynamic background particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="max-w-screen-lg mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          My Journey in Numbers
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 sm:p-8 text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.03, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div 
                className="text-4xl sm:text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 + index * 0.1 }}
                aria-hidden="true"
              >
                {stat.icon}
              </motion.div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <motion.p 
                className="mt-2 text-base sm:text-xl text-gray-300"
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
    </section>
  );
};

export default React.memo(StatsSection);