import styled from "styled-components";
import { formatNumberWithCommas } from "utils/formatNumber";
import NumberController from "components/common/NumberController";
import useRedirectLogin from "hooks/useRedirectLogin";
import { useNavigate } from "react-router-dom";

const StudyRoomItem = ({
  roomData: {
    id,
    name,
    minCount,
    maxCount,
    price,
    type,
    conveniences,
    paidConveniences,
    canReserveDatetime,
    photos,
  },
}) => {
  const navigate = useNavigate();
  const { handleRedirect } = useRedirectLogin();
  const handleClickReservation = () => {
    if (!handleRedirect()) {
      navigate(`/studyCafe/${id}/reservation`);
    }
  };
  return (
    <ItemContainer>
      <ItemLeftSection>
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
            {name}
            <div className="info__sub">{`최소 ${minCount}인 ~ 최대 ${maxCount}인`}</div>
          </div>
          <div className="info">
            <div>{`${formatNumberWithCommas(price)}원`}</div>
            <div className="info__sub">
              {type === "PER_HOUR" ? "/ 시간" : "/ 인"}
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
            <NumberController minCount={minCount} maxCount={maxCount} />
          </UserNumberCounterBox>
        </StudyRoomExtraOptionsBox>
        <ExpectedPriceLayout>
          <div>
            <span>예상 결제 금액</span>
            <span className="highlight">{`${formatNumberWithCommas(
              15000
            )}원`}</span>
          </div>
        </ExpectedPriceLayout>
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
`;
