import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const jobTypes = [
    "Full-time Roles", "Internships", "Remote Positions",
    "Part-time Opportunities", "Freelance Projects", 
    "Contract Work", "Hourly Consulting"
  ];

  const [currentJobType, setCurrentJobType] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobType((prev) => (prev + 1) % jobTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [jobTypes.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const imageX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const imageY = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);

  return (
    <div name="home" className="w-full h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 relative overflow-hidden">
      {/* Dynamic background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 5 + 1,
            height: Math.random() * 5 + 1,
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
      
      <motion.div 
        className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col justify-center h-full md:w-1/2"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl sm:text-7xl font-bold text-white"
            variants={itemVariants}
          >
            I'm <br />
            <motion.span 
              className="text-cyan-500"
              animate={{ color: ['#06b6d4', '#3b82f6', '#06b6d4'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Rajesh Kalidandi
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-gray-300 py-4 max-w-md"
            variants={itemVariants}
          >
            Computer Science & Engineering student specializing in AI & ML.
            Experienced in data analysis, software development, and innovative AI projects.
          </motion.p>

          <motion.h2 
            className="text-3xl font-bold text-gray-300 mt-4"
            variants={itemVariants}
          >
            Open to: 
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentJobType}
                className="text-cyan-500 ml-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {jobTypes[currentJobType]}
              </motion.span>
            </AnimatePresence>
          </motion.h2>

          <motion.div className="mt-8" variants={itemVariants}>
            <Link
              to="projects"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:bg-gradient-to-l transition-all duration-300"
            >
              View Projects
              <motion.span 
                className="ml-1"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
          variants={itemVariants}
          style={{
            perspective: 1000,
          }}
        >
          <motion.img 
            src="/hero-section.png" 
            alt="Rajesh Kalidandi" 
            className="rounded-2xl w-2/3 md:w-full max-w-lg shadow-lg shadow-cyan-500/50"
            style={{
              x: imageX,
              y: imageY,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;