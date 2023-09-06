import styled from "styled-components";

const IMG_DUMMY_URL =
  "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg";

const ReviewCafeList = ({ item }) => {
  return (
    <ReviewContainer>
      <CafeInfo>
        <CafeImage
          src={item.cafePhoto ?? IMG_DUMMY_URL}
          alt="스터디카페 이미지"
        />
        <CafeDetails>
          <ReviewInfoCafe>{item.cafeName}</ReviewInfoCafe>
          <ReviewInfo>{item.roomName}</ReviewInfo>
          <ReviewInfo>
            결제금액 ₩{item.price}원({item.payType})
          </ReviewInfo>
          <ReviewInfo>{item.date}</ReviewInfo>
          <ReviewInfo>
            {item.startTime} - {item.endTime}
          </ReviewInfo>
        </CafeDetails>
      </CafeInfo>
    </ReviewContainer>
  );
};

export default ReviewCafeList;

const ReviewContainer = styled.div`
  margin-top: 3rem;
  margin-left: 6rem;
  padding: 3rem;
`;

const CafeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CafeImage = styled.img`
  width: 26rem;
  height: 15rem;
  border-radius: 2rem;
  margin-right: 2rem;
`;

const CafeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewInfoCafe = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`;

const ReviewInfo = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 0.4rem;
`;
