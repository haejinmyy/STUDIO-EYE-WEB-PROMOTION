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
    return <div>로딩 중</div>; // TODO Loading component
  }

  if (error) {
    return <div>Error {error.message}</div>; // TODO Error component
  }

  // 오른쪽으로만 이동
  const marqueeVariantsRight = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        },
      },
    },
  };

  // 왼쪽으로만 이동
  const marqueeVariantsLeft = {
    animate: {
      x: ['-100%', '0%'],
      transition: {
        x: {
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <Container>
      <MarqueeRow variants={marqueeVariantsRight} animate='animate'>
        {data &&
          [...data, ...data].map((imgUrl, index) => (
            <ImgWrapper key={index}>
              <img src={imgUrl} alt={`clientLogoImg${index}`} />
            </ImgWrapper>
          ))}
      </MarqueeRow>
      <MarqueeRow variants={marqueeVariantsLeft} animate='animate'>
        {data &&
          [...data, ...data].map((imgUrl, index) => (
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
    object-fit: cover;
    margin: 0 64px;
    opacity: 0.6;
  }
`;
