import styled from "styled-components";
import { useState } from "react";
import CommonInformation from "components/studyCafeDetails/commonInfomation/CommonInformation";
import NavBar from "components/studyCafeDetails/NavBar";
import StudyRoomReservation from "components/studyCafeDetails/studyRoomReservation/StudyRoomReservation";
import Reviews from "components/studyCafeDetails/reviews/Reviews";

const StudyCafeDetails = () => {
  const NAVBAR_CONTENTS = [
    {
      name: "스터디룸 예약",
      component: <StudyRoomReservation />,
    },
    {
      name: "리뷰",
      component: <Reviews />,
    },
    {
      name: "진행 중인 이벤트",
      component: <StudyRoomReservation />,
    },
    {
      name: "환불 정책",
      component: <StudyRoomReservation />,
    },
    {
      name: "유의사항",
      component: <StudyRoomReservation />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <CommonInformation />
      <NavBar
        navBarItems={NAVBAR_CONTENTS.map((content) => content.name)}
        onClickMenu={(idx) => setActiveIndex(idx)}
        activeIndex={activeIndex}
      />
      <DetailContentLayout>
        {NAVBAR_CONTENTS[activeIndex].component}
      </DetailContentLayout>
    </>
  );
};

export default StudyCafeDetails;

const DetailContentLayout = styled.div`
  margin-bottom: 10rem;
`;
