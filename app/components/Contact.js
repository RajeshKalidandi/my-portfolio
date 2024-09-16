import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const LinkedInButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0077b5;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #005885;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
`;

function Contact() {
  return (
    <ContactWrapper>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Let's Connect!
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I'm always excited to collaborate and discuss new opportunities.
      </Subtitle>
      <LinkedInButton
        href="https://www.linkedin.com/in/rajesh-kalidandi"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <IconWrapper>
          <FaLinkedin />
        </IconWrapper>
        Connect on LinkedIn
      </LinkedInButton>
    </ContactWrapper>
  );
}

export default Contact;