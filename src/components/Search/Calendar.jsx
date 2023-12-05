import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Day = ({
  date,
  isSelected,
  isToday,
  isPastDate,
  isSaturday,
  isSunday,
  isHoliday,
  onClick,
}) => {
  return (
    <DayContainer
      isSelected={isSelected}
      isToday={isToday}
      onClick={onClick}
      isSaturday={isSaturday}
      isSunday={isSunday}
      isHoliday={isHoliday}
      isPastDate={isPastDate}>
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
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dafaultDate);

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

  const goToPreviousMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

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

  useEffect(() => {
    const calendarId = process.env.REACT_APP_CALENDAR_ID;
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
      )
      .then((response) => {
        const events = response.data.items;

        const holidays = events.map((event) => {
          const eventDate = new Date(event.start.date);
          eventDate.setHours(0, 0, 0, 0);
          return {
            name: event.summary,
            date: eventDate,
          };
        });

        setHolidays(holidays);
      })
      .catch((error) => {
        console.error("Error holidays:", error);
      });
  }, []);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarButton onClick={goToPreviousMonth}>&lt;</CalendarButton>
        <CalendarMonth>{`${year}. ${String(month + 1).padStart(
          2,
          "0"
        )}`}</CalendarMonth>
        <CalendarButton onClick={goToNextMonth}>&gt;</CalendarButton>
      </CalendarHeader>
      <CalendarWeekdays>
        <Weekday>일</Weekday>
        <Weekday>월</Weekday>
        <Weekday>화</Weekday>
        <Weekday>수</Weekday>
        <Weekday>목</Weekday>
        <Weekday>금</Weekday>
        <Weekday>토</Weekday>
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
            isPastDate={isPastDate(date)}
            isSelected={
              selectedDate && date.getTime() === selectedDate.getTime()
            }
            isHoliday={holidays.some(
              (holiday) => holiday.date.getTime() === date.getTime()
            )}
            isToday={isToday(date)}
            isSaturday={date.getDay() === 6}
            isSunday={date.getDay() === 0}
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
    pointer-events: none;
  `}

  ${(props) =>
    props.isSaturday &&
    `
    color: #2F5DFF; 
  `}

  ${(props) =>
    (props.isSunday || props.isHoliday) &&
    `
    color: #FF4B4B; 
  `}

  ${(props) =>
    props.isPastDate &&
    `
    color: #c8c8c8;
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
