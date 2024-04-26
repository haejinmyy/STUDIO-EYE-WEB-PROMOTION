import React from 'react';
import { motion } from 'framer-motion';

function ScrollAnimatedComponent({ article }: string | any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        ease: 'easeInOut',
        duration: 2,
        y: { duration: 1 },
      }}
    >
      <div>{article}</div>
    </motion.div>
  );
}

export default ScrollAnimatedComponent;
