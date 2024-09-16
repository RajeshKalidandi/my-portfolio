import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaPython, FaReact, FaGithub, FaJava, FaHtml5, FaCss3, FaNodeJs, FaJs } from 'react-icons/fa';
import { SiNextdotjs, SiOpenai, SiTailwindcss, SiMongodb, SiFirebase, SiPostman, SiMicrosoftazure } from 'react-icons/si';
import { BiData } from 'react-icons/bi';
import { BsKeyboard, BsCloudFill } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const SkillIcon = ({ icon: Icon, name, color, onClick }) => {
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-100, 100], [-90, 90]);

  return (
    <motion.div 
      className="flex flex-col items-center m-4 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      style={{ y }}
      onClick={onClick}
    >
      <motion.div
        style={{ rotate }}
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
};

const Skills = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const allSkills = [
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'Generative AI', icon: SiOpenai, color: '#412991' },
    { name: 'Prompt Engineering', icon: BsKeyboard, color: '#FF6B6B' },
    { name: 'Data Analysis', icon: BiData, color: '#4CAF50' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' },
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

  const importantSkills = allSkills.slice(0, 10);

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
            <motion.div 
              key={index} 
              variants={itemVariants}
              onClick={() => setSelectedSkill(skill)}
            >
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
                <motion.div 
                  key={index + importantSkills.length} 
                  variants={itemVariants}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <SkillIcon icon={skill.icon} name={skill.name} color={skill.color} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="bg-gray-800 p-6 rounded-lg max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <selectedSkill.icon className="text-6xl mb-4" style={{ color: selectedSkill.color }} />
                <h3 className="text-2xl font-bold mb-2">{selectedSkill.name}</h3>
                <p className="text-gray-300 mb-4">
                  {getSkillDescription(selectedSkill.name)}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setSelectedSkill(null)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper function to get skill descriptions
function getSkillDescription(skillName) {
  const descriptions = {
    'Python': 'A versatile programming language used for AI, data analysis, and web development.',
    'Generative AI': 'AI systems that can generate new content, like text, images, or music.',
    'Prompt Engineering': 'The art of crafting effective prompts for AI models to produce desired outputs.',
    'Data Analysis': 'The process of inspecting, cleansing, transforming, and modeling data to discover useful information.',
    // Add descriptions for other skills...
  };
  return descriptions[skillName] || 'A key technology in modern software development.';
}

export default Skills;