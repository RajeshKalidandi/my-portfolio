import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaPython, FaReact, FaGithub, FaJava, FaHtml5, FaCss3, FaNodeJs, FaJs } from 'react-icons/fa';
import { SiNextdotjs, SiOpenai, SiTailwindcss, SiMongodb, SiFirebase, SiPostman, SiMicrosoftazure } from 'react-icons/si';
import { BiData } from 'react-icons/bi';
import { BsKeyboard, BsCloudFill } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { Helmet } from 'react-helmet';
import { FixedSizeGrid as Grid } from 'react-window';

const SkillIcon = React.memo(({ icon: Icon, name, color, onClick, ariaLabel }) => {
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-100, 100], [-90, 90]);

  return (
    <motion.div 
      className="flex flex-col items-center m-2 sm:m-4 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      style={{ y }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
      <motion.div
        style={{ rotate }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="text-3xl sm:text-4xl mb-2" style={{ color }} aria-hidden="true" />
      </motion.div>
      <motion.span 
        className="text-xs sm:text-sm text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
});

const Skills = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const allSkills = useMemo(() => [
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
  ], []);

  const importantSkills = useMemo(() => allSkills.slice(0, 10), [allSkills]);

  const filteredSkills = useMemo(() => 
    allSkills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [allSkills, searchTerm]
  );

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

  const handleSkillClick = useCallback((skill) => {
    setSelectedSkill(skill);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && selectedSkill) {
      setSelectedSkill(null);
    }
  }, [selectedSkill]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Helper function to get skill descriptions
  const getSkillDescription = useCallback((skillName) => {
    const descriptions = {
      'Python': 'A versatile programming language used for AI, data analysis, and web development.',
      'Generative AI': 'AI systems that can generate new content, like text, images, or music.',
      'Prompt Engineering': 'The art of crafting effective prompts for AI models to produce desired outputs.',
      'Data Analysis': 'The process of inspecting, cleansing, transforming, and modeling data to discover useful information.',
      // Add descriptions for other skills...
    };
    return descriptions[skillName] || 'A key technology in modern software development.';
  }, []);

  const getMetaDescription = useCallback(() => {
    if (selectedSkill) {
      return `Learn about ${selectedSkill.name} - ${getSkillDescription(selectedSkill.name)}`;
    }
    return "Explore Rajesh Kalidandi's technical skills in AI, ML, and Full Stack Development.";
  }, [selectedSkill, getSkillDescription]);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 5 + columnIndex;
    const skill = filteredSkills[index];
    if (!skill) return null;
    return (
      <div style={style}>
        <SkillIcon 
          icon={skill.icon} 
          name={skill.name} 
          color={skill.color} 
          onClick={() => handleSkillClick(skill)}
          ariaLabel={`${skill.name}: ${getSkillDescription(skill.name)}`}
        />
      </div>
    );
  };

  return (
    <section name="skills" className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-300 py-16 relative overflow-hidden">
      <Helmet>
        <title>{selectedSkill ? `${selectedSkill.name} - Skills` : 'Skills'} - Rajesh Kalidandi</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={`Rajesh Kalidandi, Skills, ${selectedSkill ? selectedSkill.name + ',' : ''} AI, ML, Full Stack Developer`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ItemList",
            "itemListElement": allSkills.map((skill, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Thing",
                "name": skill.name,
                "description": getSkillDescription(skill.name)
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Dynamic background particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
      
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full relative z-10">
        <motion.div 
          className="pb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold inline border-b-4 border-gray-500">Skills</h2>
          <p className="py-6 text-gray-300 text-base sm:text-lg">These are the technologies I've worked with</p>
        </motion.div>

        {showAll && (
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {showAll ? (
          <Grid
            columnCount={5}
            columnWidth={200}
            height={600}
            rowCount={Math.ceil(filteredSkills.length / 5)}
            rowHeight={100}
            width={1000}
          >
            {Cell}
          </Grid>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {importantSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
              >
                <SkillIcon icon={skill.icon} name={skill.name} color={skill.color} onClick={() => handleSkillClick(skill)} ariaLabel={`${skill.name}: ${getSkillDescription(skill.name)}`} />
              </motion.div>
            ))}
          </motion.div>
        )}

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
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="bg-gray-800 p-6 rounded-lg max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <selectedSkill.icon className="text-5xl sm:text-6xl mb-4 mx-auto" style={{ color: selectedSkill.color }} aria-hidden="true" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{selectedSkill.name}</h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  {getSkillDescription(selectedSkill.name)}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                  onClick={() => setSelectedSkill(null)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(Skills);