import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPython, FaReact, FaGithub, FaJava, FaHtml5, FaCss3, FaNodeJs, FaJs } from 'react-icons/fa';
import { SiNextdotjs, SiOpenai, SiTailwindcss, SiMongodb, SiFirebase, SiPostman, SiMicrosoftazure } from 'react-icons/si';
import { BiData } from 'react-icons/bi';
import { BsKeyboard, BsCloudFill } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const SkillIcon = ({ icon: Icon, name, color }) => (
  <div className="flex flex-col items-center m-4">
    <Icon className="text-4xl mb-2" style={{ color }} />
    <span className="text-sm">{name}</span>
  </div>
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

  return (
    <div name="skills" className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Skills</h2>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {importantSkills.map((skill, index) => (
            <SkillIcon key={index} icon={skill.icon} name={skill.name} color={skill.color} />
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {showAll ? 'Show Less' : 'Show All Skills'}
          </button>
        </div>
        <AnimatePresence>
          {showAll && (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {allSkills.slice(importantSkills.length).map((skill, index) => (
                <SkillIcon key={index + importantSkills.length} icon={skill.icon} name={skill.name} color={skill.color} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills;
