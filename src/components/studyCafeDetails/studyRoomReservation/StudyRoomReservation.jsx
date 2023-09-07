import styled from "styled-components";
import { useState } from "react";
import TabContainer from "../TabContainer";
import Calendar from "components/Search/Calendar";
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";
import StudyRoomItem from "./StudyRoomItem";
import { detailsStudyRoomsSelector } from "recoil/selectors/studyCafeDetails";
import { useRecoilValue } from "recoil";

const StudyRoomReservation = () => {
  const studyRoomsData = useRecoilValue(detailsStudyRoomsSelector);
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  return (
    <>
      <TabContainer title={"스터디룸 예약"}>
        <StudyRoomTabLayout>
          <SelectDateBox>
            <span>예약일자</span>
            <div onClick={() => setIsShowCalendar(() => !isShowCalendar)}>
              <span>{selectedDate}</span>
              <CalendarIcon />
            </div>
          </SelectDateBox>
          {isShowCalendar && <Calendar onSelectDate={() => {}} />}
          {studyRoomsData.map((roomData, roomIndex) => {
            return (
              <StudyRoomItem
                roomData={roomData}
                key={roomIndex}
                date={selectedDate}
              />
            );
          })}
        </StudyRoomTabLayout>
      </TabContainer>
    </>
  );
};

export default StudyRoomReservation;

const StudyRoomTabLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;
const SelectDateBox = styled.div`
  ${({ theme }) => theme.fonts.heading2}
  display: flex;
  gap: 3rem;
  align-items: center;

  > div {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
`;
