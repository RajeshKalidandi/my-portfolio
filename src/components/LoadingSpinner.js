import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';

const LoadingSpinner = ({ color = 'black', size = 50 }) => {
  const [showText, setShowText] = useState(false);

  const spin = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 1000 },
    loop: true,
  });

  const pulse = useSpring({
    from: { scale: 1 },
    to: { scale: 1.1 },
    config: config.wobbly,
    loop: { reverse: true },
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <animated.div style={pulse}>
        <animated.div
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 12.5,
            borderStyle: 'solid',
            borderColor: `lightgray lightgray lightgray ${color}`,
            ...spin,
          }}
        />
      </animated.div>
      {showText && (
        <animated.p 
          style={useSpring({ opacity: 1, from: { opacity: 0 } })}
          className="mt-4 font-semibold text-gray-600"
        >
          Loading...
        </animated.p>
      )}
    </div>
  );
};

export default LoadingSpinner;