import Divider from "components/common/Divider";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import ReservationInfoSection from "components/myPage/reservation/cancel/ReservationInfoSection";

const MyReservationCancel = () => {
  const DUMMY_DATA = {
    studyname: "(스터디카페 이름)",
    roomname: "(룸 이름)",
    reservation: {
      date: "",
      startTime: "20:00",
      endTime: "22:00",
      duration: 2,
    },
    refundPolicy: [
      {
        day: "이용 8일 전",
        rate: 90, // 퍼센티지
      },
      {
        day: "이용 7일 전",
        rate: 80, // 퍼센티지
      },
      {
        day: "이용 6일 전",
        rate: 70, // 퍼센티지
      },
      {
        day: "이용 5일 전",
        rate: 60, // 퍼센티지
      },
      {
        day: "이용 4일 전",
        rate: 50, // 퍼센티지
      },
      {
        day: "이용 3일 전",
        rate: 40, // 퍼센티지
      },
      {
        day: "이용 2일 전",
        rate: 30, // 퍼센티지
      },
      {
        day: "이용 1일 전",
        rate: 20, // 퍼센티지
      },
    ],
    payment: {
      method: "(결제 수단)",
      price: 25000,
    },
    refund: {
      refundPrice: 1000,
      refundFee: 500,
      refundPolicyOnDay: {
        day: "이용 7일 전",
        rate: 80,
      },
    },
  };
  return (
    <TitleMainLayout title={"예약 취소"}>
      <ReservationInfoSection
        imageSrc={null}
        cafeName={"스터디카페 이름"}
        roomName={"스터디룸 이름"}
        reservationDateTime={"2023년 10월 8일"}
      />
      <Divider color="gray300" margin={4} />
    </TitleMainLayout>
  );
};
export default MyReservationCancel;
