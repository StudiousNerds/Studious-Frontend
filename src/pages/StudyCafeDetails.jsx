import styled from "styled-components";
import { useState } from "react";
import CommonInformation from "components/studyCafeDetails/commonInfomation/CommonInformation";
import NavBar from "components/studyCafeDetails/NavBar";
import StudyRoomReservation from "components/studyCafeDetails/studyRoomReservation/StudyRoomReservation";
import Reviews from "components/studyCafeDetails/reviews/Reviews";
import RefundPolicy from "components/studyCafeDetails/refundPolicy/RefundPolicy";
import Notice from "components/studyCafeDetails/notice/Notice";

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
      component: <div />,
    },
    {
      name: "환불 정책",
      component: <RefundPolicy />,
    },
    {
      name: "유의사항",
      component: <Notice />,
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
