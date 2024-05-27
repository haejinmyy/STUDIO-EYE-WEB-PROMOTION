import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface IWhatWeDoProps {
  isHighlighted: boolean;
}
interface IWhatWeDoInputProps {
  leftInput: boolean;
}

const WhatWeDoPage = () => {
  const [companyDetailDataTitle, setCompanyDetailDataTitle] = useState<string[]>([]);
  const [companyDetailData, setCompanyDetailData] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get('http://3.36.95.109:8080/api/company/detail')
      .then((response) => {
        const responseData = response.data.data;
        const dataKeys: string[] = Object.keys(responseData);
        const dataValues: string[] = Object.values(responseData);
        setCompanyDetailDataTitle(dataKeys);
        setCompanyDetailData(dataValues);
      })
      .catch((error) => {
        console.error('데이터 수신 오류:', error);
      });
  }, []);

  const { scrollY } = useScroll(); // 스크롤 위치 감지
  const [highlighted, setHighlighted] = useState<number | null>(null);

  useMotionValueEvent(scrollY, 'change', (scrollValue) => {
    const sections = document.querySelectorAll('.WhatWeDo');
    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
      if (distanceFromCenter < closestDistance) {
        closestDistance = distanceFromCenter;
        closestSection = index;
      }
    });

    setHighlighted(closestSection);
  });

  return (
    <Container>
      <WhatWeDoContainer>
        {companyDetailData.map((info, index) => (
          <WhatWeDo
            key={index}
            className='WhatWeDo'
            isHighlighted={highlighted === index}
            style={{ left: index % 2 === 0 ? '10%' : '90%' }}
          >
            <WhatWeDoInput leftInput={index % 2 === 0}>
              <Circle />
            </WhatWeDoInput>
            <WhatWeDoTitleInput leftInput={index % 2 !== 0}>
              {companyDetailDataTitle[index].length >= 10 ? `WHAT WE DO ${index + 1}` : companyDetailDataTitle[index]}
            </WhatWeDoTitleInput>
            <WhatWeDoContentInput leftInput={index % 2 !== 0}>{info}</WhatWeDoContentInput>
          </WhatWeDo>
        ))}

        <ScrollBar>
          <ScrollBarBox />
        </ScrollBar>
      </WhatWeDoContainer>
    </Container>
  );
};

export default WhatWeDoPage;

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 150px;
`;

const WhatWeDoContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
`;

const ScrollBar = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  translatex: -50%;
  width: 5px;
  height: 100%;
  background-color: #1a1a1a;
`;
const ScrollBarBox = styled(motion.div)`
  position: sticky;
  top: 50%;
  left: 50%;
  translatex: -50%;
  width: 5px;
  height: 350px;
  background-color: #ffffff;
  z-index: 1000;
`;
const WhatWeDo = styled(motion.div)<IWhatWeDoProps>`
  position: relative;
  transform: translateX(-50%);
  width: 65%;
  height: auto;
  background-color: transparent;
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
  transition: all 0.2s;
  opacity: ${({ isHighlighted }) => (isHighlighted ? 1 : 0.2)};
`;

const WhatWeDoInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 20px;
  display: flex;
  justify-content: ${({ leftInput }) => (leftInput ? 'flex-start' : 'flex-end')};
`;
const WhatWeDoTitleInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 30px;
  display: flex;
  font-family: 'pretendard-semibold';
  font-size: 70px;
  justify-content: ${({ leftInput }) => (leftInput ? 'flex-start' : 'flex-end')};
`;
const WhatWeDoContentInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 8px;
  font-family: 'pretendard-regular';
  font-size: 24px;
  text-align: ${({ leftInput }) => (leftInput ? 'left' : 'right')};
  word-wrap: break-word;
`;
const Circle = styled.div`
  background-color: #ffa900;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
