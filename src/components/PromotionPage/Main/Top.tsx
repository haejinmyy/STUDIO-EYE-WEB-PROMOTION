import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaArrowDown } from 'react-icons/fa';

type Props = {
  backgroundImg: string;
};

const Top = ({ backgroundImg }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Background
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: isInView ? 1 : 0.9, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <SloganWrapper
        ref={ref}
        initial={{ opacity: 0, y: '100%' }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? '0%' : '100%',
        }}
        exit={{
          opacity: 0,
          y: '-100%'
        }}
        transition={{ duration: 1 }}
      >
        <NameWrapper>
          <span>
            <motion.div
              initial={{ y: '50%' }}
              animate={{ y: isInView ? '0%' : '50%' }}
              exit={{ y: '-50%' }}
              transition={{ duration: 1 }}
            >
              STUDIO
            </motion.div>
          </span>
          <span>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: isInView ? '0%' : '100%' }}
              exit={{ y: '-50%' }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              EYE
            </motion.div>
          </span>
        </NameWrapper>
        <BackWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          NEW MEDIA <br /> CONTENTS GROUP
        </BackWrapper>

      </SloganWrapper>
{/* 
      <ArrowWrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FaArrowDown size={130} color="white" />
        {isHovered && <ScrollDownText>SCROLL DOWN!</ScrollDownText>}
      </ArrowWrapper> */}
    </Background>
  );
};

export default Top;

const Background = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SloganWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BackWrapper = styled(motion.div)`
  font-family: 'pretendard-bold';
  position: relative;
  white-space: nowrap;
  font-size: 20px;
  color: white;
  letter-spacing: -0.02em;

`;

const NameWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 150px;
  z-index: 10;
  white-space: nowrap;
  overflow: hidden;
  span {
    display: inline-block;
    overflow: hidden;
  }
  div {
    display: inline-block;
  }
  span:first-child {
    color: white;
  }
  span:last-child {
    color: #ffa900;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    cursor: pointer;
    color: #ffa900;
  }
`;

const ScrollDownText = styled.span`
  text-align: right;
  color: white;
  font-size: 20px;
  font-family: 'pretendard-bold';
  position: relative;
`;
