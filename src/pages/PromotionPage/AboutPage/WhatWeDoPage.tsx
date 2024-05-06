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
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // 데이터 수신
    axios
      .get('http://3.36.95.109:8080/api/company/detail')
      .then((response) => {
        const responseData = response.data.data; // 응답 데이터 가져오기
        const dataValues: string[] = Object.values(responseData); // 객체의 값들을 배열로 변환
        setData(dataValues);
      })
      .catch((error) => {
        console.error('데이터 수신 오류:', error);
      });
  }, []); // 컴포넌트 마운트 시 한 번 실행

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
        <WhatWeDo key={0} className='WhatWeDo' isHighlighted={highlighted === 0} style={{ left: '10%' }}>
          <WhatWeDoInput leftInput={true}>
            <Circle />
          </WhatWeDoInput>
          <WhatWeDoTitleInput leftInput={false}>WHATWEDO1</WhatWeDoTitleInput>

          <WhatWeDoContentInput leftInput={false}>우리는 이런 일을 하면서 이런 일을 하는데</WhatWeDoContentInput>

          <WhatWeDoContentInput leftInput={false}>이곳에는 최대 이정도 글자 수가 입력 가능하다</WhatWeDoContentInput>
        </WhatWeDo>
        <WhatWeDo key={1} className='WhatWeDo' isHighlighted={highlighted === 1} style={{ left: '90%' }}>
          <WhatWeDoInput leftInput={false}>
            <Circle />
          </WhatWeDoInput>
          <WhatWeDoTitleInput leftInput={true}>WHATWEDO2</WhatWeDoTitleInput>

          <WhatWeDoContentInput leftInput={true}>우리는 이런 일을 하면서 이런 일을 하는데</WhatWeDoContentInput>

          <WhatWeDoContentInput leftInput={true}>이곳에는 최대 이정도 글자 수가 입력 가능하다</WhatWeDoContentInput>
        </WhatWeDo>
        <WhatWeDo key={2} className='WhatWeDo' isHighlighted={highlighted === 2} style={{ left: '10%' }}>
          <WhatWeDoInput leftInput={true}>
            <Circle />
          </WhatWeDoInput>
          <WhatWeDoTitleInput leftInput={false}>WHATWEDO3</WhatWeDoTitleInput>

          <WhatWeDoContentInput leftInput={false}>우리는 이런 일을 하면서 이런 일을 하는데</WhatWeDoContentInput>

          <WhatWeDoContentInput leftInput={false}>이곳에는 최대 이정도 글자 수가 입력 가능하다</WhatWeDoContentInput>
        </WhatWeDo>
        <WhatWeDo key={3} className='WhatWeDo' isHighlighted={highlighted === 3} style={{ left: '90%' }}>
          <WhatWeDoInput leftInput={false}>
            <Circle />
          </WhatWeDoInput>
          <WhatWeDoTitleInput leftInput={true}>WHATWEDO4</WhatWeDoTitleInput>

          <WhatWeDoContentInput leftInput={true}>우리는 이런 일을 하면서 이런 일을 하는데</WhatWeDoContentInput>

          <WhatWeDoContentInput leftInput={true}>이곳에는 최대 이정도 글자 수가 입력 가능하다</WhatWeDoContentInput>
        </WhatWeDo>
        <WhatWeDo key={4} className='WhatWeDo' isHighlighted={highlighted === 4} style={{ left: '10%' }}>
          <WhatWeDoInput leftInput={true}>
            <Circle />
          </WhatWeDoInput>
          <WhatWeDoTitleInput leftInput={false}>WHATWEDO5</WhatWeDoTitleInput>

          <WhatWeDoContentInput leftInput={false}>우리는 이런 일을 하면서 이런 일을 하는데</WhatWeDoContentInput>

          <WhatWeDoContentInput leftInput={false}>이곳에는 최대 이정도 글자 수가 입력 가능하다</WhatWeDoContentInput>
        </WhatWeDo>
        <ScrollBar>
          <ScrollBarBox />
        </ScrollBar>
      </WhatWeDoContainer>
    </Container>
  );
};

export default WhatWeDoPage;

const Container = styled.div`
  height: auto; // 충분한 높이로 스크롤 테스트
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 150px;
`;

const WhatWeDoContainer = styled.div`
  position: relative; // 자식 요소에 위치 지정 가능
  width: 50%;
  height: 100%; // 스크롤 높이
`;

const ScrollBar = styled.div`
  position: absolute;
  top: 0%;
  left: 50%; // 중앙 위치
  translatex: -50%; // 정확한 중앙 위치
  width: 5px;
  height: 100%; // 스크롤바 길이
  background-color: #1a1a1a;
`;
const ScrollBarBox = styled(motion.div)`
  position: sticky;
  top: 50%;
  left: 50%; // 중앙 위치
  translatex: -50%; // 정확한 중앙 위치
  width: 5px;
  height: 250px; // 스크롤바 길이
  background-color: #ffffff;
  z-index: 1000;
`;
const WhatWeDo = styled(motion.div)<IWhatWeDoProps>`
  position: relative;
  transform: translateX(-50%);
  width: 65%; // 폭
  height: auto; // 높이
  background-color: transparent;
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
  transition: all 0.2s; // 애니메이션 전환 속도
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
`;
const Circle = styled.div`
  background-color: #ffa900;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: right;
`;
