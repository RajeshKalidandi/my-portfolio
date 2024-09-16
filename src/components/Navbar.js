import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;

      setScrolled(isScrolled);
      setScrollProgress(currentProgress);

      // Determine active section
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact', 'services'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && window.scrollY >= section.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 1, link: 'home' },
    { id: 2, link: 'about' },
    { id: 3, link: 'projects' },
    { id: 4, link: 'skills' },
    { id: 5, link: 'experience' },
    { id: 6, link: 'contact' },
    { id: 7, link: 'services' }
  ];

  return (
    <motion.div 
      className={`flex justify-between items-center w-full h-20 px-4 text-white fixed z-50 transition-all duration-300 ${
        scrolled ? 'bg-black bg-opacity-90' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute top-0 left-0 h-1 bg-cyan-500"
        style={{ width: `${scrollProgress}%` }}
      />

      <div>
        <motion.h1 
          className="text-5xl font-signature ml-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <bold>RK</bold>
        </motion.h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <motion.li
            key={id}
            className={`px-4 cursor-pointer ${
              activeSection === link ? 'text-cyan-500' : 'text-gray-500 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={link} smooth duration={500} spy={true} activeClass="active">
              {link}
            </Link>
          </motion.li>
        ))}
        <motion.li 
          className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="RajeshKalidandi_2024_Updated.pdf" 
            download 
            className="flex items-center"
          >
            Resume <BsFillPersonLinesFill size={20} className="ml-1" />
          </a>
        </motion.li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      <AnimatePresence>
        {nav && (
          <motion.ul 
            className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            {links.map(({ id, link }) => (
              <motion.li
                key={id}
                className={`px-4 cursor-pointer capitalize py-6 text-4xl ${
                  activeSection === link ? 'text-cyan-500' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  onClick={() => setNav(!nav)}
                  to={link}
                  smooth
                  duration={500}
                  spy={true}
                  activeClass="active"
                >
                  {link}
                </Link>
              </motion.li>
            ))}
            <motion.li
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/path-to-your-resume.pdf" 
                download 
                className="flex items-center"
                onClick={() => setNav(!nav)}
              >
                Resume <BsFillPersonLinesFill size={30} className="ml-2" />
              </a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;