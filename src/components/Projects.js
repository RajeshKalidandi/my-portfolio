import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ProjectCard = ({ name, description, topics, html_url }) => (
  <motion.div 
    className="bg-gray-800 rounded-lg p-6 shadow-lg"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
    <p className="text-gray-300 mb-4">{description || "No description available."}</p>
    <div className="flex flex-wrap mb-4">
      {topics.map((tech, index) => (
        <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2">{tech}</span>
      ))}
    </div>
    <a 
      href={html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition duration-300"
    >
      View Project →
    </a>
  </motion.div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/RajeshKalidandi/repos');
        const sortedProjects = response.data
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6); // Get the 6 most recently updated projects
        setProjects(sortedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center text-white">Loading projects...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

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
          className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard 
                name={project.name} 
                description={project.description} 
                topics={project.topics} 
                html_url={project.html_url} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
