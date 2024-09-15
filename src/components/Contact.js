import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        to_email: 'kalidandiirajesh@gmail.com'
      },
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((result) => {
        console.log(result.text);
        setFormData({ name: '', email: '', company: '', message: '' });
        setIsSubmitted(true);
      }, (error) => {
        console.log(error.text);
        alert('Oops! Something went wrong. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div name="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-800 p-4">
      <motion.div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-6"
        >
          Get in Touch
        </motion.h2>
        <AnimatePresence>
          {!isSubmitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
            >
              {['name', 'email', 'company'].map((field, index) => (
                <motion.div 
                  key={field} 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <label htmlFor={field} className="block text-gray-300 mb-2 capitalize">{field}</label>
                  <motion.input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required={field !== 'company'}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>
              ))}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  whileFocus="focus"
                  variants={inputVariants}
                ></motion.textarea>
              </motion.div>
              <motion.button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl text-white font-bold py-2 px-4 rounded transition duration-300"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p>Your message has been sent successfully. I'll get back to you soon.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className='flex justify-center space-x-6 mt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { href: "https://github.com/RajeshKalidandi", icon: FaGithub },
            { href: "https://www.linkedin.com/in/rajesh-kalidandi/", icon: FaLinkedin },
            { href: "mailto:rajeshkalidindi2@gmail.com", icon: FaEnvelope }
          ].map((link, index) => (
            <motion.a 
              key={index}
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='text-gray-300 hover:text-white transition-colors duration-300'
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <link.icon size={30} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;