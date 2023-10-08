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
    reservation: {
      studycafeName: "Nerds",
      studycafePhoto:
        "https://studious-was-bucket.s3.ap-northeast-2.amazonaws.com/b6c73e77-7e36-46e8-ad85-fb2e63d1502d.jpeg",
      roomName: "roomA",
      reservation: {
        date: "2023-10-08",
        startTime: "02:00:00",
        endTime: "04:00:00",
        usingTime: 2,
      },
    },
    paymentRecord: {
      totalPrice: 14000,
      refundPrice: 0,
      refundFee: 14000,
      payment: [
        {
          price: 14000,
          method: "카드",
          completeTime: "2023-10-08T03:09:41",
        },
      ],
    },
    refundPolicy: {
      refundPolicy: [
        {
          day: "이용 8일 전",
          rate: 100,
        },
        {
          day: "이용 7일 전",
          rate: 100,
        },
        {
          day: "이용 6일 전",
          rate: 100,
        },
        {
          day: "이용 5일 전",
          rate: 100,
        },
        {
          day: "이용 4일 전",
          rate: 100,
        },
        {
          day: "이용 3일 전",
          rate: 70,
        },
        {
          day: "이용 2일 전",
          rate: 60,
        },
        {
          day: "이용 1일 전",
          rate: 50,
        },
        {
          day: "이용 당일",
          rate: 0,
        },
      ],
      refundPolicyOnDay: {
        day: "이용 당일",
        rate: 0,
      },
    },
  };

  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const handleConfirmChange = (e) =>
    e.target.checked ? setIsConfirmChecked(true) : setIsConfirmChecked(false);
  return (
    <TitleMainLayout title={"예약 취소"}>
      <ReservationInfoSection reservationData={DUMMY_DATA.reservation} />
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
