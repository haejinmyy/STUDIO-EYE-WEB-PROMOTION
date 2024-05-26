import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getClientLogoImgList } from '@/apis/PromotionPage/client';

type Props = {
  data?: string[];
  isLoading: boolean;
  error: Error | null;
};

const ClientRowAnimation = ({ data, isLoading, error }: Props) => {
  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (error) {
    return <div>오류: {error.message}</div>;
  }
  const marqueeVariants = (direction = 'right') => {
    const screenWidth = window.innerWidth;
    return {
      animate: {
        x: direction === 'right' ? [-screenWidth, screenWidth] : [screenWidth, -screenWidth],
        transition: {
          x: {
            repeat: Infinity,
            duration: 30,
            ease: 'linear',
          },
        },
      },
    };
  };

  const getRepeatedImages = (images: string[]): string[] => {
    const minWidth = 235; // 각 이미지의 최소 너비
    const screenWidth = window.innerWidth; // 화면 너비
    const imagesPerScreen = Math.ceil(screenWidth / (minWidth - 30)); // 화면 당 이미지 수
    const repeatCount = Math.ceil(imagesPerScreen / images.length); // 필요한 반복 횟수

    return new Array(repeatCount).fill([...images]).flat();
  };

  return (
    <Container>
      <MarqueeRow variants={marqueeVariants('right')} animate='animate'>
        {data &&
          getRepeatedImages(data).map((imgUrl, index) => (
            <ImgWrapper key={index}>
              <img src={imgUrl} alt={`clientLogoImg${index}`} />
            </ImgWrapper>
          ))}
      </MarqueeRow>
      <MarqueeRow variants={marqueeVariants('left')} animate='animate'>
        {data &&
          getRepeatedImages(data).map((imgUrl, index) => (
            <ImgWrapper key={index}>
              <img src={imgUrl} alt={`clientLogoImg${index}`} />
            </ImgWrapper>
          ))}
      </MarqueeRow>
    </Container>
  );
};

export default ClientRowAnimation;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const MarqueeRow = styled(motion.div)`
  display: flex;
  width: auto;
  padding: 30px 0;
`;

const ImgWrapper = styled.div`
  flex: none;
  img {
    width: 235px;
    height: 62px;
    object-fit: contain;
    margin: 0 15px;
    opacity: 0.6;
  }
`;
