import React, { useRef, useState, useEffect } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { motion, useElementScroll } from 'framer-motion';
import Slide1 from '@/components/PromotionPage/Main/Slide1';
import Slide2 from '@/components/PromotionPage/Main/Slide2';

const MotionBox = motion(Box); // Box 컴포넌트를 확장하여 애니메이션 기능을 추가

const Mainpage = () => {
  const sectionsRef = useRef<HTMLElement[]>([]); // 섹션들의 참조를 저장하기 위한 ref
  const wrapperRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너의 참조를 저장하기 위한 ref

  const slides = [<Slide1 />, <Slide2 />]; // 슬라이드 컴포넌트들의 배열

  return (
    <ChakraProvider>
      <MotionBox
        scrollSnapType='y mandatory' // 세로 스크롤 스냅 활성화
        overflowY='scroll' // 세로 스크롤만 허용
        overflowX='hidden' // 가로 스크롤 방지
        h='100vh' // 높이를 뷰포트의 100%로 설정
        style={{ scrollBehavior: 'smooth' }} // 부드러운 스크롤 효과 적용
        ref={wrapperRef}
      >
        {slides.map((Slide, index) => (
          <Box
            key={index}
            h='100vh'
            scrollSnapAlign='start' // 스냅 포인트 정렬 설정
            ref={(el) => (sectionsRef.current[index] = el as HTMLElement)} // 각 섹션에 대한 참조 저장
          >
            {Slide}
          </Box>
        ))}
      </MotionBox>
    </ChakraProvider>
  );
};

export default Mainpage;
