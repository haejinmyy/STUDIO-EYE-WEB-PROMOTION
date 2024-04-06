import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import dayjs from 'dayjs';

type Props = {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  startDateChange: (startDate: dayjs.Dayjs | null) => void;
  endDateChange: (endDate: dayjs.Dayjs | null) => void;
};

const PeriodPicker = ({ startDate, endDate, startDateChange, endDateChange }: Props) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
          value={startDate}
          onChange={(newValue) => {
            startDateChange(newValue);
          }}
          label={'Start Date'}
          views={['year', 'month']}
          openTo='month'
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
          value={endDate}
          onChange={(newValue) => {
            endDateChange(newValue);
          }}
          label={'End Date'}
          views={['year', 'month']}
          openTo='month'
        />
      </LocalizationProvider>
    </>
  );
};

export default PeriodPicker;
