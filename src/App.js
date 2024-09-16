import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';

function App() {
  return (
    <div>
      <Home />
      <About />
      <Experience />
      <Skills />
      <Services />
      {/* Add any other components you have */}
    </div>
  );
}

export default App;