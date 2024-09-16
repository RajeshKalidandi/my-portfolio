import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 15,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95, 
      rotateY: -15,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    rotateX: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div name="contact" className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white perspective-1000">
      <div className="flex flex-col justify-center max-w-screen-lg mx-auto h-full">
        <motion.div 
          className="pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold inline border-b-4 border-gray-500"
          >
            Let's Connect!
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="py-6"
          >
            I'm always excited to collaborate and discuss new opportunities.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="https://www.linkedin.com/in/rajesh-kalidandi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 w-64"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate={floatAnimation}
          >
            <FaLinkedin className="mr-2" /> Connect on LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/RajeshKalidandi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300 w-64"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate={floatAnimation}
          >
            <FaGithub className="mr-2" /> Check GitHub
          </motion.a>

          <motion.a
            href="mailto:kalidandiirajesh@gmail.com"
            className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 w-64"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate={floatAnimation}
          >
            <FaEnvelope className="mr-2" /> Send me an Email
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;