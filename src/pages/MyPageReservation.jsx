import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReviewCafeList from "components/ReviewCafeList";
import ReservationSearchCafe from "components/ReservationSearchCafe";
import ReservationList from "components/ReservationList";
import FilterModal from "components/Search/FilterModal";
import DateFilter from "components/DateFilter";
import ReservationModal from "components/ReservationModal";
import axios from "axios";
import { GET } from "apis/api";
import Loading from "components/common/Loading";

const MyPageReservation = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [clickedItem, setClickedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedItemDetails, setClickedItemDetails] = useState([]);

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

  const accessToken = getCookie("accessToken");

  const closeModal = () => {
    setClickedItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    try {
      axios
        .get(
          "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reservations",
          {
            // params: {
            //   page: 1,
            //   startDate: "",
            //   endDate: "",
            //   studycafeName: "Nerds",
            //   tab: tab,
            // },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setReservations(response.data.reservationRecordInfoWithStatusList);
        });
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDateFilter = (dateFilterData) => {
    //console.log("Selected Date Filter:", dateFilterData);
  };

  const handleItemClick = async (item) => {
    try {
      const response = await axios.get(
        `/studious/mypage/reservations/${item.reservationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setClickedItemDetails(response.data);

      // 예약 모달을 열 수 있도록 설정
      setClickedItem(item);
    } catch (error) {
      console.error("Error fetching reservation details:", error);
    }
  };

  useEffect(() => {
    // 전체 예약 데이터 가져오기
    setIsLoading(true);

    const axiosReservations = async () => {
      try {
        const response = await GET("/studious/mypage/reservations", {
          page: currentPage,
          startDate: "",
          endDate: "",
          studycafeName: "",
          tab: "ALL",
        });

        setReservations(response.data.reservationInfo);
        setTotalPageCount(response.data.totalPageCount);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    axiosReservations();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <ReservationText>예약 관리</ReservationText>
          <TabContainer>
            {/* 전체 예약 탭 */}
            <TabWrapper>
              <TabButton
                active={activeTab === "ALL"}
                onClick={() => handleTabChange("ALL")}>
                전체
              </TabButton>
              <TabIndicator active={activeTab === "ALL"} />
            </TabWrapper>

            {/* 이용 전 예약 탭 */}
            <TabWrapper>
              <TabButton
                active={activeTab === "BEFORE_USING"}
                onClick={() => handleTabChange("BEFORE_USING")}>
                이용 전 예약
              </TabButton>
              <TabIndicator active={activeTab === "BEFORE_USING"} />
            </TabWrapper>

            {/* 이용 중인 예약 탭 */}
            <TabWrapper>
              <TabButton
                active={activeTab === "USING"}
                onClick={() => handleTabChange("USING")}>
                이용중인 예약
              </TabButton>
              <TabIndicator active={activeTab === "USING"} />
            </TabWrapper>

            {/* 지난 예약 탭 */}
            <TabWrapper>
              <TabButton
                active={activeTab === "AFTER_USING"}
                onClick={() => handleTabChange("AFTER_USING")}>
                지난 예약
              </TabButton>
              <TabIndicator active={activeTab === "AFTER_USING"} />
            </TabWrapper>

            {/* 취소된 예약 탭 */}
            <TabWrapper>
              <TabButton
                active={activeTab === "CANCELED"}
                onClick={() => handleTabChange("CANCELED")}>
                취소된 예약
              </TabButton>
              <TabIndicator active={activeTab === "CANCELED"} />
            </TabWrapper>
          </TabContainer>

          <FilterAndSearchContainer>
            {activeTab !== "USING" ? (
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
      )}
    </>
  );
};

export default MyPageReservation;

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
  width: 100rem;
  margin-left: 6rem;
  height: 0.1rem;
  background-color: #c6c6c6;
`;
