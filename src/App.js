import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PageWrapper from './components/PageWrapper';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <PageWrapper>
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
          </PageWrapper>
        } />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;