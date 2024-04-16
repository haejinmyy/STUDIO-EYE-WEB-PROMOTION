import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// fetch component
const fetchDataByRange = async (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, fetchFunction: Function) => {
  if (!startDate || !endDate) return [];
  const startYear = startDate.year();
  const startMonth = startDate.month() + 1;
  const endYear = endDate.year();
  const endMonth = endDate.month() + 1;
  try {
    return await fetchFunction(startYear, startMonth, endYear, endMonth);
  } catch (error) {
    console.error(`[❌Error ${fetchFunction.name}]`, error);
    return [];
  }
};

// 데이터 그래프 변환 함수
const processChartData = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, data: any[]) => {
  const monthArray: { year: number; month: number }[] = [];
  let currentMonth = startDate.startOf('month');
  // 시작일부터 종료일까지의 모든 월을 배열에 추가
  while (currentMonth.isBefore(endDate.add(1, 'month'))) {
    monthArray.push({ year: currentMonth.year(), month: currentMonth.month() + 1 });
    currentMonth = currentMonth.add(1, 'month');
  }
  // 데이터가 있는 경우 해당 월의 조회수를 사용하고 없는 경우 0으로 설정하여 반환
  return monthArray.map((month) => {
    const foundData = data.find(
      (item: { year: number; month: number }) => item.year === month.year && item.month === month.month,
    );
    return {
      x: `${month.year}년 ${month.month}월`,
      y: foundData ? foundData.views : 0,
    };
  });
};

// 그래프 데이터 처리 및 관리
const useGraphData = (fetchFunction: Function, defaultStartDate: dayjs.Dayjs, defaultEndDate: dayjs.Dayjs) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(defaultEndDate);
  const [data, setData] = useState<any[]>([]);
  const [processedData, setProcessedData] = useState<{ x: string; y: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    setLoading(true);
    const fetchedData = await fetchDataByRange(startDate || dayjs(), endDate || dayjs(), fetchFunction);
    setData(fetchedData);
    setProcessedData(processChartData(startDate || dayjs(), endDate || dayjs(), fetchedData));
    setLoading(false);
  };

  const handleStartDateChange = (newStartDate: dayjs.Dayjs | null) => {
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (newEndDate: dayjs.Dayjs | null) => {
    setEndDate(newEndDate);
  };

  return { startDate, endDate, data, processedData, loading, handleStartDateChange, handleEndDateChange };
};

export default useGraphData;
