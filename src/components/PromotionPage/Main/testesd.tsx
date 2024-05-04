import React, { useRef } from 'react';
import styled from 'styled-components';

import scrollDown from '@/assets/images/PP/scrollDown.png';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

type Props = {
  backgroundImg: string;
  clientName: string;
  title: string;
};

const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const ArtworkList = ({ backgroundImg, clientName, title }: Props) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  return (
    <Container ref={ref} backgroundImage={backgroundImg}>
      <BottomContainer>
        <DesWrapper>
          <ClientWrapper style={{ y }}>{clientName}</ClientWrapper>
          <TitleWrapper>{title}</TitleWrapper>
        </DesWrapper>
        <ScrollWrapper>
          show more artworks <ScrollDownImg src={scrollDown} alt='scroll down' />
        </ScrollWrapper>
      </BottomContainer>
    </Container>
  );
};

export default ArtworkList;

const Container = styled.div<{ backgroundImage: string }>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  box-sizing: border-box;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  padding: 40px 100px;
  background-color: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(15px);
  align-items: center;
  justify-content: space-between;
`;

const DesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const ClientWrapper = styled(motion.h2)`
  font-family: 'pretendard-bold';
  font-size: 28px;
  color: #d7d7d7;
`;
const TitleWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 64px;
  color: white;
  margin-top: 15px;
  white-space: nowrap;
`;
const ScrollWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ScrollDownImg = styled.img`
  margin-left: 15px;
`;
