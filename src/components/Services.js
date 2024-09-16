import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaServer, FaMobile, FaCode, FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Helmet } from 'react-helmet';

const ServiceCard = React.memo(({ icon: Icon, title, description, features }) => (
  <motion.div 
    className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 sm:p-8 shadow-lg"
    whileHover={{ scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="flex items-center mb-4 sm:mb-6">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="text-3xl sm:text-4xl text-blue-400 mr-3 sm:mr-4" aria-hidden="true" />
      </motion.div>
      <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{description}</p>
    <ul className="text-gray-300 mb-4 sm:mb-6 list-disc list-inside text-sm sm:text-base">
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaLinkedin className="mr-2" aria-hidden="true" /> Message on LinkedIn
      </motion.a>
      <motion.a 
        href="mailto:kalidandiirajesh@gmail.com?subject=Service%20Inquiry&body=I'm%20interested%20in%20your%20services.%20Can%20we%20discuss%20further?"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MdEmail className="mr-2" aria-hidden="true" /> Send Email
      </motion.a>
    </div>
  </motion.div>
));

const Services = () => {
  const [currentService, setCurrentService] = useState(0);
  const services = useMemo(() => [
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
  ], []);

  const nextService = useCallback(() => {
    setCurrentService((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const prevService = useCallback(() => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') nextService();
    if (e.key === 'ArrowLeft') prevService();
  }, [nextService, prevService]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section name="services" className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-gray-300 py-16 relative overflow-hidden">
      <Helmet>
        <title>Services - Rajesh Kalidandi</title>
        <meta name="description" content="Explore the services offered by Rajesh Kalidandi including SaaS Product Frontend Development, Backend Development, Mobile App Development, and Full Stack Development." />
        <meta name="keywords" content="Rajesh Kalidandi, Services, Frontend Development, Backend Development, Mobile App Development, Full Stack Development" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((service, index) => ({
              "@type": "Service",
              "position": index + 1,
              "name": service.title,
              "description": service.description,
              "provider": {
                "@type": "Person",
                "name": "Rajesh Kalidandi"
              }
            }))
          })}
        </script>
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
      
      <div className="max-w-screen-lg mx-auto px-4 py-12 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12"
        >
          Services
        </motion.h2>
        <div className="relative">
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
          <motion.button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-gray-800 text-white p-2 rounded-full sm:hover:bg-gray-700"
            onClick={prevService}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous service"
          >
            <FaChevronLeft />
          </motion.button>
          <motion.button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-gray-800 text-white p-2 rounded-full sm:hover:bg-gray-700"
            onClick={nextService}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next service"
          >
            <FaChevronRight />
          </motion.button>
        </div>
        <div className="flex justify-center mt-6 sm:mt-8">
          {services.map((_, index) => (
            <motion.button
              key={index}
              className={`mx-1 sm:mx-2 w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentService ? 'bg-blue-500' : 'bg-gray-500'}`}
              onClick={() => setCurrentService(index)}
              whileHover={{ scale: 1.5 }}
              aria-label={`Go to service ${index + 1}`}
              aria-current={index === currentService ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Services);