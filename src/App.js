import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import StatsSection from './components/StatsSection';
import CompanyLogos from './components/CompanyLogos';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <StatsSection />
      <CompanyLogos />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
      
      {/* Hidden div with relevant keywords for SEO */}
      <div style={{ display: 'none' }}>
        <h2>Rajesh Kalidandi - Full Stack Developer, AI & ML Engineer, Data Analyst</h2>
        <p>
          Expertise in Python, JavaScript, React, Node.js, TensorFlow, PyTorch, Data Analysis,
          Machine Learning, Deep Learning, Natural Language Processing, Computer Vision,
          Web Development, API Development, Database Management, Cloud Computing,
          Git, Agile Methodologies, Project Management
        </p>
      </div>
    </div>
  );
}

export default App;