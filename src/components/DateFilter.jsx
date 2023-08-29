import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

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
const DateFilter = ({ onDateFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState("1year");
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    const currentDate = new Date();
    let startDate, endDate;

    switch (filter) {
      case "1year":
        startDate = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        endDate = currentDate;
        break;
      case "1week":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
        endDate = currentDate;
        break;
      case "1month":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        endDate = currentDate;
        break;
      case "3months":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 3,
          currentDate.getDate()
        );
        endDate = currentDate;
        break;
      default:
        startDate = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        endDate = currentDate;
    }

    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setSelectedFilter("");
    console.log(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setSelectedFilter("");
  };

  onDateFilter({
    filter: selectedFilter,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  return (
    <FilterContainer>
      <FilterButton
        active={selectedFilter === "1year"}
        onClick={() => handleFilterChange("1year")}>
        최근 1년
      </FilterButton>
      <FilterButton
        active={selectedFilter === "1week"}
        onClick={() => handleFilterChange("1week")}>
        1주일
      </FilterButton>
      <FilterButton
        active={selectedFilter === "1month"}
        onClick={() => handleFilterChange("1month")}>
        1개월
      </FilterButton>
      <FilterButton
        active={selectedFilter === "3months"}
        onClick={() => handleFilterChange("3months")}>
        3개월
      </FilterButton>
      <DatePickerContainer>
        <StyledDatePicker
          selected={selectedStartDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy.MM.dd"
          locale={ko}
          maxDate={selectedEndDate}
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
      <DatePickerContainer>
        <StyledDatePicker
          selected={selectedEndDate}
          onChange={handleEndDateChange}
          dateFormat="yyyy.MM.dd"
          locale={ko}
          maxDate={new Date()}
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
  margin-left: 8rem;
`;

const FilterButton = styled.button`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme, active }) => (active ? "#FFFFFF" : theme.colors.gray900)};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.mainDark : theme.colors.gray200};
  border: none;
  border-radius: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  width: 7.8rem;
  height: 4rem;
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

  /* 오늘 날짜 이후 스타일 */
  .react-datepicker__day--disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.gray400} !important;
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

export default DateFilter;
