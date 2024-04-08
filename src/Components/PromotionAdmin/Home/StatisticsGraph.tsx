import React, { useEffect, useState } from 'react';
import PeriodPicker from './PeriodPicker';
import { fetchViewsData } from '@/apis/PromotionAdmin/view';
import dayjs from 'dayjs';
import { ViewData } from '@/types/view';
import LineGraph from './LineGraph';
import styled from 'styled-components';
import { ReactComponent as Icon } from '@/assets/images/PA-Navigation/statistics.svg';

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
    <Container>
      <HeaderWrapper>
        <TitleWrapper>
          <Icon width={20} height={20} stroke='#595959' />
          <h1>기간별 방문자 수</h1>
        </TitleWrapper>
        <DayPickerWrapper>
          <PeriodPicker
            startDate={startDate}
            endDate={endDate}
            startDateChange={handleStartDateChange}
            endDateChange={handleEndDateChange}
          />
        </DayPickerWrapper>
      </HeaderWrapper>
      <BodyWrapper>
        {loading ? (
          <LoadingWrapper>〰Loading〰</LoadingWrapper>
        ) : viewsData && viewsData.length > 0 ? (
          <LineGraph data={processedData} />
        ) : (
          <ErrorWrapper>⛔ 올바르지 않은 형식입니다. 데이터를 다시 선택해 주세요.</ErrorWrapper>
        )}
      </BodyWrapper>
    </Container>
  );
};

export default StatisticsGraph;

const Container = styled.div`
  width: 743px;
  height: fit-content;
  border: 0.2px solid #878787;
  border-radius: 10px;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  margin-top: 15px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.2px solid #878787;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 15px;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: #595959;
    margin-left: 10px;
  }
`;
const DayPickerWrapper = styled.div`
  margin-right: 15px;
`;
const BodyWrapper = styled.div`
  padding: 15px;
`;

const ErrorWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;
