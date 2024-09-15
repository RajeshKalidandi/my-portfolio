import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPython, FaReact, FaGithub, FaJava, FaHtml5, FaCss3, FaNodeJs, FaJs } from 'react-icons/fa';
import { SiNextdotjs, SiOpenai, SiTailwindcss, SiMongodb, SiFirebase, SiPostman, SiMicrosoftazure } from 'react-icons/si';
import { BiData } from 'react-icons/bi';
import { BsKeyboard, BsCloudFill } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const SkillIcon = ({ icon: Icon, name, color }) => (
  <motion.div 
    className="flex flex-col items-center m-4"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      <Icon className="text-4xl mb-2" style={{ color }} />
    </motion.div>
    <motion.span 
      className="text-sm text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {name}
    </motion.span>
  </motion.div>
);

const Skills = () => {
  const [showAll, setShowAll] = useState(false);

  const importantSkills = [
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'Generative AI', icon: SiOpenai, color: '#412991' },
    { name: 'Prompt Engineering', icon: BsKeyboard, color: '#FF6B6B' },
    { name: 'Data Analysis', icon: BiData, color: '#4CAF50' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' },
  ];

  const allSkills = [
    ...importantSkills,
    { name: 'Java', icon: FaJava, color: '#007396' },
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3, color: '#1572B6' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'NLP', icon: GiArtificialIntelligence, color: '#FF4081' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
    { name: 'Azure', icon: SiMicrosoftazure, color: '#0089D6' },
    { name: 'Cloud Computing', icon: BsCloudFill, color: '#4285F4' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { name: 'Machine Learning', icon: FaPython, color: '#FF9800' },
    { name: 'SQL', icon: AiOutlineConsoleSql, color: '#03A9F4' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div name="skills" className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white py-16">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <motion.div 
          className="pb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">Skills</p>
          <p className="py-6">These are the technologies I've worked with</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {importantSkills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <SkillIcon icon={skill.icon} name={skill.name} color={skill.color} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? 'Show Less' : 'Show All Skills'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showAll && (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {allSkills.slice(importantSkills.length).map((skill, index) => (
                <motion.div key={index + importantSkills.length} variants={itemVariants}>
                  <SkillIcon icon={skill.icon} name={skill.name} color={skill.color} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills;
