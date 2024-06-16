import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { getCompanyDetailData } from '@/apis/PromotionAdmin/dataEdit';

interface IWhatWeDoProps {
  isHighlighted: boolean;
}

interface IWhatWeDoInputProps {
  leftInput: boolean;
}

const WhatWeDoPage = () => {
  const [companyDetailDataTitle, setCompanyDetailDataTitle] = useState<string[]>([]);
  const [companyDetailData, setCompanyDetailData] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompanyDetailData = async () => {
      try {
        const responseData = await getCompanyDetailData();
        if (responseData) {
          const details = Array.isArray(responseData) ? responseData : [responseData];

          const dataKeys = details.map((detail) => detail.key);
          const dataValues = details.map((detail) => detail.value);

          setCompanyDetailDataTitle(dataKeys);
          setCompanyDetailData(dataValues);
        }
      } catch (error) {
        console.error('데이터 수신 오류:', error);
      }
    };

    fetchCompanyDetailData();
  }, []);

  const { scrollY } = useScroll(); // 스크롤 위치 감지

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

  if (companyDetailData.length === 0) {
    return null; // 데이터 로딩 중이면 아무것도 렌더링하지 않음
  }

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
              {companyDetailDataTitle[index].length >= 20 ? `WHAT WE DO ${index + 1}` : companyDetailDataTitle[index]}
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
  translate: -50%;
  width: 5px;
  height: 100%;
  background-color: #1a1a1a;
`;
const ScrollBarBox = styled(motion.div)`
  position: sticky;
  top: 50%;
  left: 50%;
  translate: -50%;
  width: 5px;
  height: 350px;
  background-color: #ffffff;
  z-index: 1000;
`;
const WhatWeDo = styled(motion.div)<IWhatWeDoProps>`
  position: relative;
  transform: translateX(-50%);
  width: 70%;
  height: auto;
  background-color: transparent;
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
  transition: all 0.2s;
  opacity: ${({ isHighlighted }) => (isHighlighted ? 1 : 0.2)};
  transition: all 300ms ease-in-out;
`;

const WhatWeDoInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 20px;
  display: flex;
  justify-content: ${({ leftInput }) => (leftInput ? 'flex-start' : 'flex-end')};
`;
const WhatWeDoTitleInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 30px;
  font-family: 'pretendard-semibold';
  font-size: 60px;
  text-align: ${({ leftInput }) => (leftInput ? 'left' : 'right')};
  word-wrap: break-word;
`;
const WhatWeDoContentInput = styled.div<IWhatWeDoInputProps>`
  margin-bottom: 8px;
  font-family: 'pretendard-regular';
  font-size: 24px;
  text-align: ${({ leftInput }) => (leftInput ? 'left' : 'right')};
  word-wrap: break-word;
  line-height: 1.5;
  white-space: pre-line;
`;
const Circle = styled.div`
  background-color: #ffa900;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
