import styled from "styled-components";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import ReservationInfoSection from "components/myPage/reservation/cancel/ReservationInfoSection";
import Divider from "components/common/Divider";
import { Title } from "components/common/Title";
import NumberController from "components/common/NumberController";
import { useNumberController } from "hooks/useNumberController";
import { useMemo, useState } from "react";
import { Button } from "components/common/Button";
import { formatNumberWithCommas } from "utils/formatNumber";

const MyReservationModify = () => {
  const DUMMY_DATA = {
    place: {
      studycafeName: "Nerds",
      roomName: "roomA",
      address: "서울 성북구 동소문로 14-8 Nerds 빌딩 5층",
    },
    reservation: {
      date: "2023-11-22",
      startTime: "02:00:00",
      endTime: "05:00:00",
      usingTime: 3,
    },
    headCount: 5,
    paidList: [],
    notPaidList: [
      {
        name: "MONITOR",
        price: 1000,
      },
      {
        name: "BEAM",
        price: 2000,
      },
      {
        name: "POINTER",
        price: 500,
      },
      {
        name: "NOTEBOOK",
        price: 1000,
      },
    ],
  };
  const { userCount, handleUserCount } = useNumberController(2, 6, 5);
  const [additionalItemsPrice, setAdditionalItemsPrice] = useState(0);
  const handleItemChange = (e) => {
    const targetPrice = JSON.parse(e.target.value).price;
    if (e.target.checked) {
      setAdditionalItemsPrice(
        (additionalItemsPrice) => additionalItemsPrice + targetPrice
      );
      return;
    }
    setAdditionalItemsPrice(
      (additionalItemsPrice) => additionalItemsPrice - targetPrice
    );
  };
  const additionalTotalPrice = useMemo(() => {
    return (userCount - DUMMY_DATA.headCount) * 2000 + additionalItemsPrice;
  }, [userCount, additionalItemsPrice, DUMMY_DATA.headCount]);
  return (
    <TitleMainLayout title={"예약 취소"}>
      <ReservationInfoSection
        studycafeName={DUMMY_DATA.place.studycafeName}
        roomName={DUMMY_DATA.place.roomName}
        reservation={DUMMY_DATA.reservation}
      />
      <Divider color="gray300" margin={4} />
      <DetailItem>
        <Title>인원수</Title>
        <NumberController
          userCount={userCount}
          handleUserCount={handleUserCount}
        />
      </DetailItem>
      <Title>유료 편의시설</Title>
      <CheckBoxList>
        {DUMMY_DATA.paidList.length > 0 &&
          DUMMY_DATA.paidList.map(({ name, price }) => (
            <CheckBoxListItem>
              <input id="paid-checkbox-list" type="checkbox" disabled />
              <label
                for="paid-checkbox-list"
                className="paid-checkbox-list__label"
              >
                <span>{name}</span>
                <span>{price}</span>
              </label>
            </CheckBoxListItem>
          ))}
      </CheckBoxList>
      <CheckBoxList>
        {DUMMY_DATA.notPaidList.length > 0 &&
          DUMMY_DATA.notPaidList.map(({ name, price }) => (
            <CheckBoxListItem>
              <input
                id="paid-checkbox-list"
                type="checkbox"
                onChange={handleItemChange}
                value={JSON.stringify({ name, price })}
              />
              <label
                for="paid-checkbox-list"
                className="paid-checkbox-list__label"
              >
                <span>{name}</span>
                <span>{`₩ ${price}`}</span>
              </label>
            </CheckBoxListItem>
          ))}
      </CheckBoxList>
      <SummaryRow>
        <PaymentSummary>
          <span>추가 결제 금액</span>
          <span>{`${formatNumberWithCommas(additionalTotalPrice)}원`}</span>
        </PaymentSummary>
        <Button
          text="결제하기"
          colorTheme="light"
          width={15}
          height={4}
          disabled={additionalTotalPrice === 0}
        />
      </SummaryRow>
    </TitleMainLayout>
  );
};

export default MyReservationModify;

const DetailItem = styled.div`
  margin-bottom: 7rem;
`;

const CheckBoxList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const CheckBoxListItem = styled.li`
  ${({ theme }) => theme.fonts.body2};
  display: flex;

  label {
    width: 20%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }
`;

const SummaryRow = styled.div`
  float: right;
  display: flex;
  align-items: center;
  gap: 5rem;
`;

const PaymentSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  span:first-child {
    ${({ theme }) => theme.fonts.caption2}
  }
  span:last-child {
    ${({ theme }) => theme.fonts.heading2Bold}
  }
`;
