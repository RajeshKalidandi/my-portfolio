import React, { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

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
    <div className="absolute inset-0 overflow-hidden">
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
    </div>
  );

  const buttons = [
    { href: "https://www.linkedin.com/in/rajesh-kalidandi", icon: FaLinkedin, text: "Connect on LinkedIn", bgColor: "bg-blue-600", hoverColor: "bg-blue-700" },
    { href: "https://github.com/RajeshKalidandi", icon: FaGithub, text: "Check GitHub", bgColor: "bg-gray-800", hoverColor: "bg-gray-700" },
    { href: "mailto:kalidandiirajesh@gmail.com", icon: FaEnvelope, text: "Send me an Email", bgColor: "bg-red-600", hoverColor: "bg-red-700" }
  ];

  return (
    <section 
      name="contact" 
      className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-gray-300 py-16 relative overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
    >
      <Particles />
      <div className="flex flex-col justify-center max-w-screen-lg mx-auto h-full relative z-10">
        <motion.div 
          className="pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold inline border-b-4 border-gray-500"
          >
            Let's Connect!
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="py-6"
          >
            I'm always excited to collaborate and discuss new opportunities.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center space-y-6"
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
              className={`flex items-center justify-center ${button.bgColor} text-white px-6 py-3 rounded-full text-lg font-semibold hover:${button.hoverColor} transition-all duration-300 w-64 relative overflow-hidden`}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate={floatAnimation}
              onHoverStart={() => setHoveredButton(index)}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <button.icon className="mr-2" /> {button.text}
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