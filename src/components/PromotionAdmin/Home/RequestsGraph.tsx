import React, { useEffect, useState } from 'react';
import { fetchRequestsData } from '@/apis/PromotionAdmin/dashboard';
import dayjs from 'dayjs';
import Graph from './Graph';
import { RequestData } from '@/types/PromotionAdmin/statistics';

const RequestsGraph = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(2, 'month'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs().startOf('month'));
  const [requestsData, setRequestsData] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [processedData, setProcessedData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const handleStartDateChange = (newStartDate: dayjs.Dayjs | null) => {
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (newEndDate: dayjs.Dayjs | null) => {
    setEndDate(newEndDate);
  };

  const fetchData = async () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    try {
      const startYear = startDate.year();
      const startMonth = startDate.month() + 1;
      const endYear = endDate.year();
      const endMonth = endDate.month() + 1;
      const data = await fetchRequestsData(startYear, startMonth, endYear, endMonth);
      setRequestsData(data);
      const processedData = data.map((item: { year: number; month: number; requestCount: number }) => ({
        x: `${item.year}년 ${item.month}월`,
        y: item.requestCount,
      }));
      setProcessedData(processedData);
    } catch (error) {
      console.log('[❌Error fetchRequestsData]', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Graph
      title='기간별 요청 수'
      processedData={processedData}
      loading={loading}
      data={requestsData}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      startDate={startDate}
      endDate={endDate}
      division='request'
    />
  );
};

export default RequestsGraph;
