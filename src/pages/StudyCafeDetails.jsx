import styled from "styled-components";
import { useState } from "react";
import CommonInformation from "components/studyCafeDetails/commonInfomation/CommonInformation";
import NavBar from "components/studyCafeDetails/NavBar";
import StudyRoomReservation from "components/studyCafeDetails/studyRoomReservation/StudyRoomReservation";
import Reviews from "components/studyCafeDetails/reviews/Reviews";
import RefundPolicy from "components/studyCafeDetails/refundPolicy/RefundPolicy";
import Notice from "components/studyCafeDetails/notice/Notice";
import { useLocation } from "react-router-dom";

const StudyCafeDetails = () => {
  const { pathname } = useLocation();
  const studyCafeId = pathname.slice(pathname.lastIndexOf("/") + 1);

  const NAVBAR_CONTENTS = [
    {
      name: "스터디룸 예약",
      component: <StudyRoomReservation studyCafeId={studyCafeId} />,
    },
    {
      name: "리뷰",
      component: <Reviews studyCafeId={studyCafeId} />,
    },
    {
      name: "진행 중인 이벤트",
      component: <div />,
    },
    {
      name: "환불 정책",
      component: <RefundPolicy studyCafeId={studyCafeId} />,
    },
    {
      name: "유의사항",
      component: <Notice studyCafeId={studyCafeId} />,
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
