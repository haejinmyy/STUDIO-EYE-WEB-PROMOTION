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

const ArtworkList = React.forwardRef<HTMLElement, SectionProps>(
  ({ elementHeight, index, scroll, data, isFirst, isLast }, ref) => {
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

        if ((!isFirst && !isLast && ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0))) ||
          (isFirst && atBottom && e.deltaY > 0) ||
          (isLast && atTop && e.deltaY < 0)) {
          e.preventDefault();
          e.stopPropagation();
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
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${data.backgroundImg})`}
        backgroundSize="cover"
        backgroundPosition="center"
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
            <TextWrapper>
              <ClientWrapper>{data.client}</ClientWrapper>
              <TitleWrapper>{data.title}</TitleWrapper>
              <OverviewWrapper>{data.overview}</OverviewWrapper>
            </TextWrapper>
          </motion.div>
        </MotionFlex>
      </MotionBox>
    );
  }
);

export default ArtworkList;

const TextWrapper = styled.div`
  margin-top: 40px;
`;

const TitleWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 80px;
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
