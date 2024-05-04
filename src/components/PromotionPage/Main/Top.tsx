import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import styled from 'styled-components';
import mainBackgroundImgPath from '@/assets/images/mockup/test2.png';
import Circle from '../Circle/Circle';

const Top = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <Background
      style={{ backgroundImage: `url(${mainBackgroundImgPath})` }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: isInView ? 1 : 0.9, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <SloganWrapper
        ref={ref}
        initial={{ opacity: 0, y: '-50%', x: '-50%', scale: 0.5 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? '130%' : '50%', x: '-40%', scale: isInView ? 1 : 0.5 }} // 애니메이션 적용 후 상태 (화면 정중앙에서 보임)
        transition={{ duration: 1 }}
      >
        <BackWrapper>New Media Contents Group</BackWrapper>
        <NameWrapper>STUDIO EYE</NameWrapper>
      </SloganWrapper>
      <CircleWrapper>
        <Circle label='ABOUT STUDIO EYE' />
      </CircleWrapper>
    </Background>
  );
};

export default Top;

const Background = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SloganWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  bottom: -20%;
  left: -10%;
`;

const BackWrapper = styled.div`
  font-family: 'pretendard-bold';
  position: absolute;
  top: -20px;
  white-space: nowrap;
  font-size: 60px;
  color: rgba(255, 255, 255, 0.3);
`;

const NameWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 100px;
  z-index: 10;
  color: #ffa900;
`;

const CircleWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  right: 10%;
`;
