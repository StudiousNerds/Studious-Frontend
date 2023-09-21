import React, { useState, useEffect } from "react";
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
import Loading from "components/common/Loading";

const Reservation = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [clickedItem, setClickedItem] = useState(null);

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        const tokenWithBearer = cookie.substring(name.length + 1);
        const token = tokenWithBearer.replace("Bearer%20", "");
        return token;
      }
    }
    return null;
  }

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
  const { data, isLoading } = useReservationQuery({
    cafeId,
    roomId,
    token: getCookie("accessToken"),
  });

  const [totalPrice, setTotalPrice] = useState(price);
  const [selectedConveniences, setSelectedConveniences] = useState(
    selectedPaidConvenience
  );
  const [userInfo, setUserInfo] = useState({
    name: data?.username,
    phoneNumber: data?.userPhoneNumber,
    request: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDateFilter = (dateFilterData) => {
    //console.log("Selected Date Filter:", dateFilterData);
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

  if (isLoading) return <Loading />;
  return (
    <>
      <Title>{data?.cafeName}</Title>

    //     setReservations(response.data.reservationInfo);
    //     setTotalPageCount(response.data.totalPageCount);
    //   } catch (error) {
    //     console.error("Error fetching reservations:", error);
    //   }
    // };

    // axiosReservations();
  }, [activeTab, currentPage]);

        <RowContainer>
          <TitleSub>유료 편의 시설</TitleSub>
          {data?.paidConveniences.length > 0 ? (
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
                            selectedPaidConvenience.length > 0
                              ? convenienceName ===
                                selectedPaidConvenience[0].convenienceName
                              : false
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

        {/* 이용 중인 예약 탭 */}
        <TabWrapper>
          <TabButton
            active={activeTab === "ongoing"}
            onClick={() => handleTabChange("ongoing")}>
            이용중인 예약
          </TabButton>
          <TabIndicator active={activeTab === "ongoing"} />
        </TabWrapper>
        {/* 지난 예약 탭 */}
        <TabWrapper>
          <TabButton
            active={activeTab === "past"}
            onClick={() => handleTabChange("past")}>
            지난 예약
          </TabButton>
          <TabIndicator active={activeTab === "past"} />
        </TabWrapper>

        {/* 취소된 예약 탭 */}
        <TabWrapper>
          <TabButton
            active={activeTab === "cancelled"}
            onClick={() => handleTabChange("cancelled")}>
            취소된 예약
          </TabButton>
          <TabIndicator active={activeTab === "cancelled"} />
        </TabWrapper>
      </TabContainer>

      <FilterAndSearchContainer>
        {activeTab !== "confirmed" ? (
          <>
            <DateFilter onDateFilter={handleDateFilter}></DateFilter>
            <ReservationSearchCafe></ReservationSearchCafe>
          </>
        ) : (
          <MarginReservationSearchCafe>
            <ReservationSearchCafe></ReservationSearchCafe>
          </MarginReservationSearchCafe>
        )}
      </FilterAndSearchContainer>
      {reservations.map((item, index) => (
        <>
          <ReservationList
            key={index}
            reservations={item}
            onItemClick={handleItemClick}
          />
          <Divider />
        </>
      ))}
      {clickedItem && (
        <ReservationModal item={clickedItem} onClose={closeModal} />
      )}
    </Wrapper>
  );
};

export default Reservation;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 6rem 8rem;
`;

const Wrapper = styled.div`
  margin-top: 5rem;
`;

const ReservationText = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const TabWrapper = styled.div`
  position: relative;
  width: 25rem;
`;

const TabButton = styled.button`
  ${({ theme }) => theme.fonts.heading2Bold};
  color: ${({ theme, active }) =>
    active ? theme.colors.mainDark : theme.colors.gray500};
  background-color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 3rem;
`;

const TabIndicator = styled.div`
  height: 0.3rem;
  width: 20rem;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.mainDark : theme.colors.gray500};
  position: absolute;
  bottom: 0;
`;

const FilterAndSearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MarginReservationSearchCafe = styled.div`
  margin-left: 70rem;
`;

const Divider = styled.div`
  width: 93rem;
  margin-left: 6rem;
  height: 0.1rem;
  background-color: #c6c6c6;
`;
