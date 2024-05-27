import React from 'react';
import Header from '@/components/PromotionPage/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CustomCursor from '../CustomCursor/CustomCursor';
import ScrollToTop from '@/hooks/useScrollToTop';
import Footer from '../Footer/Footer';

const Layout = () => {
  const location = useLocation();

  const pathsWithoutFooter = ['/contact'];

  const hideFooter = pathsWithoutFooter.includes(location.pathname);

  return (
    <Container className='promotion-cursor'>
      <ScrollToTop />
      <Header />
      <BodyWrapper>
        <Outlet />
        <CustomCursor />
      </BodyWrapper>
      {!hideFooter && <Footer />}
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
