import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const navItems = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

  return (
    <nav className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-gray-800 text-gray-300 z-10">
      <div>
        <h1 className="text-2xl font-bold">RK</h1>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li key={item}>
            <ScrollLink 
              to={item} 
              smooth={true} 
              duration={500} 
              spy={true}
              exact='true'
              offset={-80}
              className="hover:text-white px-4 cursor-pointer capitalize"
            >
              {item}
            </ScrollLink>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10 cursor-pointer">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-gray-800 flex flex-col justify-center items-center'}>
        {navItems.map((item) => (
          <li key={item} className="py-6 text-4xl">
            <ScrollLink 
              onClick={handleClick}
              to={item} 
              smooth={true} 
              duration={500}
              spy={true}
              exact='true'
              offset={-80}
            >
              {item}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;