import styled from "styled-components";
import { useEffect, useState } from "react";
import TabContainer from "../TabContainer";
import Calendar from "components/Search/Calendar";
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";
import StudyRoomItem from "./StudyRoomItem";
import { useStudyRoomReservations } from "hooks/queries/useStudyCafeDetails";
import { formatDateToString } from "utils/formatDate";
import { useSetRecoilState } from "recoil";
import { studyCafeDetails } from "recoil/atoms/studyCafeDetails";
import Loading from "components/common/Loading";

const StudyRoomReservation = ({ studyCafeId }) => {
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsShowCalendar(false);
  };
  const { data, isSuccess, isLoading } = useStudyRoomReservations({
    studyCafeId,
    date: formatDateToString(selectedDate, "-"),
  });
  const setStudyCafeDetailsState = useSetRecoilState(studyCafeDetails);

  useEffect(() => {
    if (isSuccess) {
      setStudyCafeDetailsState(data);
    }
  }, [data, isSuccess, setStudyCafeDetailsState]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <TabContainer title={"스터디룸 예약"}>
          <StudyRoomTabLayout>
            <SelectDateBox>
              <span>예약일자</span>
              <div onClick={() => setIsShowCalendar(!isShowCalendar)}>
                <span>{selectedDate.toLocaleDateString()}</span>
                <CalendarIcon />
              </div>
            </SelectDateBox>
            {isShowCalendar && (
              <Calendar
                defaultDate={selectedDate}
                onSelectDate={handleSelectDate}
              />
            )}
            {data &&
              data?.rooms.length !== 0 &&
              data.rooms.map((roomData, roomIndex) => {
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
      )}
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
