import React from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedText = ({ children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  return <animated.div style={props}>{children}</animated.div>;
};

export default AnimatedText;