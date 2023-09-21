import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";
import { ReactComponent as DividerIcon } from "assets/icons/divider.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { GET } from "apis/api";

const CustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
  const pad = (num) => (num < 10 ? "0" + num : num);

  return (
    <CustomHeaderContainer>
      <CustomHeaderButton onClick={decreaseMonth}>{"<"}</CustomHeaderButton>
      <CustomHeaderDate>
        {date.getFullYear()}.{pad(date.getMonth() + 1)}
      </CustomHeaderDate>
      <CustomHeaderButton onClick={increaseMonth}>{">"}</CustomHeaderButton>
    </CustomHeaderContainer>
  );
};
const DateFilter = ({ onDateFilter, startDate, endDate }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    onDateFilter({
      startDate: date,
      endDate: selectedEndDate,
    });
    console.log(date);
  };
  const handleEndDateChange = (date) => {
    if (selectedStartDate && date < selectedStartDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(date);
    }
    onDateFilter({
      startDate: selectedStartDate,
      endDate: date,
    });
  };

  const handleDateFilter = () => {};

  onDateFilter({
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  return (
    <FilterContainer>
      <DatePickerContainer>
        <StyledDatePicker
          selected={selectedStartDate === "-" ? "날짜 선택" : selectedStartDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy.MM.dd"
          locale={ko}
          maxDate={selectedEndDate === "-" ? null : selectedEndDate}
          renderCustomHeader={CustomHeader}
          dayClassName={(d) =>
            d.getDay() === 0
              ? "custom-day sunday"
              : d.getDay() === 6
              ? "custom-day saturday"
              : "custom-day "
          }
        />
        <StyledCalendarIcon />
      </DatePickerContainer>
      <Divider>
        <DividerIcon />
      </Divider>
      <DatePickerContainer>
        <StyledDatePicker
          selected={selectedEndDate === "-" ? null : selectedEndDate}
          onChange={handleEndDateChange}
          dateFormat="yyyy.MM.dd"
          locale={ko}
          renderCustomHeader={CustomHeader}
          dayClassName={(d) =>
            d.getDay() === 0
              ? "custom-day sunday"
              : d.getDay() === 6
              ? "custom-day saturday"
              : "custom-day "
          }
        />
        <StyledCalendarIcon />
      </DatePickerContainer>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0rem;
  margin-left: 35rem;
`;

const DatePickerContainer = styled.div`
  display: flex;
  width: 15.5rem;
  height: 4rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  margin-left: 1rem;
  padding: 0.5rem;

  /* 달력 헤더 스타일 */
  .react-datepicker__header {
    background-color: #fff;
    border: none;
    padding: 0.5rem;
  }

  /* 연도/월 선택 영역 스타일  */
  .react-datepicker__current-month {
    ${({ theme }) => theme.fonts.body2Bold};
  }

  /* 달력 날짜 스타일*/
  .react-datepicker__day {
    ${({ theme }) => theme.fonts.caption2};
    padding: 0.2rem;
    cursor: pointer;
  }

  /* 선택된 날짜 스타일 */
  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.mainDark};
    color: #ffffff;
  }

  .custom-day.saturday {
    color: blue;
  }
  .custom-day.sunday {
    color: red;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  border: none;
  width: 10.5rem;
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-left: 1rem;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 2.3684rem;
  height: 2.5rem;
`;

const CustomHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const CustomHeaderButton = styled.button`
  color: ${({ theme }) => theme.colors.gray500};
  margin-left: 1rem;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
`;

const CustomHeaderDate = styled.div`
  ${({ theme }) => theme.fonts.body2Bold};
  margin-left: 4rem;
  margin-right: 3rem;
`;

const Divider = styled.div`
  ${({ theme }) => theme.colors.gray300};
  margin-left: 1rem;
  width: 1rem;
`;

export default DateFilter;
