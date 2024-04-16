import React, { useEffect, useState } from 'react';
import { fetchViewsData } from '@/apis/PromotionAdmin/dashboard';
import dayjs from 'dayjs';
import { ViewData } from '@/types/PromotionAdmin/statistics';
import Graph from './Graph';

const StatisticsGraph = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(5, 'month'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs().startOf('month'));
  const [viewsData, setViewsData] = useState<ViewData[]>([]);
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
      const data = await fetchViewsData(startYear, startMonth, endYear, endMonth);
      setViewsData(data);
      const processedData = data.map((item: { year: number; month: number; views: number }) => ({
        x: `${item.year}년 ${item.month}월`,
        y: item.views,
      }));
      setProcessedData(processedData);
    } catch (error) {
      console.log('[❌Error fetchViewsData]', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Graph
      title='기간별 조회 수'
      processedData={processedData}
      loading={loading}
      data={viewsData}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      startDate={startDate}
      endDate={endDate}
      division='view'
    />
  );
};

export default StatisticsGraph;
