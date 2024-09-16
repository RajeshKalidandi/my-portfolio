import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaChevronLeft, FaChevronRight, FaSearch, FaList, FaClock } from 'react-icons/fa';

const ExperienceCard = ({ item, isTimeline }) => {
  const isEducation = 'degree' in item;
  const icon = isEducation ? <FaGraduationCap size={40} color="rgb(233, 30, 99)" /> : <FaBriefcase size={40} color="rgb(33, 150, 243)" />;
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      className={`experience-card ${isTimeline ? 'timeline-card' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        padding: '30px',
        width: '100%',
        maxWidth: isTimeline ? '400px' : '600px',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
        perspective: 1000,
        x, y, rotateX, rotateY, z: 100
      }}
      whileHover={{ scale: 1.05 }}
      drag={!isTimeline}
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <motion.div className="icon-container" style={{ marginBottom: '20px' }}>{icon}</motion.div>
      <motion.h3 className="text-white text-2xl font-bold mb-4">{item.title || item.role || item.degree}</motion.h3>
      <motion.h4 className="text-gray-300 text-xl mb-2">{item.company || item.institution}</motion.h4>
      <motion.p className="text-gray-400 mb-4">{item.date || item.year}</motion.p>
      {item.location && <motion.p className="text-gray-400 mb-4">{item.location}</motion.p>}
      {item.description && (
        Array.isArray(item.description) ? (
          <motion.ul className="text-gray-400 list-disc list-inside">
            {item.description.map((desc, i) => (
              <motion.li key={i} className="mb-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>{desc}</motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.p className="text-gray-400">{item.description}</motion.p>
        )
      )}
    </motion.div>
  );
};

const Experience = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTimeline, setIsTimeline] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewAll, setViewAll] = useState(false);

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
        setFilteredItems(combinedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allItems.filter(item => 
      (item.title || item.role || item.degree).toLowerCase().includes(term) ||
      (item.company || item.institution).toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
    setCurrentIndex(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <section name='experience' className='w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-300 py-16 relative overflow-hidden'>
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
      
      <div className='max-w-screen-xl mx-auto p-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='pb-8 text-center'
        >
          <h2 className='text-4xl font-bold inline border-b-4 border-gray-500'>Experience & Education</h2>
          <p className='py-6 text-xl'>My professional journey and educational background</p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <motion.button
            className={`mx-2 p-2 rounded-full ${isTimeline ? 'bg-blue-500' : 'bg-gray-700'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsTimeline(!isTimeline)}
          >
            {isTimeline ? <FaList /> : <FaClock />}
          </motion.button>
          <motion.button
            className={`mx-2 p-2 rounded-full ${viewAll ? 'bg-blue-500' : 'bg-gray-700'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? 'Slide View' : 'View All'}
          </motion.button>
          <motion.div className="relative mx-2">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search experiences..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </motion.div>
        </div>

        {viewAll ? (
          <div className={`grid ${isTimeline ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {filteredItems.map((item, index) => (
              <ExperienceCard key={index} item={item} isTimeline={isTimeline} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait">
              <ExperienceCard key={currentIndex} item={filteredItems[currentIndex]} isTimeline={isTimeline} />
            </AnimatePresence>
            
            <motion.button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
            >
              <FaChevronLeft size={24} />
            </motion.button>
            
            <motion.button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
            >
              <FaChevronRight size={24} />
            </motion.button>
          </div>
        )}

        {!viewAll && (
          <div className="flex justify-center mt-8 flex-wrap">
            {filteredItems.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 mx-1 my-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-500'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
