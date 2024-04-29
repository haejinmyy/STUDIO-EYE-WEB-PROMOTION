import React, { useRef, useState, useEffect } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { motion, useElementScroll } from 'framer-motion';
import Slide1 from '@/components/PromotionPage/Main/Slide1';
import Slide2 from '@/components/PromotionPage/Main/Slide2';
import Slide3 from '@/components/PromotionPage/Main/Slide3';

const MotionBox = motion(Box);

// const wrapperRef = useRef<HTMLDivElement>(null);

// const slides = [<Slide1 />, <Slide2 />];

const Mainpage = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  return (
    <>
      <Slide1 />

      <Slide2 />

      <Slide3 />
    </>
    // <ChakraProvider>
    //   <MotionBox
    //     scrollSnapType='y mandatory'
    //     overflowY='scroll'
    //     overflowX='hidden'
    //     h='100vh'
    //     style={{ scrollBehavior: 'smooth' }}
    //     ref={wrapperRef}
    //   >
    //     {slides.map((Slide, index) => (
    //       <Box
    //         key={index}
    //         h='100vh'
    //         scrollSnapAlign='start'
    //         ref={(el) => (sectionsRef.current[index] = el as HTMLElement)}
    //       >
    //         {Slide}
    //       </Box>
    //     ))}
    //   </MotionBox>
    // </ChakraProvider>
  );
};

export default Mainpage;
