import React, { useRef, useState, useEffect } from 'react';
import { ChakraProvider, Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import { motion, useMotionValue } from 'framer-motion';
// @ts-ignore
import { SectionsContainer, Section } from 'react-fullpage';
import Top from '@/components/PromotionPage/Main/Top';
import Intro from '@/components/PromotionPage/Main/Intro';
import useWindowSize from '@/hooks/useWindowSize';
import ArtworkList from '@/components/PromotionPage/Main/ArtworkList';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import { MIArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import defaultTopImg from '@/assets/images/PP/defaultTopImg.jpg';
import Outro from '@/components/PromotionPage/Main/Outro';

export const MotionBox = motion<BoxProps>(Box);

const MainPage = () => {
  const [elementHeight, setElementHeight] = useState(window.innerHeight);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastArtworkVisible, setIsLastArtworkVisible] = useState(false);
  const { data, isLoading } = useQuery<MIArtworksData>(['artwork', 'id'], getArtworkData, {
    staleTime: 1000 * 60 * 10, // 10분
  });
  const sectionsRef = useRef<HTMLElement[]>([]);
  const filteredMainData = data && data.data.filter((i) => i.projectType === 'main');
  const filteredTopData = data && data.data.filter((i) => i.projectType === 'top');
  const { height } = useWindowSize();
  const scroll = useMotionValue(currentIndex * elementHeight);

  useEffect(() => {
    if (sectionsRef.current && sectionsRef.current[0]) {
      setElementHeight(sectionsRef.current[0].offsetHeight);
    }
  }, [height]);

  const options = {
    anchors: ['top', 'intro', 'artworkList', 'outro'],
    navigation: true,
    verticalAlign: true,
    delay: 2000,
  };

  return (
    <>
      <style>{`
        body, html {
          overflow: hidden;
        }
      `}</style>
      <SectionsContainer {...options}>
        <ChakraProvider>
          <Section>
            {filteredTopData && filteredTopData.length > 0 ? (
              <>
                {filteredTopData.map((i, index) => (
                  <Top key={index} backgroundImg={i.mainImg} />
                ))}
              </>
            ) : (
              <Top backgroundImg={defaultTopImg} />
            )}
          </Section>
          <Section>
            <Intro />
          </Section>
          <Section>
            <Box
              scrollSnapType='y mandatory'
              overflowY='scroll'
              h='100vh'
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
                    key={item.id}
                    data={{
                      backgroundImg: item.mainImg ? item.mainImg : '',
                      title: item.name ? item.name : '',
                      client: item.client ? item.client : '',
                      overview: item.overView,
                    }}
                    elementHeight={elementHeight}
                    index={index}
                    scroll={scroll}
                    ref={(element) => (sectionsRef.current[index] = element as HTMLElement)}
                    isFirst={index === 0}
                    isLast={index === filteredMainData.length - 1}
                  />
                ))
              )}
            </Box>
          </Section>
          <Section>
            <Outro />
          </Section>
        </ChakraProvider>
      </SectionsContainer>
    </>
  );
};

export default MainPage;
