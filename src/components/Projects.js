import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const ProjectCard = React.memo(({ name, description, topics, html_url }) => (
  <motion.div 
    className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-1"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5 }}
    whileHover={{ z: 50 }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{name}</h3>
    <p className="text-gray-300 mb-4 text-sm sm:text-base">{description || "No description available."}</p>
    <div className="flex flex-wrap mb-4">
      {topics.map((tech, index) => (
        <span key={index} className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs sm:text-sm mr-2 mb-2">{tech}</span>
      ))}
    </div>
    <motion.a 
      href={html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition duration-300 inline-block text-sm sm:text-base"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`View ${name} project on GitHub`}
    >
      View Project →
    </motion.a>
  </motion.div>
));

const SkeletonLoader = () => (
  <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg animate-pulse">
    <div className="h-6 sm:h-8 bg-gray-700 rounded mb-4"></div>
    <div className="h-4 bg-gray-700 rounded mb-2"></div>
    <div className="h-4 bg-gray-700 rounded mb-4"></div>
    <div className="flex flex-wrap mb-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-700 rounded-full h-5 sm:h-6 w-14 sm:w-16 mr-2 mb-2"></div>
      ))}
    </div>
    <div className="h-4 bg-gray-700 rounded w-20 sm:w-24"></div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [filter, setFilter] = useState('All');

  const fetchProjects = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const allTechnologies = useMemo(() => ['All', ...new Set(projects.flatMap(project => project.topics))], [projects]);

  const filteredProjects = useMemo(() => 
    filter === 'All' ? projects : projects.filter(project => project.topics.includes(filter)),
    [filter, projects]
  );

  const loadMore = useCallback(() => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  }, [filteredProjects.length]);

  const getMetaDescription = useCallback(() => {
    if (filter === 'All') {
      return "Explore Rajesh Kalidandi's recent projects in AI, ML, and Full Stack Development.";
    }
    return `Explore Rajesh Kalidandi's ${filter} projects, showcasing skills in AI, ML, and Full Stack Development.`;
  }, [filter]);

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
    <section name="projects" className="w-full min-h-screen text-gray-300 bg-gradient-to-b from-black to-gray-800 py-16">
      <Helmet>
        <title>{`Projects${filter !== 'All' ? ` - ${filter}` : ''} - Rajesh Kalidandi`}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={`Rajesh Kalidandi, Projects, ${filter}, AI, ML, Full Stack Developer, GitHub`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "CollectionPage",
            "name": "Rajesh Kalidandi's Projects",
            "description": "A collection of projects by Rajesh Kalidandi, showcasing skills in AI, ML, and Full Stack Development.",
            "url": "https://rajeshkalidandi.netlify.app/projects",
            "itemListElement": projects.map((project, index) => ({
              "@type": "SoftwareSourceCode",
              "position": index + 1,
              "name": project.name,
              "description": project.description,
              "codeRepository": project.html_url,
              "programmingLanguage": project.topics.join(", ")
            }))
          })}
        </script>
      </Helmet>
      
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <motion.div 
          className="pb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold inline border-b-4 border-gray-500">Projects</h2>
          <p className="py-6 text-base sm:text-lg">Check out some of my recent work</p>
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
              className={`m-1 sm:m-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${filter === tech ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter(tech)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-pressed={filter === tech}
              aria-label={`Filter projects by ${tech}`}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {loading 
              ? Array(6).fill().map((_, i) => <SkeletonLoader key={i} />)
              : filteredProjects.slice(0, visibleProjects).map((project) => (
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
            className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full mx-auto block text-sm sm:text-base"
            onClick={loadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default React.memo(Projects);
