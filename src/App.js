import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CompanyLogos from './components/CompanyLogos';
import StatsSection from './components/StatsSection';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Services />
      <StatsSection />
      <CompanyLogos />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;