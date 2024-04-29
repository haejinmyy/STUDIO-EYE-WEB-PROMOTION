import React from 'react';
import circle from '@/assets/images/PP/circle.png';
import styled from 'styled-components';
import { motion, TargetAndTransition } from 'framer-motion';

type Props = {
  label: string;
};

const Circle = ({ label }: Props) => {
  const rotateAnimation: TargetAndTransition = {
    rotate: [0, 360],
    transition: {
      ease: 'linear',
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
    },
  };

  return (
    <Container>
      <RotatingWrapper animate={rotateAnimation}>
        <RotatingImage src={circle} alt='circle' />
      </RotatingWrapper>
      <LabelWrapper>{label}</LabelWrapper>
    </Container>
  );
};

export default Circle;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const LabelWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'pretendard-bold';
  font-size: 18px;
`;

const RotatingWrapper = styled(motion.div)`
  display: inline-block;
`;

const RotatingImage = styled(motion.img)`
  position: relative;
`;
