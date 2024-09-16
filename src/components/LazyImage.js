import React from 'react';
import { motion } from 'framer-motion';

const LazyImage = (props) => {
  return <motion.img {...props} />;
};

export default LazyImage;