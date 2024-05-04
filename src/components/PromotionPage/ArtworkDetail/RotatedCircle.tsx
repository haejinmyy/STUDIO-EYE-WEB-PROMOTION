import React from 'react';
import circle from '@/assets/images/PP/circle.png';
import styled from 'styled-components';
import { motion, TargetAndTransition } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Props = {
  label: string;
  link: string;
};

const RotatedCircle = ({ label, link }: Props) => {
  const navigator = useNavigate();
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
    <Container href={link} target='_blank'>
      <RotatingWrapper animate={rotateAnimation}>
        <RotatingImage src={circle} alt='circle' />
      </RotatingWrapper>
      <LabelWrapper>{label}</LabelWrapper>
    </Container>
  );
};

export default RotatedCircle;

const Container = styled.a`
  position: relative;
  display: inline-block;
  border-radius: 100%;
  color: ${(props) => props.theme.color.white.bold};
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
