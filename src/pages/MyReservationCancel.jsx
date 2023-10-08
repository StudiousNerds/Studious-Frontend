import ThumbnailImage from "components/common/ThumbnailImage";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import styled from "styled-components";

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
      <ReservationInfoSection>
        <ThumbnailImage width={40} height={24} />
      </ReservationInfoSection>
    </TitleMainLayout>
  );
};
export default MyReservationCancel;

const ReservationInfoSection = styled.section`
  display: flex;
  img {
  }
  div.text-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    ${({ theme }) => theme.fonts.heading2};
    .title {
      ${({ theme }) => theme.fonts.heading2Bold};
    }
  }
`;
