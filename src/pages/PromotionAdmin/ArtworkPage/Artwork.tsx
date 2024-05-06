import ArtworkComponent from '@/components/PromotionAdmin/Artwork/Artwork';
import React from 'react';
import styled from 'styled-components';

const Artwork = () => {
  return (
    <Container>
      <HeaderWrapper>Artwork</HeaderWrapper>
      <ArtworkComponent />
    </Container>
  );
};

export default Artwork;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const HeaderWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 32px;
  color: #595959;
  margin-bottom: 21px;
`;
