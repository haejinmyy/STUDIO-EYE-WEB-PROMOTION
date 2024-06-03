import React from 'react';
import dayjs from 'dayjs';
import Graph from './Graph';
import useGraphData from '@/hooks/useGraphData';
import { fetchRequestsData } from '@/apis/PromotionAdmin/dashboard';

const RequestsGraph = () => {
  const { startDate, endDate, data, processedData, handleStartDateChange, handleEndDateChange, division } =
    useGraphData(fetchRequestsData, dayjs().subtract(2, 'month'), dayjs().startOf('month'), 'request');

  return (
    <Graph
      title='기간별 문의 수'
      processedData={processedData}
      data={data}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      startDate={startDate}
      endDate={endDate}
      division='request'
    />
  );
};

export default RequestsGraph;
