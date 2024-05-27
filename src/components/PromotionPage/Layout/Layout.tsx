import React from 'react';
import Header from '@/components/PromotionPage/Header/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ScrollToTop from '@/hooks/useScrollToTop';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <Container>
      <ScrollToTop />
      <Header />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
      <Footer />
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
