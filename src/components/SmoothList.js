import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SmoothList = ({ items }) => (
  <AnimatePresence>
    {items.map(item => (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {item.content}
      </motion.div>
    ))}
  </AnimatePresence>
);

export default SmoothList;