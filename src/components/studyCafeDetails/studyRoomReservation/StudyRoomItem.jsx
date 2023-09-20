import styled from "styled-components";
import { formatNumberWithCommas } from "utils/formatNumber";
import NumberController from "components/common/NumberController";
import TimeController from "components/common/TimeController";
import useRedirectLogin from "hooks/useRedirectLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { reservationReqState } from "recoil/atoms/reservationReqState";
import { formatDateToString } from "utils/formatDate";
import useTimeController from "hooks/useTimeController";
import { useNumberController } from "hooks/useNumberController";

const StudyRoomItem = ({
  roomData: {
    id,
    roomName,
    minHeadCount,
    maxHeadCount,
    minUsingTime,
    price,
    priceType,
    conveniences,
    paidConveniences,
    canReserveDatetime,
    photos,
  },
  date,
}) => {
  const navigate = useNavigate();
  const { handleRedirect } = useRedirectLogin();
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const { pathname } = useLocation();
  const cafeId = pathname.slice(pathname.lastIndexOf("/") + 1);
  const setReservationReqState = useSetRecoilState(reservationReqState);
  const getEndTimeUsingTime = (startTime, endTime) => {
    let definedEndTime = endTime + 1;
    if (!definedEndTime) {
      definedEndTime = startTime + 1;
    }

    const usingTime = definedEndTime - startTime;
    return { usingTime, definedEndTime };
  };
  const handleClickReservation = () => {
    const { usingTime, definedEndTime } = getEndTimeUsingTime(
      startTime,
      endTime
    );
    if (definedEndTime - startTime < minUsingTime) {
      alert(`최소 이용 시간은 ${minUsingTime}시간입니다.`);
      return;
    }
    setReservationReqState({
      cafeId,
      roomId: id,
      date: formatDateToString(date, "-"),
      startTime: `${startTime.toString().padStart(2, "0")}:00`,
      endTime: `${definedEndTime.toString().padStart(2, "0")}:00`,
      usingTime,
      headCount: userCount,
      price: price * userCount * usingTime,
    });
    if (!handleRedirect()) {
      navigate(`/studyCafe/${id}/reservation`);
    }
  };
  const { onSelectTimeBlock } = useTimeController({
    startTime,
    setStartTime,
    setEndTime,
  });
  const { userCount, handleUserCount } = useNumberController(
    minHeadCount,
    maxHeadCount
  );

  const totalPrice = useMemo(
    () => price * userCount * getEndTimeUsingTime(startTime, endTime).usingTime,
    [userCount, startTime, endTime, price]
  );

  return (
    <ItemContainer>
      <ItemLeftSection isSingleImage={photos.length === 1}>
        <img src={photos[0]} alt="스터디룸 이미지" />
        <SmallImagesSlider gap={0.9}>
          {photos.slice(1).map((photo, photoIndex) => {
            return <img key={photoIndex} src={photo} alt="스터디룸 이미지" />;
          })}
        </SmallImagesSlider>
      </ItemLeftSection>
      <ItemRightSection>
        <StudyRoomMainInfoBox>
          <div className="info">
            {roomName}
            <div className="info__sub">{`최소 ${minHeadCount}인 ~ 최대 ${maxHeadCount}인`}</div>
          </div>
          <div className="info">
            <div>{`${formatNumberWithCommas(price)}원`}</div>
            <div className="info__sub">
              {priceType === "PER_HOUR" ? "/ 시간" : "/ 인"}
            </div>
          </div>
        </StudyRoomMainInfoBox>
        <StudyRoomExtraOptionsBox>
          <PaidConveniencesBox>
            <div>유료 편의시설</div>
            <select
              name="paidConveniences"
              className="select"
              defaultValue={"선택하기"}
              onChange={(e) => {}}
            >
              <option>선택하기</option>
              {paidConveniences.map((item, itemIndex) => (
                <option value={JSON.stringify(item)} key={itemIndex}>
                  {item.convenienceName}
                </option>
              ))}
            </select>
          </PaidConveniencesBox>
          <UserNumberCounterBox>
            <span>인원수</span>
            <NumberController
              userCount={userCount}
              handleUserCount={handleUserCount}
            />
          </UserNumberCounterBox>
        </StudyRoomExtraOptionsBox>
        <TimeController
          hours={canReserveDatetime[formatDateToString(date, "-")]}
          selectedStartTime={startTime}
          selectedEndTime={endTime}
          onSelectTimeBlock={onSelectTimeBlock}
        />
        {(startTime || endTime) && (
          <ExpectedPriceLayout>
            <div>
              <span>예상 결제 금액</span>
              <span className="highlight">{`${formatNumberWithCommas(
                totalPrice
              )}원`}</span>
            </div>
          </ExpectedPriceLayout>
        )}
        <ReservationButton onClick={handleClickReservation}>
          예약하기
        </ReservationButton>
      </ItemRightSection>
    </ItemContainer>
  );
};

export default StudyRoomItem;

const ItemContainer = styled.div`
  width: 100%;
  height: 56rem;
  background-color: ${({ theme }) => theme.colors.mostLight};
  padding: 4rem;
  display: flex;
  gap: 8.5rem;
`;

const ItemLeftSection = styled.section`
  width: 50%;
  display: flex;
  align-items: ${({ isSingleImage }) => (isSingleImage ? "center" : "stretch")};

  > img {
    border-radius: 2.5rem;
    width: 100%;
    height: 33rem;
    margin-bottom: 1.6rem;
  }
`;

const SmallImagesSlider = styled.div`
  display: flex;
  gap: ${({ gap }) => `${Number(gap)}rem`};
  padding-bottom: 0.7rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.gray200};
    border-radius: 1rem;
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray300};
    border-radius: 1rem;
  }
  img {
    border-radius: 2rem;
    width: calc(30% - ${({ gap }) => `${Number(gap)}rem`});
    height: 10rem;
  }
`;

const ItemRightSection = styled.section`
  width: 50%;
  position: relative;
`;

const StudyRoomMainInfoBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.heading1Bold};
  line-height: 3rem;
  div.info {
    display: flex;
    align-items: flex-end;
    &__sub {
      margin-left: 1rem;
      ${({ theme }) => theme.fonts.body2};
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
  margin-bottom: 4rem;
`;

const StudyRoomExtraOptionsBox = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.body1};
  margin-bottom: 3rem;
`;

const PaidConveniencesBox = styled.div`
  display: flex;
  gap: 1rem;
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    ${({ theme }) => theme.fonts.body2};
    width: 15rem;
    height: 3rem;
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray500};
    padding: 0 1.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.mainDark};
    }
  }

  select option:checked {
    color: red;
  }
`;

const UserNumberCounterBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const ExpectedPriceLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  div {
    display: flex;
    gap: 2rem;
    ${({ theme }) => theme.fonts.body1};
    .highlight {
      ${({ theme }) => theme.fonts.body1Bold};
    }
  }
  margin-bottom: 1rem;
  position: absolute;
  bottom: 5rem;
  right: 0;
`;

const ReservationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.mainDark};
  ${({ theme }) => theme.fonts.body1Bold};
  color: #fff;
  position: absolute;
  bottom: 0;
`;
