import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && nav) {
      setNav(false);
    }
  }, [nav]);

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
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": "Rajesh Kalidandi Portfolio Navigation",
            "url": "https://rajeshkalidandi.netlify.app",
            "itemListElement": links.map((item, index) => ({
              "@type": "SiteNavigationElement",
              "position": index + 1,
              "name": item.link.charAt(0).toUpperCase() + item.link.slice(1),
              "url": `https://rajeshkalidandi.netlify.app/#${item.link}`
            }))
          })}
        </script>
      </Helmet>

      <motion.nav 
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
            <strong>RK</strong>
          </motion.h1>
        </div>

        <ul className="hidden md:flex">
          {links.map(({ id, link }) => (
            <motion.li
              key={id}
              className={`px-4 cursor-pointer ${
                activeSection === link ? 'text-cyan-500' : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={link} 
                smooth 
                duration={500} 
                spy={true} 
                activeClass="active"
                aria-current={activeSection === link ? "page" : undefined}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            </motion.li>
          ))}
          <motion.li 
            className="px-4 cursor-pointer capitalize font-medium text-gray-300 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/RajeshKalidandi_2024_Updated.pdf" 
              download 
              className="flex items-center"
              aria-label="Download Resume"
            >
              Resume <BsFillPersonLinesFill size={20} className="ml-1" />
            </a>
          </motion.li>
        </ul>

        <button
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-300 md:hidden"
          aria-label={nav ? "Close menu" : "Open menu"}
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>

        <AnimatePresence>
          {nav && (
            <motion.ul 
              className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-300"
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
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
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                className="px-4 cursor-pointer capitalize py-6 text-4xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="/RajeshKalidandi_2024_Updated.pdf" 
                  download 
                  className="flex items-center"
                  onClick={() => setNav(!nav)}
                  aria-label="Download Resume"
                >
                  Resume <BsFillPersonLinesFill size={30} className="ml-2" />
                </a>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default React.memo(Navbar);