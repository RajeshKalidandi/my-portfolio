import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';

const SocialLink = ({ href, icon: Icon, label, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors duration-300"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div style={{ position: 'relative' }}>
        <Icon size={24} />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                background: color,
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.a>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-900 to-black text-white py-12"
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
            <p className="text-sm">&copy; {currentYear} Rajesh Kalidandi. All rights reserved.</p>
          </motion.div>
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SocialLink href="https://github.com/RajeshKalidandi" icon={FaGithub} label="GitHub" color="#333" />
            <SocialLink href="https://www.linkedin.com/in/rajesh-kalidandi/" icon={FaLinkedin} label="LinkedIn" color="#0077B5" />
            <SocialLink href="mailto:kalidandiirajesh@gmail.com" icon={FaEnvelope} label="Email" color="#D44638" />
            <SocialLink href="https://x.com/RajeshKalidandi" icon={FaTwitter} label="Twitter" color="#1DA1F2" />
            <SocialLink href="https://www.instagram.com/iamkrish_007/" icon={FaInstagram} label="Instagram" color="#E1306C" />
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="flex items-center justify-center">
            Designed and built with 
            <motion.span 
              className="mx-1 text-red-500"
              animate={isHeartAnimating ? { scale: [1, 1.5, 1] } : {}}
              onMouseEnter={() => setIsHeartAnimating(true)}
              onAnimationComplete={() => setIsHeartAnimating(false)}
            >
              <FaHeart />
            </motion.span> 
            by Rajesh Kalidandi
          </p>
          <motion.p 
            className="mt-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.a 
              href="/privacy-policy" 
              className="hover:text-white transition-colors duration-300 mr-2"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            |
            <motion.a 
              href="/terms-of-service" 
              className="hover:text-white transition-colors duration-300 ml-2"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
