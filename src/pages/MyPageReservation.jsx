import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReservationSearchCafe from "components/ReservationSearchCafe";
import ReservationList from "components/ReservationList";
import FilterModal from "components/Search/FilterModal";
import DateFilter from "components/DateFilter";
import ReservationModal from "components/ReservationModal";
import { GET } from "apis/api";
import Loading from "components/common/Loading";
import { getCookie } from "utils/cookie";

const MyPageReservation = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [clickedItem, setClickedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedItemDetails, setClickedItemDetails] = useState([]);

  const accessToken = getCookie("accessToken");

  const closeModal = () => {
    setClickedItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = {
      page: "",
      startDate: "",
      endDate: "",
      studycafeName: "",
      tab: tab,
    };

    try {
      GET("/reservations", {
        token: accessToken,
      }).then((response) => {
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
      const response = await GET(`/reservations/${item.reservationId}`, {
        token: accessToken,
      });

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
    axios
      .get("/mypage/reservations", {
        // params: {
        //   page: 1,
        //   startDate: "2023-07-30",
        //   endDate: "2023-07-31",
        //   studycafeName: "Nerds",
        //   tab: "ALL",
        // },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("here", response.data);
        setReservations(response.data.reservationRecordInfoWithStatusList);
        setIsLoading(false);
      });

    // 이용 중인 예약 데이터 가져오기
    // axios.get("").then((response) => {
    //   setOngoingReservations(response.data);
    // });

    const axiosReservations = async () => {
      try {
        const response = await GET("/reservations", accessToken);

        setReservations(response.data.reservationInfo);
        setTotalPageCount(response.data.totalPageCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setIsLoading(false);
      }
    };

    axiosReservations();
  }, [accessToken]);

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
                active={activeTab === "INUSE"}
                onClick={() => handleTabChange("INUSE")}>
                이용중인 예약
              </TabButton>
              <TabIndicator active={activeTab === "INUSE"} />
            </TabWrapper>

            {/* 지난 예약 탭 */}
            <TabWrapper>
              <TabButton
                active={activeTab === "PAST"}
                onClick={() => handleTabChange("PAST")}>
                지난 예약
              </TabButton>
              <TabIndicator active={activeTab === "PAST"} />
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
            {activeTab !== "INUSE" ? (
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
  width: 100rem;
  margin-left: 6rem;
  height: 0.1rem;
  background-color: #c6c6c6;
`;
