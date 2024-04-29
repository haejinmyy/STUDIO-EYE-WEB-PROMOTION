import React from 'react';
import artwork from '@/assets/images/mockup/test3.jpg';
import ArtworkList from './ArtworkList';
import styled from 'styled-components';

const mock = [
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '국대: 로드 투 카타르',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '홍보하러 온 건 아닌데',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '국대: 로드 투 카타르',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '홍보하러 온 건 아닌데',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '홍보하러 온 건 아닌데',
  },
];

const Slide3 = () => {
  return (
    <Container>
      {mock.map((i) => (
        <ArtworkList backgroundImg={i.backgroundImg} clientName={i.client} title={i.title} />
      ))}
    </Container>
  );
};

export default Slide3;

const Container = styled.div``;
