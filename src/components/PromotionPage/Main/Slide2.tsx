import { motion, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Circle from '../Circle/Circle';
const Slide2 = () => {
  const introRef = useRef(null);
  const desRef = useRef(null);
  const circleRef = useRef(null);

  const introInView = useInView(introRef);
  const desInView = useInView(desRef);
  const circleInView = useInView(circleRef);

  return (
    <Container>
      <IntroWrapper ref={introRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: introInView ? 1 : 0, y: introInView ? 0 : 100 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <YellowText>STUDIO EYE</YellowText> IS THE <YellowText>BEST</YellowText> <br />
          NEW MEDIA PRODUCTION BASED ON OTT & YOUTUBE
        </motion.div>
      </IntroWrapper>
      <DesWrapper ref={desRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: desInView ? 1 : 0, y: desInView ? 0 : 100 }}
          transition={{ duration: 2, delay: 0.6 }}
        >
          우리는 급변하는 뉴 미디어 시대를 반영한 콘텐츠 제작을 위해 끊임없이 고민하고 변화합니다.
        </motion.div>
      </DesWrapper>
      <CircleWrapper ref={circleRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: circleInView ? 1 : 0, y: circleInView ? 0 : 100 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Circle label='ABOUT STUDIO EYE' />
        </motion.div>
      </CircleWrapper>
    </Container>
  );
};
export default Slide2;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  line-height: normal;
`;
const IntroWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 48px;
  text-align: center;
`;

const YellowText = styled.span`
  color: #ffa900;
`;
const DesWrapper = styled.div`
  font-size: 20px;
  font-family: 'pretendard-bold';
  margin-top: 54px;
`;
const CircleWrapper = styled(motion.div)`
  margin-top: 102px;
`;
const Cidd = styled.div``;
