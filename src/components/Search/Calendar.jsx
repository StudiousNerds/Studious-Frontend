import React, { useState } from "react";
import styled, { css } from "styled-components";

const Day = ({ date, isSelected, isToday, isPastDate, onClick }) => {
  const dayOfWeek = date.getDay();
  const isSaturday = dayOfWeek === 6;
  const isSunday = dayOfWeek === 0;

  return (
    <DayContainer
      isSelected={isSelected}
      isToday={isToday}
      onClick={onClick}
      isPastDate={isPastDate}
    >
      {date.getDate()}
      {isToday && <TodayText>오늘</TodayText>}
    </DayContainer>
  );
};

const Calendar = ({ dafaultDate, onSelectDate }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = [];
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    daysInMonth.push(new Date(year, month, day));
  }

  const startDayOfWeek = firstDayOfMonth.getDay();

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const [selectedDate, setSelectedDate] = useState(dafaultDate);

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date) => {
    const today = new Date();
    if (date.getTime() < today.getTime()) {
      return;
    }
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarButton onClick={() => setMonth(month - 1)}>
          &lt;
        </CalendarButton>
        <CalendarMonth>{`${year}. ${String(month + 1).padStart(
          2,
          "0"
        )}`}</CalendarMonth>
        <CalendarButton onClick={() => setMonth(month + 1)}>
          &gt;
        </CalendarButton>
      </CalendarHeader>
      <CalendarWeekdays>
        <Weekday isSunday>일</Weekday>
        <Weekday>월</Weekday>
        <Weekday>화</Weekday>
        <Weekday>수</Weekday>
        <Weekday>목</Weekday>
        <Weekday>금</Weekday>
        <Weekday isSaturday>토</Weekday>
      </CalendarWeekdays>
      <CalendarDays>
        {Array(startDayOfWeek)
          .fill(null)
          .map((_, index) => (
            <EmptyDay key={`empty-${index}`} />
          ))}
        {daysInMonth.map((date) => (
          <Day
            key={date.getTime()}
            date={date}
            onClick={() => handleDateClick(date)}
            isSelected={
              selectedDate && date.getTime() === selectedDate.getTime()
            }
            isToday={isToday(date)}
            isPastDate={isPastDate(date)}
          />
        ))}
      </CalendarDays>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25rem;
  height: 30rem;
  padding-left: 7rem;
  margin: 3rem;
  border: none;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

const CalendarButton = styled.button`
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray500};
`;

const CalendarMonth = styled.div`
  ${({ theme }) => theme.fonts.heading2Bold};
`;

const CalendarWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Weekday = styled.div`
  ${({ theme }) => theme.fonts.body2};
  padding: 1.2rem;
  color: ${({ theme }) => theme.colors.gray900};
`;

const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const EmptyDay = styled.div`
  height: 40px;
`;

const DayContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 39, 176, 0.3);
  }

  color: ${({ isSaturday, isSunday, theme }) =>
    isSaturday ? "#2F5DFF" : isSunday ? "#FF4B4B" : theme.colors.gray900};

  ${(props) =>
    props.isSelected &&
    `
    background-color: #0027B0;
    color: #FFFFFF;
  `}

  ${(props) =>
    props.isToday &&
    `
    font-size: 1.8rem;
    font-weight: 700;
    color: #0027B0;
  `}

  ${(props) =>
    props.isPastDate &&
    `
    color: #c8c8c8;
    pointer-events: none;
    background-color: transparent; 
    &:hover {
      background-color: transparent; 
    }
  `}
`;

const TodayText = styled.div`
  ${({ theme }) => theme.fonts.caption2};
  position: absolute;
  top: 2rem;
  color: ${({ theme }) => theme.colors.mainDark};
  z-index: 1;
`;

export default Calendar;
