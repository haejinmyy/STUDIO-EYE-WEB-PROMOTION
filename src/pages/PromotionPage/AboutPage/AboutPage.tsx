import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CenteredScrollExample = () => {
  const [highlighted, setHighlighted] = useState(0);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 스크롤 위치에 따라 강조할 버튼 결정
      if (scrollY < 100) {
        setHighlighted(1);
      } else if (scrollY < 200) {
        setHighlighted(2);
      } else if (scrollY < 300) {
        setHighlighted(3);
      } else if (scrollY < 400) {
        setHighlighted(4);
      } else {
        setHighlighted(5);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <ScrollableContainer>
        <ScrollBar animate={{ top: `${5 + highlighted * 20}vh` }} /> {/* 스크롤바 이동 */}
        {/* 스크롤바 왼쪽의 A, C, E */}
        <Button style={{ top: '10%', left: '30%' }} animate={{ scale: highlighted === 1 ? 1.2 : 1 }}>
          A
        </Button>
        <Button style={{ top: '50%', left: '30%' }} animate={{ scale: highlighted === 3 ? 1.2 : 1 }}>
          C
        </Button>
        <Button style={{ top: '90%', left: '30%' }} animate={{ scale: highlighted === 5 ? 1.2 : 1 }}>
          E
        </Button>
        {/* 스크롤바 오른쪽의 B, D */}
        <Button style={{ top: '30%', left: '70%' }} animate={{ scale: highlighted === 2 ? 1.2 : 1 }}>
          B
        </Button>
        <Button style={{ top: '70%', left: '70%' }} animate={{ scale: highlighted === 4 ? 1.2 : 1 }}>
          D
        </Button>
      </ScrollableContainer>
    </Container>
  );
};

export default CenteredScrollExample;

const Container = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const ScrollableContainer = styled.div`
  height: 200vh; // 충분한 스크롤 공간
`;
const ScrollBar = styled(motion.div)`
  position: fixed;
  left: 50%; // 화면 중앙
  transform: translateX(-50%); // 중앙 정렬
  width: 10px; // 폭
  height: 90vh; // 높이
  background-color: white; // 색상
`;
const Button = styled(motion.button)`
  position: absolute;
  width: 100px; // 폭
  height: 70px; // 높이
  border: 1px solid black;
  background-color: white;
  font-size: 24px;
  padding: 20px;
  margin: 10px;
  transition: all 0.2s; // 애니메이션 전환 속도
`;
