import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReviewCafeList from "components/ReviewCafeList";
import ReservationSearchCafe from "components/ReservationSearchCafe";
import ReservationList from "components/ReservationList";
import FilterModal from "components/Search/FilterModal";
import DateFilter from "components/DateFilter";
import { GET } from "apis/api";

const Reservation = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [clickedItem, setClickedItem] = useState(null);

  const closeModal = () => {
    setClickedItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const DUMMY_DATA1 = [
    {
      page: 0,
      totalPageCount: 2,
      reservationInfo: [
        {
          studycafeName: "스터디 카페 이름",
          studycafePhoto:
            "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
          roomName: "룸 이름",
          reservationId: 1,
          reservationDate: "2023년 05월 11일",
          reservationStartTime: "11:00",
          reservationEndTime: "13:00",
          usingTime: "2시간",
          price: "5,000",
          paymentMethod: "카카오페이",
          reservationStatus: "이용 완료",
          cancelReason: "",
          canceler: "",
        },
      ],
    },
    {
      page: 1,
      totalPageCount: 2,
      reservationInfo: [
        {
          studycafeName: "혜화 열정공장",
          studycafePhoto:
            "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
          roomName: "룸 이름",
          reservationId: 2,
          reservationDate: "2023년 05월 01일",
          reservationStartTime: "19:00",
          reservationEndTime: "21:00",
          usingTime: "2시간",
          price: "5,000",
          paymentMethod: "카카오페이",
          reservationStatus: "취소",
          cancelReason: "중복 예약",
          canceler: "사장님",
        },
      ],
    },
    {
      page: 1,
      totalPageCount: 2,
      reservationInfo: [
        {
          studycafeName: "혜화 열정공장",
          studycafePhoto:
            "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
          roomName: "룸 이름",
          reservationId: 3,
          reservationDate: "2023년 05월 01일",
          reservationStartTime: "19:00",
          reservationEndTime: "21:00",
          usingTime: "2시간",
          price: "5,000",
          paymentMethod: "카카오페이",
          reservationStatus: "이용 중",
          cancelReason: "",
          canceler: "",
        },
      ],
    },
    {
      page: 1,
      totalPageCount: 2,
      reservationInfo: [
        {
          studycafeName: "혜화 열정공장",
          studycafePhoto:
            "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
          roomName: "룸 이름",
          reservationId: 4,
          reservationDate: "2023년 05월 01일",
          reservationStartTime: "19:00",
          reservationEndTime: "21:00",
          usingTime: "2시간",
          price: "5,000",
          paymentMethod: "카카오페이",
          reservationStatus: "이용 전",
          cancelReason: "",
          canceler: "",
        },
      ],
    },
  ];

  const handleDateFilter = (dateFilterData) => {
    console.log("Selected Date Filter:", dateFilterData);
  };

  const handleItemClick = (item) => {
    setClickedItem(item);
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
        const response = await GET("studious/mypage/reservation-settings", {
          page: currentPage,
          startDate: "",
          endDate: "",
          studycafeName: "",
          tab: activeTab,
        });

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
          <TabButton
            active={activeTab === "all"}
            onClick={() => handleTabChange("all")}>
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
      {DUMMY_DATA1.map((item, index) => (
        <>
          <ReservationList key={index} reservations={DUMMY_DATA1} />
          <Divider />
        </>
      ))}
      {clickedItem && (
        <ModalBackground>
          <ReservationModal>
            <ModalContent>
              {/* 모달 컨텐츠에 clickedItem 데이터 렌더링 */}
              <CloseButton onClick={closeModal}>X</CloseButton>
            </ModalContent>
          </ReservationModal>
        </ModalBackground>
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

const ReservationModal = styled.div`
  width: 75rem;
  height: 60rem;
  background-color: #fff;
  border-radius: 2.5rem;
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
