import React from 'react';
import Header from '@/components/PromotionPage/Header/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import CustomCursor from '../CustomCursor/CustomCursor';
import ScrollToTop from '@/hooks/useScrollToTop';

const Layout = () => {
  return (
    <Container className='promotion-cursor'>
      <ScrollToTop />
      <Header />
      <BodyWrapper>
        <Outlet />
        <CustomCursor />
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
