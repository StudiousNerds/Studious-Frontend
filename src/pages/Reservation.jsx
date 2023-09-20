import styled from "styled-components";
import RemoteControl from "components/reservation/RemoteControl";
import { useState, useEffect } from "react";
import useRedirectLogin from "hooks/useRedirectLogin";
import Divider from "components/common/Divider";
import { EditableDiv } from "components/common/Editor";
import theme from "styles/theme";
import { formatNumberWithCommas } from "utils/formatNumber";
import RefundPolicyBox from "components/common/RefundPolicyBox";
import { Title, TitleSub } from "components/common/Title";
import { useReservationQuery } from "hooks/queries/useReservation";
import { getCookie } from "utils/cookie";
import { useRecoilValue } from "recoil";
import { reservationReqState } from "recoil/atoms/reservationReqState";

const Reservation = () => {
  const { handleRedirect } = useRedirectLogin(true);
  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reservationInfo = useRecoilValue(reservationReqState);
  const {
    cafeId,
    roomId,
    date,
    startTime,
    endTime,
    usingTime,
    headCount,
    price,
    selectedPaidConvenience,
  } = reservationInfo;
  const { data } = useReservationQuery({
    cafeId,
    roomId,
    token: getCookie("accessToken"),
  });

  const [totalPrice, setTotalPrice] = useState(price);
  const [selectedConveniences, setSelectedConveniences] = useState([
    selectedPaidConvenience ?? null,
  ]);
  const [userInfo, setUserInfo] = useState({
    name: data?.username,
    phoneNumber: data?.userPhoneNumber,
    request: "",
  });

  const handleChangeMemberInfo = (e, key) => {
    let name = userInfo.name;
    let phoneNumber = userInfo.phoneNumber;
    if (key === "name") name = e.target.value;
    else if (key === "phoneNumber") phoneNumber = e.target.value;
    else
      throw new Error(
        "name, phoneNumber 중 어떤 값이 변경되었는지 인자를 전달해주세요"
      );
    setUserInfo((userInfo) => ({
      ...userInfo,
      name,
      phoneNumber,
    }));
  };

  const handleCheckSameAsPersonalInfo = (e) => {
    if (e.target.checked) {
      setUserInfo((userInfo) => ({
        ...userInfo,
        name: data?.username,
        phoneNumber: data?.userPhoneNumber,
      }));
    }
  };

  const handleCheckPaidConvenience = (e, convenienceName, price) => {
    if (!e.target.checked) {
      setTotalPrice((totalPrice) => totalPrice - price);
      const newSelectedConveniences = selectedConveniences.filter(
        (convenience) => {
          return convenience.convenienceName !== e.target.id;
        }
      );
      setSelectedConveniences(newSelectedConveniences);
      return;
    }
    setSelectedConveniences((prevConveniences) => [
      ...prevConveniences,
      {
        convenienceName,
        price,
      },
    ]);
    setTotalPrice((totalPrice) => totalPrice + price);
  };

  const handleRequestChange = (e) => {
    setUserInfo((userInfo) => ({
      ...userInfo,
      request: e.target.textContent,
    }));
  };

  return (
    <>
      <Title>{data?.cafeName}</Title>

      <RemoteControlSection>
        <RemoteControl
          cafeId={cafeId}
          roomId={roomId}
          date={date}
          startTime={startTime}
          endTime={endTime}
          usingTime={usingTime}
          headCount={headCount}
          selectedConveniences={selectedConveniences}
          userInfo={userInfo}
          totalPrice={totalPrice}
        />
      </RemoteControlSection>
      <MainSection>
        <TwoColumnContainer>
          <div className="left">
            <img src={data?.studycafePhoto} alt="스터디카페 이미지" />
          </div>
          <div className="right">
            <StudyRoomName>{data?.roomName}</StudyRoomName>
          </div>
        </TwoColumnContainer>
        <TwoColumnContainer>
          <div className="left">
            <TitleSub>예약자 정보</TitleSub>
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="input-row">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => handleChangeMemberInfo(e, "name")}
                />
              </div>
              <div className="input-row">
                <label htmlFor="contact">연락처</label>
                <input
                  type="text"
                  id="contact"
                  value={userInfo.phoneNumber}
                  onChange={(e) => handleChangeMemberInfo(e, "phoneNumber")}
                />
              </div>
              <CheckBoxListItem>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id="sameAsPersonalInfo"
                    onChange={handleCheckSameAsPersonalInfo}
                  />
                  <label htmlFor="sameAsPersonalInfo">
                    회원 정보와 동일하게
                  </label>
                </div>
              </CheckBoxListItem>
            </Form>
          </div>
          <div className="right">
            <TitleSub>요청사항</TitleSub>
            <EditableDiv
              placeholder="요청하실 내용을 입력해주세요."
              onChange={handleRequestChange}
            />
          </div>
        </TwoColumnContainer>

        <Divider
          length="100%"
          style={{ backgroundColor: theme.colors.gray200 }}
        />

        <RowContainer>
          <TitleSub>유료 편의 시설</TitleSub>
          {data?.paidConveniences.length ? (
            <CheckBoxList>
              {data?.paidConveniences.map(
                ({ convenienceName, price }, index) => {
                  return (
                    <CheckBoxListItem key={convenienceName + price + index}>
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          id={convenienceName}
                          onChange={(e) =>
                            handleCheckPaidConvenience(
                              e,
                              convenienceName,
                              price
                            )
                          }
                          defaultChecked={
                            convenienceName ===
                            selectedPaidConvenience.convenienceName
                          }
                        />
                        <label htmlFor={convenienceName}>
                          {convenienceName}
                        </label>
                      </div>
                      <span>₩ {formatNumberWithCommas(price)}</span>
                    </CheckBoxListItem>
                  );
                }
              )}
            </CheckBoxList>
          ) : (
            <span>유료 편의시설이 없습니다.</span>
          )}
        </RowContainer>

        <Divider
          length="100%"
          style={{ backgroundColor: theme.colors.gray200 }}
        />

        <RowContainer>
          <TitleSub>환불 규정</TitleSub>
          <RefundPolicyBox refundPolicy={data?.refundPolicy} />
        </RowContainer>
      </MainSection>
    </>
  );
};

export default Reservation;

const RemoteControlSection = styled.section`
  width: 30%;
  float: right;
  height: 100vh;
`;

const MainSection = styled.section`
  width: 70%;
  padding-right: 5rem;
`;

const RowContainer = styled.div`
  margin-bottom: 7rem;
  ${({ theme }) => theme.fonts.body1};
`;

const TwoColumnContainer = styled(RowContainer)`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  .left {
    img {
      border-radius: 1.5rem;
      max-width: 100%;
    }
  }
`;

const StudyRoomName = styled.div`
  ${({ theme }) => theme.fonts.heading2}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  .input-row {
    display: grid;
    grid-template-columns: 1fr 4fr;

    input {
      margin-left: 1rem;
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    }
  }
`;

const CheckBoxList = styled.ul`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckBoxListItem = styled.li`
  .checkbox {
    display: flex;
    gap: 1rem;
  }
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;
