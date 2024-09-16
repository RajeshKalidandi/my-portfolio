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
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-300 py-16 relative overflow-hidden">
      {/* Dynamic background particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
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
      
      <div className="max-w-screen-lg mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Companies I've Worked With
        </motion.h2>
        <motion.div 
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-center items-center group"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <img
                  className="h-16 md:h-20 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                  src={company.logo}
                  alt={company.name}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-center p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {company.name}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogos;