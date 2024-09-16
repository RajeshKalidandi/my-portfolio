import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaServer, FaMobile, FaCode, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ServiceCard = ({ icon: Icon, title, description, features }) => (
  <motion.div 
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="flex items-center mb-6">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="text-4xl text-blue-400 mr-4" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-300 mb-6">{description}</p>
    <ul className="text-gray-300 mb-6 list-disc list-inside">
      {features.map((feature, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {feature}
        </motion.li>
      ))}
    </ul>
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <motion.a 
        href="https://www.linkedin.com/in/rajesh-kalidandi/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaLinkedin className="mr-2" /> Message on LinkedIn
      </motion.a>
      <motion.a 
        href="mailto:kalidandiirajesh@gmail.com?subject=Service%20Inquiry&body=I'm%20interested%20in%20your%20services.%20Can%20we%20discuss%20further?"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MdEmail className="mr-2" /> Send Email
      </motion.a>
    </div>
  </motion.div>
);

const Services = () => {
  const [currentService, setCurrentService] = useState(0);
  const services = [
    {
      icon: FaReact,
      title: "SaaS Product Frontend Development",
      description: "I specialize in creating stunning, responsive, and user-friendly frontends for SaaS products. Using cutting-edge technologies like React and Next.js, I build interfaces that not only look great but also provide an excellent user experience.",
      features: [
        "Responsive design for all devices",
        "Performance optimization",
        "Integration with backend APIs",
        "State management with Redux or Context API",
        "Implementing complex UI/UX designs"
      ]
    },
    {
      icon: FaServer,
      title: "Backend Development",
      description: "Robust and scalable backend solutions to power your applications. I use modern technologies to ensure your backend can handle growth and maintain high performance.",
      features: [
        "RESTful API development",
        "Database design and optimization",
        "Authentication and authorization",
        "Microservices architecture",
        "Cloud deployment (AWS, Azure, GCP)"
      ]
    },
    {
      icon: FaMobile,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications that provide native-like experience. I use React Native to build efficient and performant mobile apps for both iOS and Android.",
      features: [
        "Cross-platform development",
        "Native module integration",
        "Push notifications",
        "Offline capabilities",
        "App store deployment"
      ]
    },
    {
      icon: FaCode,
      title: "Full Stack Development",
      description: "End-to-end development services for web applications. From frontend to backend, database to deployment, I handle all aspects of your project.",
      features: [
        "Full application architecture",
        "Frontend and backend integration",
        "Database management",
        "DevOps and CI/CD setup",
        "Ongoing maintenance and support"
      ]
    }
  ];

  return (
    <div name="services" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          Services
        </motion.h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <ServiceCard {...services[currentService]} />
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center mt-8">
          {services.map((_, index) => (
            <motion.button
              key={index}
              className={`mx-2 w-3 h-3 rounded-full ${index === currentService ? 'bg-blue-500' : 'bg-gray-500'}`}
              onClick={() => setCurrentService(index)}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;