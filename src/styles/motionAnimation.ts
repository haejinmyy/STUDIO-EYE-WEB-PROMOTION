import { TargetAndTransition } from 'framer-motion';

export const rotateAnimation: TargetAndTransition = {
  rotate: [0, 360],
  transition: {
    ease: 'linear',
    duration: 3,
    repeat: Infinity,
    repeatType: 'loop',
  },
};
