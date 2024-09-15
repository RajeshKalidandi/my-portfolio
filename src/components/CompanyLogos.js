import React from 'react';
import { motion } from 'framer-motion';

const CompanyLogos = () => {
  const companies = [
    { name: 'InnoByte Services', logo: 'transparentlogo.png' },
    { name: 'Shine Projects', logo: 'T-Hub_Logo-PNG.png' },
    { name: 'LetsUpgrade', logo: 'LUP-Logo.png' },
    { name: 'Internshala', logo: 'Internshala-Logo.png' },
    { name: 'eDC IIT Delhi', logo: 'eDCLogo.png' },
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
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FF0066" d="M47.5,-61.3C59.8,-52.2,67.1,-36.8,71.3,-21.8C75.5,-6.8,76.5,11.9,70.8,26.4C65.1,40.9,52.7,53.2,38.8,60.2C24.9,67.2,9.5,68.9,-6.7,67.6C-22.9,66.3,-45.8,62,-59.6,49.5C-73.4,37,-78.2,16.3,-75.4,-2.8C-72.7,-21.9,-62.4,-39.4,-48.9,-48.7C-35.4,-58,-17.7,-59.1,-0.2,-58.8C17.3,-58.6,34.2,-70.4,47.5,-61.3Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          className="text-center text-4xl font-extrabold text-white mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Companies I've Worked With
        </motion.h2>
        <motion.div 
          className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-5"
          variants={containerVariants}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="col-span-1 flex justify-center items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                className="h-16 md:h-20 filter brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
                src={company.logo}
                alt={company.name}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanyLogos;