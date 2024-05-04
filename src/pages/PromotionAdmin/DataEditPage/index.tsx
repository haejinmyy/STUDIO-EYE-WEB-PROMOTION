import DetailNavigator from '@/components/PromotionAdmin/DataEdit/DetailNavigator';
// import Overview from '@/components/PromotionAdmin/DataEdit/Overview';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const index = () => {
  return (
    <>
      <DetailNavigator />
      <Layout>
        <Outlet />
        {/* <Overview /> */}
      </Layout>
    </>
  );
};

export default index;

const Layout = styled.div`
  margin-top: 60px;
`;
