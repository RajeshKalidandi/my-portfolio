import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaInstagram } from 'react-icons/fa';

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-300"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={24} />
    <span className="sr-only">{label}</span>
  </motion.a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-gradient-to-b from-black to-gray-800 text-white py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-sm">&copy; {currentYear} Rajesh Kalidindi. All rights reserved.</p>
          </motion.div>
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SocialLink href="https://github.com/RajeshKalidandi" icon={FaGithub} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/rajesh-kalidandi/" icon={FaLinkedin} label="LinkedIn" />
            <SocialLink href="mailto:kalidandiirajesh@gmail.com" icon={FaEnvelope} label="Email" />
            <SocialLink href="https://x.com/RajeshKalidandi" icon={FaTwitter} label="Twitter" />
            <SocialLink href="https://www.instagram.com/iamkrish_007/" icon={FaInstagram} label="Instagram" />
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p>Designed and built with ❤️ by Rajesh Kalidandi</p>
          <p className="mt-2">
            <a href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            {' | '}
            <a href="/terms-of-service" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
