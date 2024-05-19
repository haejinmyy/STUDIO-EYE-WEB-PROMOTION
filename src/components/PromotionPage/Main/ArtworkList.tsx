import React, { useEffect, useRef } from 'react';
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { motion, Variants, useTransform, MotionValue } from 'framer-motion';
import styled from 'styled-components';

interface SectionProps {
  elementHeight: number;
  index: number;
  scroll: MotionValue<number>;
  data: {
    backgroundImg: string;
    title: string;
    client: string;
    overview: string;
  };
  isFirst: boolean;
  isLast: boolean;
}

const ArtworkList = React.forwardRef<HTMLElement, SectionProps>(({ elementHeight, index, scroll, data, isFirst, isLast }, ref) => {
  const MotionBox = motion<BoxProps>(Box);
  const MotionFlex = motion<FlexProps>(Flex);
  const cardInView: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      if (!isFirst && !isLast) {
        if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
          e.preventDefault();
          e.stopPropagation();
        }
      } else if (isFirst) {
        if (atBottom && e.deltaY > 0) {
          e.preventDefault();
          e.stopPropagation();
        }
      } else if (isLast) {
        if (atTop && e.deltaY < 0) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleWheelEvent = (e: WheelEvent) => {
      handleWheel(e as unknown as React.WheelEvent);
    };

    if (container) {
      container.addEventListener('wheel', handleWheelEvent, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheelEvent);
      }
    };
  }, []);

  const transformY = useTransform(
    scroll,
    [elementHeight * (index + 1) - elementHeight, elementHeight * (index + 1)],
    ['0vh', '100vh']
  );

  return (
    <MotionBox
      w="100%"
      h="100vh"
      scrollSnapAlign="center"
      initial="offscreen"
      whileInView="onscreen"
      position="relative"
      viewport={{ once: false, amount: 0.7 }}
      ref={ref}
      zIndex={index + 1}
      backgroundImage={`url(${data.backgroundImg})`}
      backgroundSize="cover"
      backgroundPosition="center"
      opacity={0.8}
      onWheel={handleWheel}
    >
      <MotionFlex
        w="100%"
        h="100%"
        paddingLeft={20}
        paddingTop={20}
        color="white"
        style={{ y: transformY }}
        alignItems="start"
        justifyContent="start"
        ref={containerRef}
        overflowX="auto"
        overflowY="hidden"
      >
        <motion.div variants={cardInView}>
          <ClientWrapper>{data.client}</ClientWrapper>
          <TitleWrapper>{data.title}</TitleWrapper>
          <OverviewWrapper>{data.overview}</OverviewWrapper>
        </motion.div>
        {/* <TEST variants={cardInView}>Click and Scroll</TEST> */}
      </MotionFlex>
    </MotionBox>
  );
});

export default ArtworkList;

// 스타일드 컴포넌트
const TitleWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 50px;
  color: white;
  white-space: nowrap;
`;
const ClientWrapper = styled(motion.h2)`
  font-family: 'pretendard-bold';
  font-size: 25px;
  color: #cccccc;
`;
const OverviewWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 20px;
  color: white;
`;

const TEST = styled(motion.div)`
  margin-left: auto;
  margin-top: auto;
  padding: 0 100px;
  font-family: 'pretendard-light';
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
`;
