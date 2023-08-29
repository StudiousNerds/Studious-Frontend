import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReviewCafeList from "components/ReviewCafeList";
import ReservationSearchCafe from "components/ReservationSearchCafe";
import ReservationList from "components/ReservationList";
import FilterModal from "components/Search/FilterModal";
import DateFilter from "components/DateFilter";

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
          studycafePhoto: "(스터디 카페 대표 사진)",
          roomName: "룸 이름",
          reservationId: 1,
          reservationDate: "2023년 05월 11일",
          reservationStartTime: "11:00",
          reservationEndTime: "13:00",
          usingTime: "(2시간)",
          price: "₩5,000원",
          paymentMethod: "(카카오페이)",
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
          studycafePhoto: "(스터디 카페 대표 사진)",
          roomName: "룸 이름",
          reservationId: 2,
          reservationDate: "2023년 05월 01일",
          reservationStartTime: "19:00",
          reservationEndTime: "21:00",
          usingTime: "(2시간)",
          price: "₩5,000원",
          paymentMethod: "(카카오페이)",
          reservationStatus: "취소",
          cancelReason: "중복 예약",
          canceler: "사장님",
        },
      ],
    },
  ];

  const handleDateFilter = (dateFilterData) => {
    // 선택한 날짜 범위 정보를 받아서 사용할 수 있습니다.
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
    let url = "http://{ORIGIN}/studious/mypage/reservation-settings";
    if (url) {
      axios
        .get(url, {
          params: {
            page: currentPage,
            startDate: "",
            endDate: "",
            studycafeName: "",
            tab: activeTab,
          },
        })
        .then((response) => {
          setReservations(response.data.reservationInfo);
          setTotalPageCount(response.data.totalPageCount);
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
        });
    }
  }, [activeTab]);

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

        {/* 확정된 예약 탭 */}
        <TabWrapper>
          <TabButton
            active={activeTab === "confirmed"}
            onClick={() => handleTabChange("confirmed")}>
            확정된 예약
          </TabButton>
          <TabIndicator active={activeTab === "confirmed"} />
        </TabWrapper>

        {/* 이용 중인 예약 탭 */}
        <TabWrapper>
          <TabButton
            active={activeTab === "ongoing"}
            onClick={() => handleTabChange("ongoing")}>
            이용 중인 예약
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
        <DateFilter onDateFilter={handleDateFilter}></DateFilter>
        <ReservationSearchCafe></ReservationSearchCafe>
      </FilterAndSearchContainer>
      {/* 각 탭에 따른 데이터 렌더링 */}
      {DUMMY_DATA1.map((item, index) => (
        <ReviewCafeList key={index} item={item} onItemClick={handleItemClick} />
      ))}
      {clickedItem && (
        <ReservationModal>
          <ModalContent>
            {/* 모달 컨텐츠에 clickedItem 데이터 렌더링 */}
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalContent>
        </ReservationModal>
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

const Separator = styled.div`
  width: 105rem;
  height: 0.1rem;
  margin: 4rem 6rem;
  background-color: ${({ theme }) => theme.colors.gray300};
`;

const ReservationModal = styled.div`
  width: 85rem;
  height: 70rem;
  background-color: red;
  border-radius: 2.5rem;
`;

const ModalContent = styled.div`
  /* 모달 컨텐츠 스타일 */
  background-color: red;
`;

const CloseButton = styled.button`
  background-color: red;
`;
