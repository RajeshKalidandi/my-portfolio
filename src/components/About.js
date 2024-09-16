import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div name="about" className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white relative overflow-hidden">
      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full relative z-10">
        <motion.div 
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
          className="pb-8"
        >
          <motion.p variants={itemVariants} className="text-4xl font-bold inline border-b-4 border-gray-500">
            About Me
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Staggered animation for paragraphs */}
          {[
            "I'm a highly motivated Computer Science and Engineering student specializing in AI & ML at Malla Reddy Engineering College. With hands-on experience in data analysis, software development, and AI/ML projects, I'm passionate about improving efficiency and designing innovative solutions.",
            "My technical skills include programming in Python, Java, and web technologies, as well as expertise in AI & ML techniques such as Generative AI, NLP, and Data Analysis. I'm proficient with frameworks like .NET, Next.js, and React, and have experience with cloud platforms like Azure.",
            "I'm seeking opportunities to leverage my technical skills and creative problem-solving abilities in challenging roles that allow me to contribute to cutting-edge projects and drive impactful results.",
            "With a diverse skill set and adaptable work style, I'm equipped to excel in various work arrangements, including full-time positions, internships, remote work, part-time roles, freelance projects, contract assignments, and hourly consultations. My ability to quickly learn and adapt makes me an ideal candidate for dynamic and evolving work environments."
          ].map((paragraph, index) => (
            <motion.p 
              key={index}
              variants={itemVariants}
              className="text-xl mt-4"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;