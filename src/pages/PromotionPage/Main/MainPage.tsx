import React, { useRef, useState, useEffect } from 'react';
import { ChakraProvider, Box, BoxProps } from '@chakra-ui/react';
import { motion, useElementScroll, useScroll } from 'framer-motion';
import Top from '@/components/PromotionPage/Main/Top';
import Intro from '@/components/PromotionPage/Main/Intro';
import useWindowSize from '@/hooks/useWindowSize';
import ArtworkList from '@/components/PromotionPage/Main/ArtworkList';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import { MIArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';

export const MotionBox = motion<BoxProps>(Box);

const Mainpage = () => {
  const [elementHeight, setElementHeight] = React.useState(0);
  const { data, isLoading } = useQuery<MIArtworksData>(['artwork', 'id'], getArtworkData, {
    staleTime: 1000 * 60 * 10, // 10분
  });
  const sectionsRef = React.useRef<HTMLElement[]>([]);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const filteredData = data && data?.data.filter((i) => i.projectType === 'main' || i.projectType === 'top');
  console.log(filteredData);

  const { scrollY } = useScroll({ container: wrapperRef });
  const { height } = useWindowSize();
  useEffect(() => {
    if (sectionsRef.current && sectionsRef.current[0]) {
      setElementHeight(sectionsRef.current[0].offsetHeight);
    }
  }, [height]);
  return (
    <>
      <Top />
      <Intro />
      <ChakraProvider>
        <Box
          scrollSnapType='y mandatory'
          overflowY='scroll'
          h='100vh'
          ref={wrapperRef}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {isLoading ? (
            <div>데이터 로딩 중...</div>
          ) : (
            filteredData &&
            filteredData.map((item, index) => (
              <ArtworkList
                data={{
                  backgroundImg: item.mainImg ? item.mainImg : '',
                  title: item.name ? item.name : '없음',
                  client: item.client ? item.client : '없음',
                  overview: item.overView,
                }}
                elementHeight={elementHeight}
                index={index}
                scroll={scrollY}
                ref={(element) => (sectionsRef.current[index] = element as HTMLElement)}
                key={item.id}
              />
            ))
          )}
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Mainpage;
