import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReviewCafeList from "components/ReviewCafeList";
import ReservationSearchCafe from "components/ReservationSearchCafe";
import ReservationList from "components/ReservationList";
import FilterModal from "components/Search/FilterModal";
import DateFilter from "components/DateFilter";
import ReservationModal from "components/ReservationModal";
import { GET } from "apis/api";

const Reservation = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [clickedItem, setClickedItem] = useState(null);

  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const accessToken = getCookie("accessToken");
  if (accessToken) {
    console.log("AccessToken:", accessToken);
  } else {
    console.log("AccessToken이 존재하지 않습니다.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const closeModal = () => {
    setClickedItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const DUMMY_DATA1 = [
    {
      reservationRecordInfoList: [
        {
          studycafeName: "Nerds",
          studycafePhoto:
            "https://studious-was-bucket.s3.ap-northeast-2.amazonaws.com/70d9ec39-b0e0-4c50-8955-66854688cffd.jpeg",
          roomName: "roomA",
          reservationId: null,
          reservationDate: "2023-12-19",
          reservationStartTime: "09:00:00",
          reservationEndTime: "11:00:00",
          usingTime: 2,
          price: 16000,
          paymentMethod: "간편결제",
          reservationStatus: "BEFORE_USING",
          cancelReason: null,
        },
        {
          studycafeName: "Nerds",
          studycafePhoto:
            "https://studious-was-bucket.s3.ap-northeast-2.amazonaws.com/70d9ec39-b0e0-4c50-8955-66854688cffd.jpeg",
          roomName: "roomA",
          reservationId: null,
          reservationDate: "2023-12-10",
          reservationStartTime: "10:00:00",
          reservationEndTime: "12:00:00",
          usingTime: 2,
          price: 16000,
          paymentMethod: "간편결제",
          reservationStatus: "BEFORE_USING",
          cancelReason: null,
        },
        {
          studycafeName: "Nerds",
          studycafePhoto:
            "https://studious-was-bucket.s3.ap-northeast-2.amazonaws.com/70d9ec39-b0e0-4c50-8955-66854688cffd.jpeg",
          roomName: "roomA",
          reservationId: null,
          reservationDate: "2023-12-09",
          reservationStartTime: "09:00:00",
          reservationEndTime: "11:00:00",
          usingTime: 2,
          price: 16000,
          paymentMethod: "간편결제",
          reservationStatus: "BEFORE_USING",
          cancelReason: null,
        },
      ],
      pageNumber: 1,
      totalPage: 1,
    },
  ];

  const handleDateFilter = (dateFilterData) => {
    console.log("Selected Date Filter:", dateFilterData);
  };

  const handleItemClick = (item) => {
    setClickedItem(item);
  };
  const handle = () => {
    // try {
    //   axios
    //     .get(
    //       "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reservations",
    //       {
    //         params: {
    //           page: 1,
    //           startDate: "2023-07-30",
    //           endDate: "2023-07-31",
    //           studycafeName: "Nerds",
    //           tab: "ALL",
    //         },
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response.data);
    //       setReservations(response.data.reservationInfo);
    //     });
    // } catch (error) {
    //   console.error("Error fetching reservations:", error);
    // }
    setReservations(DUMMY_DATA1);
  };

  useEffect(() => {
    // // 확정된 예약 데이터 가져오기
    // axios
    //   .get("http://{ORIGIN}/studious/mypage/reservation-settings")
    //   .then((response) => {
    //     setConfirmedReservations(response.data);
    //   });

    // // 이용 중인 예약 데이터 가져오기
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
    const axiosReservations = async () => {
      try {
        const response = await GET(
          "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reservations",
          {
            page: currentPage,
            startDate: "",
            endDate: "",
            studycafeName: "",
            tab: activeTab,
          }
        );

        setReservations(response.data.reservationInfo);
        setTotalPageCount(response.data.totalPageCount);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    axiosReservations();
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

      {/* 각 탭에 따른 데이터 렌더링 */}
      {reservations.map((item, index) => (
        <>
          <ReservationList
            key={index}
            reservations={reservations}
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

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 2.5rem;
`;

const CloseButton = styled.button`
  margin: 3rem 70rem;
  background-color: #ffffff;
`;

const MarginReservationSearchCafe = styled.div`
  margin-left: 70rem;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(16, 16, 16, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Divider = styled.div`
  width: 93rem;
  margin-left: 6rem;
  height: 0.1rem;
  background-color: #c6c6c6;
`;

const ModalText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-left: 10rem;
`;
