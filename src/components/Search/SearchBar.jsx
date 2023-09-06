import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "assets/icons/search100.svg";
import { ReactComponent as MinusIcon } from "assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TimeControler from "./TimeControler";
import Calendar from "./Calendar";
import { GET } from "apis/api";

const SearchBar = ({ onClose }) => {
  const navigate = useNavigate();
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCountOpen, setIsCountOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const hourlySchedules = [
    { starttime: "08:00", endtime: "09:00", selected: false },
    { starttime: "09:00", endtime: "10:00", selected: false },
    { starttime: "10:00", endtime: "11:00", selected: false },
    { starttime: "11:00", endtime: "12:00", selected: false },
    { starttime: "12:00", endtime: "13:00", selected: false },
    { starttime: "13:00", endtime: "14:00", selected: false },
    { starttime: "14:00", endtime: "15:00", selected: false },
    { starttime: "15:00", endtime: "16:00", selected: false },
    { starttime: "16:00", endtime: "17:00", selected: false },
    { starttime: "17:00", endtime: "18:00", selected: false },
    { starttime: "18:00", endtime: "19:00", selected: false },
    { starttime: "19:00", endtime: "20:00", selected: false },
    { starttime: "20:00", endtime: "21:00", selected: false },
    { starttime: "21:00", endtime: "22:00", selected: false },
    { starttime: "22:00", endtime: "23:00", selected: false },
    { starttime: "23:00", endtime: "24:00", selected: false },
  ];
  const [searchResult, setSearchResult] = useState([]);

  const [selectedStartTime, setSelectedStartTime] = useState(undefined);
  const [selectedEndTime, setSelectedEndTime] = useState(undefined);

  const onSelectTimeBlock = (e, timeBlock, index) => {
    if (!timeBlock.disabled) {
      if (selectedStartTime === undefined) {
        setSelectedStartTime(index);
        setSelectedEndTime(undefined);
      } else {
        setSelectedEndTime(index);
      }
    }
  };

  const handleModalInput = () => {
    setIsInputMode(!isInputMode);
    setInputValue("");
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleModalCalendar = () => {
    //날짜 및 시간 선택 버튼 클릭하면 모달 창 띄우고 닫기
    setIsCalendarOpen(!isCalendarOpen);
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleModalHeadcount = () => {
    //인원 수 버튼 클릭하면 모달 창 띄우고 닫기
    setIsCountOpen(!isCountOpen);
  };

  const handleDecreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncreaseCount = () => {
    setCount(count + 1);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSearch = async ({
    page,
    keyword,
    date,
    startTime,
    endTime,
    headCount,
    sortType,
    minGrade,
    eventInProgress,
    hashtags,
    conveniences,
  }) => {
    const params = {
      page,
      keyword,
      date,
      startTime,
      endTime,
      headCount,
      sortType,
      minGrade,
      eventInProgress,
      hashtags: Array.isArray(hashtags) ? hashtags.join(",") : [],
      conveniences: Array.isArray(conveniences) ? conveniences.join(",") : [],
    };

    try {
      const response = await GET("/studious/search", null, params);

      if (response.status === 200) {
        const responseData = response.data;
        setSearchResult(responseData);

        navigate("/search-result", {
          state: {
            searchResult: responseData,
            searchParameters: {
              page,
              keyword,
              date,
              startTime,
              endTime,
              headCount,
              sortType,
              minGrade,
              eventInProgress,
              hashtags,
              conveniences,
            },
          },
        });
      }
    } catch (error) {
      console.error("Error data:", error);
    }
  };

  const handleSearchButtonClick = async () => {
    const searchQuery = inputValue;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const selectedDateFormatted = `${year}-${month}-${day}`;
    const selectedTimeRange =
      selectedStartTime !== undefined && selectedEndTime !== undefined
        ? {
            startTime: formatTime(
              new Date(
                `2023-07-20T${hourlySchedules[selectedStartTime].starttime}`
              )
            ),
            endTime: formatTime(
              new Date(`2023-07-20T${hourlySchedules[selectedEndTime].endtime}`)
            ),
          }
        : {};

    const searchParameters = {
      page: 1,
      keyword: searchQuery,
      date: selectedDateFormatted,
      startTime: selectedTimeRange.startTime || "",
      endTime: selectedTimeRange.endTime || "",
      headCount: count,
      sortType: "GRADE_DESC",
      minGrade: 0,
      eventInProgress: "",
      hashtags: "",
      conveniences: "",
    };

    try {
      await handleSearch(searchParameters);

      onClose();
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <SearchBarWrapper>
      <SearchBarLayout>
        {isInputMode ? (
          <SearchBarInput
            type="text"
            placeholder="스터디카페 이름 혹은 위치"
            value={inputValue}
            onChange={handleChangeInput}
            autoFocus={isInputMode}
          />
        ) : (
          <SearchBarButtonText onClick={handleModalInput}>
            스터디카페 이름 혹은 위치
          </SearchBarButtonText>
        )}
        <SearchBarSeparator />
        {isCalendarOpen ? (
          <SearchBarButtonText onClick={handleModalCalendar}>
            날짜 및 시간 선택
            <CalendarModal onClick={(e) => e.stopPropagation()}>
              {isDatePickerOpen && (
                <>
                  <Calendar onSelectDate={handleSelectDate} />
                  <Divider />
                  <SelectedDateText>
                    {selectedDate.toLocaleDateString("ko-KR", {
                      month: "numeric",
                      day: "numeric",
                      weekday: "short",
                    })}
                    {selectedStartTime !== undefined &&
                    selectedEndTime !== undefined ? (
                      <>{` ${hourlySchedules[selectedStartTime].starttime} - ${hourlySchedules[selectedEndTime].endtime}`}</>
                    ) : (
                      ""
                    )}
                  </SelectedDateText>
                  <Divider />
                  <TimeControler
                    hourlySchedules={hourlySchedules}
                    onSelectTimeBlock={onSelectTimeBlock}
                    selectedStartTime={selectedStartTime}
                    selectedEndTime={selectedEndTime}
                  />
                </>
              )}
            </CalendarModal>
          </SearchBarButtonText>
        ) : (
          <SearchBarButtonText onClick={handleModalCalendar}>
            날짜 및 시간 선택
          </SearchBarButtonText>
        )}
        <SearchBarSeparator />
        {isCountOpen ? (
          <SearchBarButtonText onClick={handleModalHeadcount}>
            인원 수
            <CountModal onClick={(e) => e.stopPropagation()}>
              <CountModalTitle>인원</CountModalTitle>
              <CountButtonContainer>
                <CountButton onClick={handleDecreaseCount}>
                  <MinusIcon />
                </CountButton>
                <CountText>{count}</CountText>
                <CountButton onClick={handleIncreaseCount}>
                  <PlusIcon />
                </CountButton>
              </CountButtonContainer>
              <CountModalContent>만 13세 이상</CountModalContent>
            </CountModal>
          </SearchBarButtonText>
        ) : (
          <SearchBarButtonText onClick={handleModalHeadcount}>
            인원 수
          </SearchBarButtonText>
        )}
        <SearchBarButton onClick={handleSearchButtonClick}>
          <SearchIcon />
        </SearchBarButton>
      </SearchBarLayout>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SearchBarLayout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100rem;
  height: 9rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 10rem;
  padding: 9px;
  margin-top: 11px;
`;
const SearchBarInput = styled.input`
  ${({ theme }) => theme.fonts.body1};
  border: none;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.black};
  padding-left: 6rem;
`;
const SearchBarButtonText = styled.button`
  ${({ theme }) => theme.fonts.body1};
  border: none;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    cursor: pointer;
  }
`;
const SearchBarSeparator = styled.div`
  width: 0.1rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.gray300};
`;
const SearchBarButton = styled.button`
  width: 23rem;
  height: 7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.mainDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 0 0;
`;
const CalendarModal = styled.div`
  position: fixed;
  top: 34%;
  left: 34%;
  width: 40rem;
  height: 50rem;
  background-color: #ffffff;
  border-radius: 2rem;
  z-index: 4;
`;
const CountModal = styled.div`
  position: fixed;
  justify-content: space-between;
  align-items: center;
  top: 34%;
  left: 70%;
  width: 40rem;
  height: 15rem;
  background-color: #ffffff;
  border-radius: 2rem;
  z-index: 4;
  &:hover {
    cursor: auto;
  }
`;
const CountModalTitle = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.black};
  padding: 2.4rem 33.4rem 1rem 3.2rem;
`;
const CountButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 26.5rem;
`;
const CountText = styled.div`
  ${({ theme }) => theme.fonts.heading2Bold};
  color: ${({ theme }) => theme.colors.black};
  padding: 0 2rem 0 3rem;
`;
const CountButton = styled.button`
  width: 3rem;
  height: 3rem;
`;
const CountModalContent = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray500};
  text-align: left;
  padding-left: 3.2rem;
`;
const Divider = styled.div`
  width: 34rem;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: 1rem 3rem 1rem 3rem;
`;
const SelectedDateText = styled.div`
  ${({ theme }) => theme.fonts.body2Bold};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 1rem;
  padding: 0 2rem;
  margin: 0 0 0 4rem;
  text-align: left;
`;
