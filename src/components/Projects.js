import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

const ProjectCard = ({ project }) => {
  const [props, set] = useSpring(() => ({
    scale: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }));

  return (
    <animated.div
      style={props}
      onMouseEnter={() => set({ scale: 1.05, boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)' })}
      onMouseLeave={() => set({ scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' })}
      className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between h-full"
    >
      <div>
        <h3 className="text-2xl font-bold mb-3 text-pink-600">{project.name}</h3>
        <p className="text-gray-300 mb-4">{project.description || 'No description available'}</p>
      </div>
      <div>
        {project.language && (
          <p className="text-gray-400 mb-3">
            Main language: <span className="text-pink-600">{project.language}</span>
          </p>
        )}
        <div className="flex items-center flex-wrap">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="text-pink-600 inline-flex items-center md:mb-2 lg:mb-0 hover:text-pink-400 mr-4">
            <FaGithub className="mr-1" /> View on GitHub
          </a>
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-pink-600 inline-flex items-center md:mb-2 lg:mb-0 hover:text-pink-400">
              <FaExternalLinkAlt className="mr-1" /> Live Demo
            </a>
          )}
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Last updated: {new Date(project.updated_at).toLocaleDateString()}
        </p>
      </div>
    </animated.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/RajeshKalidandi/repos');
        const sortedProjects = response.data
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6);
        setProjects(sortedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div name='projects' className='w-full min-h-screen bg-gray-900 text-gray-300 py-16'>
      <div className='max-w-[1200px] mx-auto p-4'>
        <h2 className='text-4xl font-bold mb-8 border-b-4 border-pink-600 inline-block'>Projects</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
