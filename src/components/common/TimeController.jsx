import React, { useState, useRef } from "react";
import styled from "styled-components";

const TimeController = ({
  hours,
  onSelectTimeBlock,
  selectedStartTime,
  selectedEndTime,
}) => {
  const timeListRef = useRef(null);
  const [isScrollLeftVisible, setScrollLeftVisible] = useState(false);
  const [isScrollRightVisible, setScrollRightVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleMouseEnter = () => {
    setScrollLeftVisible(true);
    setScrollRightVisible(true);
  };

  const handleMouseLeave = () => {
    setScrollLeftVisible(false);
    setScrollRightVisible(false);
  };

  const handleScrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition((prevScrollPosition) => prevScrollPosition - 1);
    }
  };

  const handleScrollRight = () => {
    if (scrollPosition < hours.length - 1) {
      setScrollPosition((prevScrollPosition) => prevScrollPosition + 1);
    }
  };

  return (
    <TimeControlerWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TimeListWrapper>
        <TimeList ref={timeListRef} scrollPosition={scrollPosition}>
          {hours.map((hour, index) => (
            <TimeItem
              key={index + scrollPosition}
              disabled={hour === null}
              selected={
                (selectedEndTime === undefined &&
                  selectedStartTime === index) ||
                (selectedEndTime !== undefined &&
                  selectedStartTime <= index &&
                  index <= selectedEndTime)
              }
              onClick={(e) =>
                onSelectTimeBlock(e, hour, index + scrollPosition)
              }
            >
              <TimeTextWrapper>
                {hour && <TimeText>{`${hour}시`}</TimeText>}
              </TimeTextWrapper>
            </TimeItem>
          ))}
        </TimeList>
      </TimeListWrapper>
      {isScrollLeftVisible && (
        <ScrollButtonLeft onClick={handleScrollLeft}>{"<"}</ScrollButtonLeft>
      )}
      {isScrollRightVisible && (
        <ScrollButtonRight onClick={handleScrollRight}>{">"}</ScrollButtonRight>
      )}
    </TimeControlerWrapper>
  );
};

export default TimeController;

const TimeControlerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TimeListWrapper = styled.div`
  overflow-x: hidden;
  width: 34.2rem;
`;

const TimeList = styled.ul`
  list-style: none;
  display: flex;
  min-width: 100rem;
  height: 5rem;
  padding-top: 1rem;
  transform: translateX(${(props) => -props.scrollPosition * 3.7}rem);
  transition: transform 0.2s ease-in-out;
`;

const TimeItem = styled.li`
  width: 3.6rem;
  height: 3.5rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  margin: 0.1rem;
  padding-bottom: 3rem;
  background-color: ${({ selected, theme, disabled }) => {
    if (selected) {
      return theme.colors.mainDark;
    } else if (disabled) {
      return theme.colors.gray300;
    }
    return theme.colors.main30;
  }};
`;

const TimeTextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-left: -2.8rem;
  padding-left: 1.5rem;
  height: 70%;
`;

const TimeText = styled.span`
  ${({ theme }) => theme.fonts.caption2};
  color: ${({ theme }) => theme.colors.black};
`;

const ScrollButtonLeft = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  position: absolute;
  left: 10%;
  top: 65%;
  transform: translateY(-50%);
`;

const ScrollButtonRight = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  position: absolute;
  right: 10%;
  top: 65%;
  transform: translateY(-50%);
`;
