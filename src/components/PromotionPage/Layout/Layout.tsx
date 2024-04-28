import React from 'react';
import Header from '@/components/PromotionPage/Header/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <Container>
      <Header />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: black;
  width: 100%;
  color: white;
`;
const BodyWrapper = styled.div``;
