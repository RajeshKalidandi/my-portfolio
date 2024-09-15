import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Home = () => {
  return (
    <div name="home" className="w-full h-screen bg-gradient-to-b from-black via-black to-gray-800">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <motion.div 
          className="flex flex-col justify-center h-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-7xl font-bold text-white">
            I'm <br />
            <span className="text-cyan-500">
              Rajesh Kalidandi
            </span>
          </h2>
          <p className="text-gray-500 py-4 max-w-md">
            Computer Science & Engineering student specializing in AI & ML.
            Experienced in data analysis, software development, and innovative AI projects.
          </p>
          <div>
            <Link
              to="projects"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
            >
              View Projects
              <span className="group-hover:rotate-90 duration-300 ml-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="/hero-section.png" 
            alt="Rajesh Kalidandi" 
            className="rounded-full w-2/3 md:w-full max-w-lg shadow-lg shadow-cyan-500/50"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;