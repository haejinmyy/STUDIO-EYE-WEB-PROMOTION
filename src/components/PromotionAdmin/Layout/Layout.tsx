import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';
import Navigation from '../Navigation';
import backgroundImg from '@/assets/images/backgroundImg.png';

const Layout = () => {
  return (
    <Container>
      <Navigation />
      <Header />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 440px 500px;
  background-position: calc(100% - 150px) calc(100% - 50px);
  background-color: #f9fafc;
`;

const BodyWrapper = styled.div`
  margin-left: 157px;
  margin-right: 157px;
  padding-top: 129px;
`;
