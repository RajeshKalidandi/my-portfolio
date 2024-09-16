import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ExperienceCard = ({ item }) => {
  const isEducation = 'degree' in item;
  const icon = isEducation ? <FaGraduationCap size={40} color="rgb(233, 30, 99)" /> : <FaBriefcase size={40} color="rgb(33, 150, 243)" />;
  
  return (
    <motion.div
      className="experience-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '15px',
        padding: '30px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="icon-container" style={{ marginBottom: '20px' }}>{icon}</div>
      <h3 className="text-white text-2xl font-bold mb-4">{item.title || item.role || item.degree}</h3>
      <h4 className="text-gray-300 text-xl mb-2">{item.company || item.institution}</h4>
      <p className="text-gray-400 mb-4">{item.date || item.year}</p>
      {item.location && <p className="text-gray-400 mb-4">{item.location}</p>}
      {item.description && (
        Array.isArray(item.description) ? (
          <ul className="text-gray-400 list-disc list-inside">
            {item.description.map((desc, i) => (
              <li key={i} className="mb-2">{desc}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">{item.description}</p>
        )
      )}
    </motion.div>
  );
};

const Experience = () => {
  const [allItems, setAllItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/linkedin-data.json');
        const data = await response.json();
        const combinedItems = [
          ...data.experiences,
          ...data.education,
          ...data.experience
        ].sort((a, b) => {
          const dateA = new Date(a.date || a.year);
          const dateB = new Date(b.date || b.year);
          return dateB - dateA;
        });
        setAllItems(combinedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allItems.length) % allItems.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <section name='experience' className='w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-300 py-16'>
      <div className='max-w-screen-xl mx-auto p-4'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='pb-8 text-center'
        >
          <h2 className='text-4xl font-bold inline border-b-4 border-gray-500'>Experience & Education</h2>
          <p className='py-6 text-xl'>My professional journey and educational background</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <ExperienceCard key={currentIndex} item={allItems[currentIndex]} />
          </AnimatePresence>
          
          <motion.button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
          >
            <FaChevronLeft size={24} />
          </motion.button>
          
          <motion.button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
          >
            <FaChevronRight size={24} />
          </motion.button>
        </div>

        <div className="flex justify-center mt-8 flex-wrap">
          {allItems.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 mx-1 my-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-500'}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
