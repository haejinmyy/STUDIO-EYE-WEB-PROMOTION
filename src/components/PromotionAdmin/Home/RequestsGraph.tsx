import React from 'react';
import dayjs from 'dayjs';
import Graph from './Graph';
import { fetchRequestsData } from '@/apis/PromotionAdmin/dashboard';
import useGraphData from '@/hooks/useGraphData';

const RequestsGraph = () => {
  const { startDate, endDate, data, processedData, loading, handleStartDateChange, handleEndDateChange } = useGraphData(
    fetchRequestsData,
    dayjs().subtract(2, 'month'),
    dayjs().startOf('month'),
  );

  return (
    <Graph
      title='기간별 요청 수'
      processedData={processedData}
      loading={loading}
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
