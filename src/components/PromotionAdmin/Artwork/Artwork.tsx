import { getAllArtworks } from '@/apis/PromotionAdmin/artwork';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkBox from './ArtworkBox';

const Artwork = () => {
  const { data, isLoading, error } = useQuery<ArtworkData[], Error>('artworks', getAllArtworks);

  if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Container>
      <ArtworkBoxWrapper>
        {data?.length === 0 ? (
          <NoDataWrapper>😊 대기 중인 의뢰가 없습니다.</NoDataWrapper>
        ) : (
          <>
            {data?.map((artwork) => (
              <Link to={`/pa-test/artwork/${artwork.id}`} key={artwork.id}>
                <ArtworkBox
                  mainImg={artwork.mainImg}
                  clientName={artwork.client}
                  name={artwork.name}
                  isPosted={artwork.isPosted}
                />
              </Link>
            ))}
          </>
        )}
      </ArtworkBoxWrapper>
      <Outlet />
    </Container>
  );
};

export default Artwork;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArtworkBoxWrapper = styled.div`
  display: grid;
  width: 600px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
  justify-items: center;
  align-items: start;
  margin-right: 50px;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;
