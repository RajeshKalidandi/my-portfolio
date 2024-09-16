import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCertificate, FaPause, FaPlay } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const certifications = [
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    date: "February 10, 2024",
    details: "Representing approximately 300 hours of work"
  },
  {
    title: "Databricks Accd Generative AI Fundamentals",
    issuer: "Databricks Academy",
    date: "May 7, 2024",
    details: "Valid until May 7, 2026"
  },
  {
    title: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart Global Tech & Forage",
    date: "December 22, 2023"
  },
  {
    title: "Data Analytics and Visualization Job Simulation",
    issuer: "Ac Forage",
    date: "December 20, 2023"
  },
  {
    title: "Automation Starter",
    issuer: "UiPath",
    date: "August 5, 2024"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "January 21, 2023"
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "October 8, 2023"
  },
  {
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "March 4, 2024"
  },
  {
    title: "AWS Foundations",
    issuer: "AWS Training and Certification",
    date: "November 18, 2023"
  },
  {
    title: "Prompt Engineering for Everyone",
    issuer: "Cognitive Class.ai",
    date: "December 18, 2023"
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft and LinkedIn Learning",
    date: "February 20, 2024"
  },
  {
    title: "E-Commerce & Tech Quiz - Flipkart GRID 8.0",
    issuer: "Flipkart",
    date: "Participation Certificate"
  },
  {
    title: "Email Marketing Certified",
    issuer: "HubSpot Academy",
    date: "February 9, 2024",
    details: "Valid until March 10, 2026"
  },
  {
    title: "Sales Management Certification",
    issuer: "HubSpot Academy",
    date: "December 23, 2023",
    details: "Valid until January 21, 2025"
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "February 9, 2024"
  },
  {
    title: "Flipkart SCDA Warehousing Pre-Assessment",
    issuer: "Flipkart SCDA Academy",
    date: "December 12, 2023"
  }
];

const Certifications = () => {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setIndex((current) => (current + 1) % certifications.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const navigate = useCallback((dir) => {
    setIsAutoPlaying(false);
    setIndex((current) => {
      if (dir === 1) {
        return (current + 1) % certifications.length;
      } else {
        return current === 0 ? certifications.length - 1 : current - 1;
      }
    });
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section name="certifications" className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-gray-300 py-16 relative overflow-hidden">
      <Helmet>
        <title>Certifications - Rajesh Kalidandi</title>
        <meta name="description" content="Explore Rajesh Kalidandi's professional certifications in AI, ML, and Full Stack Development." />
        <meta name="keywords" content="Rajesh Kalidandi, Certifications, AI, ML, Full Stack Developer, Computer Science" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ItemList",
            "itemListElement": certifications.map((cert, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "EducationalOccupationalCredential",
                "name": cert.title,
                "educationalLevel": "Professional Certification",
                "credentialCategory": "Certificate",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": cert.issuer
                },
                "dateCreated": cert.date
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
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">Certifications</h2>
        <div className="relative" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 sm:p-8 shadow-xl"
            >
              <FaCertificate className="text-3xl sm:text-4xl text-blue-400 mb-4" aria-hidden="true" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">{certifications[index].title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">Issued by: {certifications[index].issuer}</p>
              <p className="text-gray-400 text-sm sm:text-base">Date: {certifications[index].date}</p>
              {certifications[index].details && (
                <p className="text-gray-400 mt-2 text-sm sm:text-base">{certifications[index].details}</p>
              )}
            </motion.div>
          </AnimatePresence>
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-gray-300 p-3 rounded-full hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous certification"
          >
            <FaChevronLeft size={24} />
          </button>
          <button 
            onClick={() => navigate(1)} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-gray-300 p-3 rounded-full hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next certification"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2" role="tablist">
          {certifications.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setIndex(i);
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                i === index ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to certification ${i + 1}`}
              aria-selected={i === index}
              role="tab"
            />
          ))}
        </div>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="mt-4 bg-gray-700 text-gray-300 p-2 rounded-full hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={isAutoPlaying ? "Pause auto-rotation" : "Start auto-rotation"}
        >
          {isAutoPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </section>
  );
};

export default Certifications;