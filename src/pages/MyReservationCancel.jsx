import { Button } from "components/common/Button";
import Divider from "components/common/Divider";
import RefundPolicyBox from "components/common/RefundPolicyBox";
import { Title } from "components/common/Title";
import { BANK_CODES_DATA } from "components/constants/BankCodeData";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import PaymentDetailsSection from "components/myPage/reservation/cancel/PaymentDetailsSection";
import ReservationInfoSection from "components/myPage/reservation/cancel/ReservationInfoSection";
import { useState } from "react";
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

  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const handleConfirmChange = (e) =>
    e.target.checked ? setIsConfirmChecked(true) : setIsConfirmChecked(false);
  return (
    <TitleMainLayout title={"예약 취소"}>
      <ReservationInfoSection
        imageSrc={null}
        cafeName={"스터디카페 이름"}
        roomName={"스터디룸 이름"}
        reservationDateTime={"2023년 10월 8일"}
      />
      <Divider color="gray300" margin={4} />
      <PaymentRefundInfoSection>
        <div className="left">
          <PaymentDetailsSection />
          <section>
            <Title>환불 계좌 입력</Title>
            <DetailsRow>
              <span>환불 계좌</span>
              <div>
                <select>
                  {BANK_CODES_DATA.map(({ bankName, bankCode }) => (
                    <option value={bankCode}>{bankName}</option>
                  ))}
                </select>
                <input type="text" placeholder="계좌번호 입력" />
              </div>
            </DetailsRow>
          </section>
        </div>
        <div className="right">
          <RefundPolicyBox />
        </div>
      </PaymentRefundInfoSection>
      <ConfirmContainer>
        <div className="confirm-checkbox">
          <input
            id="confirm-checkbox__input"
            type="checkbox"
            onChange={handleConfirmChange}
          />
          <label for="confirm-checkbox__input">
            본인은 환불 정책을 확인하였으며 이상이 없음에 동의합니다.
          </label>
        </div>
        <Button
          text="다음"
          width={20}
          height={5}
          disabled={!isConfirmChecked}
        />
      </ConfirmContainer>
    </TitleMainLayout>
  );
};
export default MyReservationCancel;

const DetailsRow = styled.div`
  ${({ theme }) => theme.fonts.body2};
  display: flex;
  justify-content: space-between;
`;

const PaymentRefundInfoSection = styled.section`
  display: flex;
  gap: 5rem;
  .left {
    flex-grow: 1;
  }
  .right {
    width: 40%;
  }
  margin-bottom: 7rem;
`;

const ConfirmContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.body2}
  .confirm-checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
