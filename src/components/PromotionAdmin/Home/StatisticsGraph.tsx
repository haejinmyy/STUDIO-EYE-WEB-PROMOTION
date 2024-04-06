import React, { useEffect, useState } from 'react';
import PeriodPicker from './PeriodPicker';
import { fetchViewsData } from '@/apis/PromotionAdmin/view';
import dayjs from 'dayjs';
import { ViewData } from '@/types/view';
import LineGraph from './LineGraph';

const StatisticsGraph = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(5, 'month'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs().startOf('month'));
  const [viewsData, setViewsData] = useState<ViewData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [processedData, setProcessedData] = useState<{ x: string; y: number }[]>([]);

  //   useEffect(() => {
  //     // 페이지 로딩시 최근 6개월 데이터를 기본으로 설정
  //     const currentDate = dayjs();
  //     const end = currentDate.startOf('month');
  //     const start = end.subtract(5, 'month');
  //     setStartDate(start);
  //     setEndDate(end);
  //   }, []);

  useEffect(() => {
    // startDate 혹은 endDate가 바뀔 때 마다 fetch
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
    <div>
      <PeriodPicker
        startDate={startDate}
        endDate={endDate}
        startDateChange={handleStartDateChange}
        endDateChange={handleEndDateChange}
      />
      {loading ? (
        <div>Loading...</div>
      ) : viewsData && viewsData.length > 0 ? (
        <LineGraph data={processedData} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default StatisticsGraph;
