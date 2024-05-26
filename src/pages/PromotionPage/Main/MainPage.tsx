import React, { useRef, useState, useEffect } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
// @ts-ignore
import { SectionsContainer, Section, SectionEventCallback } from 'react-fullpage';
import Top from '@/components/PromotionPage/Main/Top';
import Intro from '@/components/PromotionPage/Main/Intro';
import useWindowSize from '@/hooks/useWindowSize';
import ArtworkList from '@/components/PromotionPage/Main/ArtworkList';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import { MIArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import defaultTopImg from '@/assets/images/PP/defaultTopImg.jpg';
import Outro from '@/components/PromotionPage/Main/Outro';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import Footer from '@/components/PromotionPage/Footer/Footer';

const MainPage: React.FC = () => {
  const [elementHeight, setElementHeight] = useState(window.innerHeight);
  const { data, isLoading } = useQuery<MIArtworksData>(['artwork', 'id'], getArtworkData, {
    staleTime: 1000 * 60 * 10, // 10분
  });
  const sectionsRef = useRef<HTMLElement[]>([]);
  const filteredMainData = data?.data.filter((i) => i.projectType === 'main');
  const filteredTopData = data?.data.filter((i) => i.projectType === 'top');
  const { height } = useWindowSize();
  const scroll = useMotionValue(0);

  useEffect(() => {
    if (sectionsRef.current && sectionsRef.current[0]) {
      setElementHeight(sectionsRef.current[0].offsetHeight);
    }
  }, [height]);

  const options = {
    anchors: ['1', '2', '3', '4', '5'],
    navigation: true,
    verticalAlign: true,
    delay: 1000,
  };

  return (
    <>
      <style>{`
          body, html {
            overflow: hidden;
          }
        `}
      </style>
      <Wrapper>
        <SectionsContainer {...options}>
          <ChakraProvider>
            <Section>
              {filteredTopData && filteredTopData.length > 0 ? (
                filteredTopData.map((i, index) => (
                  <Top key={index} backgroundImg={i.mainImg} />
                ))
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
            {/* <Box style={{ backgroundColor: 'white' }}> */}
            <Section>
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
            </Section>
            {/* </Box> */}
          </ChakraProvider>
        </SectionsContainer>
      </Wrapper>
    </>
  );
};

export default MainPage;

const FooterWrapper = styled.div`
  position: fixed;
  top: calc(500vh - 225px);
  /* top: 410vh; */
  width: 100%;
`;

const Wrapper = styled.div`
  /* .Navigation {
    width: 5px !important;
    margin: 0 50px 0 0 !important;
  }

  .Navigation-Anchor {
    background-color: #ffa900 !important;
    border-radius: 0% !important;

    margin: -3px !important;
    padding: 0px !important;

    height: 25px !important;
    width: 8px !important;

    &.active {
      transform: scale(1.5) !important;
      background-color: white !important;
    }
  } */
`;
