import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { FaChevronLeft, FaChevronRight, FaCertificate } from 'react-icons/fa';

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
  const [direction, setDirection] = useState(1);

  const props = useSpring({
    opacity: 1,
    transform: 'translate3d(0%, 0, 0) rotateY(0deg)',
    from: { opacity: 0, transform: `translate3d(${direction * 100}%, 0, 0) rotateY(${direction * 90}deg)` },
    reset: true,
    config: { ...config.molasses, tension: 120, friction: 14 },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % certifications.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const navigate = (dir) => {
    setDirection(dir);
    setIndex((current) => {
      if (dir === 1) {
        return (current + 1) % certifications.length;
      } else {
        return current === 0 ? certifications.length - 1 : current - 1;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white py-16 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Certifications
        </h2>
        <div className="relative perspective-1000">
          <animated.div 
            style={{
              ...props,
              boxShadow: props.opacity.to(o => `0 ${10 * o}px ${20 * o}px rgba(0, 0, 0, 0.3)`),
            }} 
            className="bg-gray-800 rounded-lg p-8 transform-style-3d"
          >
            <FaCertificate className="text-6xl text-cyan-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{certifications[index].title}</h3>
            <p className="text-gray-300">Issued by: {certifications[index].issuer}</p>
            <p className="text-gray-400">Date: {certifications[index].date}</p>
            {certifications[index].details && (
              <p className="text-gray-400 mt-2">{certifications[index].details}</p>
            )}
          </animated.div>
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FaChevronLeft size={24} />
          </button>
          <button 
            onClick={() => navigate(1)} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {certifications.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? 'bg-cyan-400 scale-125' : 'bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;