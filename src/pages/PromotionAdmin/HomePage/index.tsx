import DateSelectBtn from '@/Components/PromotionAdmin/Home/PeriodPicker';
import RequestsGraph from '@/Components/PromotionAdmin/Home/RequestsGraph';
import StatisticsGraph from '@/Components/PromotionAdmin/Home/StatisticsGraph';
import { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

const index = () => {
  return (
    <Container>
      <StatisticsGraph />
      <RequestsGraph />
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
`;
