import React from 'react';
import { useSpring, animated } from 'react-spring';

const LoadingSpinner = () => {
  const spin = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 1000 },
    loop: true,
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <animated.div
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          borderWidth: 4,
          borderStyle: 'solid',
          borderColor: 'lightgray lightgray lightgray black',
          ...spin,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;