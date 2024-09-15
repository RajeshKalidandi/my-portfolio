import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 Rajesh Kalidindi. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/RajeshKalidandi" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/rajesh-kalidandi/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:rajeshkalidindi2@gmail.com" className="hover:text-pink-600">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
