import React, { useState, useCallback, lazy, Suspense } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet';

const FaLinkedin = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaLinkedin })));
const FaGithub = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaGithub })));
const FaEnvelope = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaEnvelope })));

const Contact = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((event) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 15,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95, 
      rotateY: -15,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    rotateX: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const buttonGradient = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`
  );

  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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
  );

  const buttons = [
    { href: "https://www.linkedin.com/in/rajesh-kalidandi", icon: FaLinkedin, text: "Connect on LinkedIn", bgColor: "bg-blue-600", hoverColor: "bg-blue-700", ariaLabel: "Connect with Rajesh Kalidandi on LinkedIn" },
    { href: "https://github.com/RajeshKalidandi", icon: FaGithub, text: "Check GitHub", bgColor: "bg-gray-800", hoverColor: "bg-gray-700", ariaLabel: "View Rajesh Kalidandi's GitHub profile" },
    { href: "mailto:kalidandiirajesh@gmail.com", icon: FaEnvelope, text: "Send me an Email", bgColor: "bg-red-600", hoverColor: "bg-red-700", ariaLabel: "Send an email to Rajesh Kalidandi" }
  ];

  return (
    <section 
      name="contact" 
      className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-gray-300 py-16 relative overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
    >
      <Helmet>
        <title>Contact Rajesh Kalidandi - AI & ML Specialist | Full Stack Developer</title>
        <meta name="description" content="Get in touch with Rajesh Kalidandi, an AI & ML Specialist and Full Stack Developer. Connect on LinkedIn, check out GitHub projects, or send an email." />
        <meta name="keywords" content="Rajesh Kalidandi, Contact, AI, ML, Full Stack Developer, LinkedIn, GitHub, Email" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rajeshkalidandi.netlify.app/contact" />
        <meta property="og:title" content="Contact Rajesh Kalidandi - AI & ML Specialist | Full Stack Developer" />
        <meta property="og:description" content="Get in touch with Rajesh Kalidandi, an AI & ML Specialist and Full Stack Developer. Connect on LinkedIn, check out GitHub projects, or send an email." />
        <meta property="og:image" content="https://rajeshkalidandi.netlify.app/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rajeshkalidandi.netlify.app/contact" />
        <meta property="twitter:title" content="Contact Rajesh Kalidandi - AI & ML Specialist | Full Stack Developer" />
        <meta property="twitter:description" content="Get in touch with Rajesh Kalidandi, an AI & ML Specialist and Full Stack Developer. Connect on LinkedIn, check out GitHub projects, or send an email." />
        <meta property="twitter:image" content="https://rajeshkalidandi.netlify.app/og-image.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Person",
            "name": "Rajesh Kalidandi",
            "url": "https://rajeshkalidandi.netlify.app",
            "sameAs": [
              "https://www.linkedin.com/in/rajesh-kalidandi",
              "https://github.com/RajeshKalidandi"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "kalidandiirajesh@gmail.com",
              "contactType": "customer support"
            },
            "jobTitle": "AI & ML Specialist, Full Stack Developer",
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Malla Reddy Engineering College"
            },
            "knowsAbout": ["AI", "Machine Learning", "Full Stack Development", "Data Analysis", "Python", "React"]
          })}
        </script>
      </Helmet>

      <Particles />
      <div className="flex flex-col justify-center max-w-screen-lg mx-auto h-full px-4 relative z-10">
        <motion.div 
          className="pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold inline border-b-4 border-gray-500"
          >
            Let's Connect!
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="py-6 text-base sm:text-lg"
          >
            I'm always excited to collaborate and discuss new opportunities.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 sm:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {buttons.map((button, index) => (
            <motion.a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center ${button.bgColor} text-white px-4 sm:px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:${button.hoverColor} focus:${button.hoverColor} transition-all duration-300 w-full sm:w-64 relative overflow-hidden`}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate={floatAnimation}
              onHoverStart={() => setHoveredButton(index)}
              onHoverEnd={() => setHoveredButton(null)}
              aria-label={button.ariaLabel}
              tabIndex={0}
            >
              <Suspense fallback={<div className="w-6 h-6 mr-2" />}>
                <button.icon className="mr-2" aria-hidden="true" />
              </Suspense>
              {button.text}
              {hoveredButton === index && (
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: buttonGradient
                  }}
                />
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;