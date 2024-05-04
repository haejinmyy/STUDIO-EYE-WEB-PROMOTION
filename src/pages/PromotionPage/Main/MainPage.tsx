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
import defaultTopImg from '@/assets/images/PP/defaultTopImg.jpg';

export const MotionBox = motion<BoxProps>(Box);

const Mainpage = () => {
  const [elementHeight, setElementHeight] = useState(window.innerHeight);
  const { data, isLoading } = useQuery<MIArtworksData>(['artwork', 'id'], getArtworkData, {
    staleTime: 1000 * 60 * 10, // 10분
  });
  const sectionsRef = useRef<HTMLElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const filteredMainData = data && data.data.filter((i) => i.projectType === 'main');
  const filteredTopData = data && data.data.filter((i) => i.projectType === 'top');
  console.log(filteredMainData);
  console.log(filteredTopData);

  const { scrollY } = useScroll({ container: wrapperRef });
  const { height } = useWindowSize();
  useEffect(() => {
    if (sectionsRef.current && sectionsRef.current[0]) {
      setElementHeight(sectionsRef.current[0].offsetHeight);
    }
  }, [height]);

  return (
    <>
      {filteredTopData && filteredTopData.length > 0 ? (
        <>
          {filteredTopData.map((i) => (
            <Top backgroundImg={i.mainImg} />
          ))}
        </>
      ) : (
        <Top backgroundImg={defaultTopImg} />
      )}
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
            filteredMainData &&
            filteredMainData.map((item, index) => (
              <ArtworkList
                data={{
                  backgroundImg: item.mainImg ? item.mainImg : '',
                  title: item.name ? item.name : '',
                  client: item.client ? item.client : '',
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
