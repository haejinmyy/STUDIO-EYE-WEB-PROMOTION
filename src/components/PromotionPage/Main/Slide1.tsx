import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import mainBackgroundImgPath from '@/assets/images/mockup/test2.png';
import sloganImgPath from '@/assets/images/mockup/test.png';

const Slide1 = () => {
  return (
    <Background>
      <motion.img
        src={sloganImgPath}
        alt='Slogan'
        initial={{ x: '100%', y: '100%' }}
        animate={{ x: '-30%', y: '130%' }}
        transition={{ duration: 3, type: 'spring' }}
        style={{
          position: 'absolute',
          top: '60%',
          left: '20%',
          width: '60%',
          objectFit: 'cover',
          backgroundColor: 'red',
        }}
      />
      하단버튼컴포넌트
      {/* 여기에 오른쪽 하단 스크롤 유도 컴포넌트 추가 */}
    </Background>
  );
};

export default Slide1;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${mainBackgroundImgPath});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
