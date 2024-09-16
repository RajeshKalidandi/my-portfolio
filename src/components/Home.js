import React, { useState, useEffect, useCallback, lazy, Suspense, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const LazyImage = lazy(() => import('./LazyImage'));

const Home = () => {
  const jobTypes = useMemo(() => [
    "Full-time Roles", "Internships", "Remote Positions",
    "Part-time Opportunities", "Freelance Projects", 
    "Contract Work", "Hourly Consulting"
  ], []);

  const [currentJobType, setCurrentJobType] = useState(0);
  const [particleCount, setParticleCount] = useState(20);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobType((prev) => (prev + 1) % jobTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [jobTypes.length]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 10 : 20);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const imageX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const imageY = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);

  return (
    <section name="home" className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 relative overflow-hidden">
      <Helmet>
        <title>Rajesh Kalidandi | AI & ML Specialist | Full Stack Developer</title>
        <meta name="description" content="Rajesh Kalidandi: AI/ML specialist and Full Stack Developer with expertise in Python, React, and TensorFlow. Explore innovative projects in data analysis and software development." />
        <meta name="keywords" content="Rajesh Kalidandi, AI, Machine Learning, Full Stack Developer, Python, React, TensorFlow, Data Analysis, Software Development, Computer Science" />
        <meta name="author" content="Rajesh Kalidandi" />
        <link rel="canonical" href="https://www.rajeshkalidandi.netlify.app" />
        <meta property="og:title" content="Rajesh Kalidandi | AI & ML Specialist | Full Stack Developer" />
        <meta property="og:description" content="Discover the portfolio of Rajesh Kalidandi, an AI/ML specialist and Full Stack Developer. Explore innovative projects and cutting-edge solutions." />
        <meta property="og:image" content="https://www.rajeshkalidandi.netlify.app/og-image.jpg" />
        <meta property="og:url" content="https://www.rajeshkalidandi.netlify.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rajesh Kalidandi | AI/ML & Full Stack Dev" />
        <meta name="twitter:description" content="AI/ML specialist and Full Stack Developer showcasing innovative projects and tech solutions." />
        <meta name="twitter:image" content="https://www.rajeshkalidandi.netlify.app/twitter-image.jpg" />
      </Helmet>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(particleCount)].map((_, i) => (
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
      </div>
      
      <motion.div 
        className="max-w-screen-lg mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-12 md:flex-row relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col justify-center w-full md:w-1/2"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            I'm{' '}
            <motion.span 
              className="text-cyan-500 inline-block"
              animate={{ color: ['#06b6d4', '#3b82f6', '#06b6d4'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Rajesh Kalidandi
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-gray-300 text-sm sm:text-base md:text-lg mb-6"
            variants={itemVariants}
          >
            Computer Science & Engineering student specializing in AI & ML.
            Experienced in data analysis, software development, and innovative AI projects.
          </motion.p>

          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mb-6"
            variants={itemVariants}
          >
            Open to: 
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentJobType}
                className="text-cyan-500 ml-2 block sm:inline-block"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {jobTypes[currentJobType]}
              </motion.span>
            </AnimatePresence>
          </motion.h2>

          <motion.div variants={itemVariants} className="w-full sm:w-auto">
            <Link
              to="projects"
              smooth
              duration={500}
              className="group text-white text-sm sm:text-base md:text-lg w-full sm:w-fit px-4 sm:px-6 py-2 sm:py-3 my-2 flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:bg-gradient-to-l transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
              aria-label="View Projects"
            >
              View Projects
              <motion.span 
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight aria-hidden="true" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
          variants={itemVariants}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <LazyImage 
              src="/hero-section.png" 
              alt="Rajesh Kalidandi - AI & ML Specialist"
              className="rounded-2xl w-full max-w-md shadow-lg shadow-cyan-500/50"
              style={{
                x: imageX,
                y: imageY,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Suspense>
        </motion.div>
      </motion.div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          "name": "Rajesh Kalidandi",
          "jobTitle": "AI & ML Specialist, Full Stack Developer",
          "description": "Computer Science & Engineering student specializing in AI & ML, experienced in data analysis and innovative AI projects.",
          "url": "https://www.rajeshkalidandi.netlify.app",
          "sameAs": [
            "https://www.linkedin.com/in/rajesh-kalidandi/",
            "https://github.com/RajeshKalidandi"
          ],
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Malla Reddy Engineering College"
          },
          "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Full Stack Development",
            "Python",
            "React",
            "TensorFlow",
            "Data Analysis",
            "Software Development"
          ],
          "offers": jobTypes.map(type => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": type
            }
          }))
        })}
      </script>
    </section>
  );
};

export default Home;