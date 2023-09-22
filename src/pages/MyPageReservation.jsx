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

const MyPageReservation = () => {
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

  const accessToken = getCookie("accessToken");

  const closeModal = () => {
    setClickedItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDateFilter = (dateFilterData) => {
    //console.log("Selected Date Filter:", dateFilterData);
  };

  const handleItemClick = (item) => {
    setClickedItem(item);
  };
  const handle = () => {
    try {
      axios
        .get(
          "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reservations",
          {
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
          }
        )
        .then((response) => {
          console.log(response.data.reservationRecordInfoWithStatusList);
          console.log(response.data);
          setReservations(response.data.reservationRecordInfoWithStatusList);
        });
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    // 확정된 예약 데이터 가져오기
    axios
      .get(
        "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reservations",
        {
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
        }
      )
      .then((response) => {
        setReservations(response.data.reservationRecordInfoWithStatusList);
      });

    // 이용 중인 예약 데이터 가져오기
    // axios.get("").then((response) => {
    //   setOngoingReservations(response.data);
    // });

    // // 지난 예약 데이터 가져오기
    // axios.get("").then((response) => {
    //   setPastReservations(response.data);
    // });

    // // 취소된 예약 데이터 가져오기
    // axios.get("").then((response) => {
    //   setCancelledReservations(response.data);
    // });

    // 클릭한 탭에 따라 서버로 요청 보내기
    // const axiosReservations = async () => {
    //   try {
    //     const response = await GET(
    //       "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reservations",
    //       {
    //         // page: currentPage,
    //         // startDate: "",
    //         // endDate: "",
    //         // studycafeName: "",
    //         // tab: activeTab,
    //       }
    //     );

    //     setReservations(response.data.reservationInfo);
    //     setTotalPageCount(response.data.totalPageCount);
    //   } catch (error) {
    //     console.error("Error fetching reservations:", error);
    //   }
    // };

    // axiosReservations();
  }, [activeTab, currentPage]);

  return (
    <Wrapper>
      <ReservationText>예약 관리</ReservationText>
      <TabContainer>
        {/* 전체 예약 탭 */}
        <TabWrapper>
          <TabButton active={activeTab === "all"} onClick={() => handle()}>
            전체
          </TabButton>
          <TabIndicator active={activeTab === "all"} />
        </TabWrapper>

        {/* 이용 전 예약 탭 */}
        <TabWrapper>
          <TabButton
            active={activeTab === "confirmed"}
            onClick={() => handleTabChange("confirmed")}>
            이용 전 예약
          </TabButton>
          <TabIndicator active={activeTab === "confirmed"} />
        </TabWrapper>

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
