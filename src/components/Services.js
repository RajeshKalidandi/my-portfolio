import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaArrowRight } from 'react-icons/fa';

const Services = () => {
  return (
    <div name="services" className="min-h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          Services
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <FaReact className="text-4xl text-blue-400 mr-4" />
            <h3 className="text-2xl font-bold text-white">SaaS Product Frontend Development</h3>
          </div>
          <p className="text-gray-300 mb-6">
            I specialize in creating stunning, responsive, and user-friendly frontends for SaaS products. 
            Using cutting-edge technologies like React and Next.js, I build interfaces that not only look 
            great but also provide an excellent user experience.
          </p>
          <ul className="text-gray-300 mb-6 list-disc list-inside">
            <li>Responsive design for all devices</li>
            <li>Performance optimization</li>
            <li>Integration with backend APIs</li>
            <li>State management with Redux or Context API</li>
            <li>Implementing complex UI/UX designs</li>
          </ul>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
            Get a Quote <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;