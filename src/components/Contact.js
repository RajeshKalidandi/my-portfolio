import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
        alert('Thank you for your message! I will get back to you soon.');
      }, (error) => {
        console.log(error.text);
        alert('Oops! Something went wrong. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div name="contact" className="min-h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-white mb-6"
        >
          Get in Touch
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-300 mb-2">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded h-32"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className='flex justify-center space-x-6 mt-8'>
          <a href="https://github.com/RajeshKalidandi" target="_blank" rel="noopener noreferrer" className='text-gray-300 hover:text-white'>
            <FaGithub size={30} />
          </a>
          <a href="https://www.linkedin.com/in/rajesh-kalidandi/" target="_blank" rel="noopener noreferrer" className='text-gray-300 hover:text-white'>
            <FaLinkedin size={30} />
          </a>
          <a href="mailto:rajeshkalidindi2@gmail.com" className='text-gray-300 hover:text-white'>
            <FaEnvelope size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;