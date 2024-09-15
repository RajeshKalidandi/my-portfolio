import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div name="about" className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <motion.div 
          className="pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">About Me</p>
        </motion.div>

        <motion.p 
          className="text-xl mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm a highly motivated Computer Science and Engineering student specializing in AI & ML at Malla Reddy Engineering College. 
          With hands-on experience in data analysis, software development, and AI/ML projects, I'm passionate about enhancing system 
          efficiency and designing innovative solutions.
        </motion.p>

        <motion.p 
          className="text-xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          My technical skills include programming in Python, Java, and web technologies, as well as expertise in AI & ML techniques 
          such as Generative AI, NLP, and Data Analysis. I'm proficient with frameworks like .NET, Next.js, and React, and have 
          experience with cloud platforms like Azure.
        </motion.p>

        <motion.p 
          className="text-xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          I'm seeking opportunities to leverage my technical skills and creative problem-solving abilities in challenging roles 
          that allow me to contribute to cutting-edge projects and drive impactful results.
        </motion.p>

        <motion.p 
          className="text-xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          With a diverse skill set and adaptable work style, I'm equipped to excel in various work arrangements, 
          including full-time positions, internships, remote work, part-time roles, freelance projects, 
          contract assignments, and hourly consultations. My ability to quickly learn and adapt makes me 
          an ideal candidate for dynamic and evolving work environments.
        </motion.p>
      </div>
    </div>
  );
};

export default About;
