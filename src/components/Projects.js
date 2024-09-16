import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ProjectCard = ({ name, description, topics, html_url }) => (
  <motion.div 
    className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-1"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5 }}
    whileHover={{ z: 50 }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
    <p className="text-gray-300 mb-4">{description || "No description available."}</p>
    <div className="flex flex-wrap mb-4">
      {topics.map((tech, index) => (
        <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2">{tech}</span>
      ))}
    </div>
    <motion.a 
      href={html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition duration-300 inline-block"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      View Project →
    </motion.a>
  </motion.div>
);

const SkeletonLoader = () => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg animate-pulse">
    <div className="h-8 bg-gray-700 rounded mb-4"></div>
    <div className="h-4 bg-gray-700 rounded mb-2"></div>
    <div className="h-4 bg-gray-700 rounded mb-4"></div>
    <div className="flex flex-wrap mb-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-700 rounded-full h-6 w-16 mr-2 mb-2"></div>
      ))}
    </div>
    <div className="h-4 bg-gray-700 rounded w-24"></div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [filter, setFilter] = useState('All');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.github.com/users/RajeshKalidandi/repos');
      const sortedProjects = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setProjects(sortedProjects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const allTechnologies = ['All', ...new Set(projects.flatMap(project => project.topics))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.topics.includes(filter));

  const loadMore = () => setVisibleProjects(prev => prev + 3);

  if (error) return (
    <div className="text-center text-red-500">
      {error}
      <motion.button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={fetchProjects}
      >
        Retry
      </motion.button>
    </div>
  );

  return (
    <div name="projects" className="w-full min-h-screen text-gray-300 bg-gradient-to-b from-black to-gray-800 py-16">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <motion.div 
          className="pb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">Projects</p>
          <p className="py-6">Check out some of my recent work</p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {allTechnologies.map((tech) => (
            <motion.button
              key={tech}
              className={`m-2 px-4 py-2 rounded-full ${filter === tech ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter(tech)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          <motion.div 
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {loading 
              ? Array(6).fill().map((_, i) => <SkeletonLoader key={i} />)
              : filteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <ProjectCard 
                    key={project.id}
                    name={project.name} 
                    description={project.description} 
                    topics={project.topics} 
                    html_url={project.html_url} 
                  />
                ))
            }
          </motion.div>
        </AnimatePresence>

        {!loading && visibleProjects < filteredProjects.length && (
          <motion.button
            className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full mx-auto block"
            onClick={loadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Projects;
