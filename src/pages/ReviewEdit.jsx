import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewEdit = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({});

  // 리뷰 정보를 불러오는 함수
  const fetchReview = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/studious/mypage/{userId}/reveiws/${reviewId}`
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [reviewId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleEditReview = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/studious/mypage/{userId}/reveiws/${reviewId}`,
        review
      );
      alert("리뷰가 수정되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error editing review:", error);
      alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrapper>
      <ReviewText>리뷰 작성</ReviewText>
      <TitleInput
        type="text"
        name="title"
        value={review.title}
        onChange={handleInputChange}
      />
      <ContentInput
        name="content"
        value={review.content}
        onChange={handleInputChange}
      />
      <EditButton onClick={handleEditReview}>수정 완료</EditButton>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ReviewText = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  color: ${({ theme }) => theme.colors.black};
  font-family: Noto Sans KR;
  width: 9.4rem;
  height: 3.5rem;
`;

const TitleInput = styled.input``;

const ContentInput = styled.textarea``;

const EditButton = styled.button`
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  padding: 6px 12px;
  cursor: pointer;
  width: 15rem;
  height: 4rem;
  border-radius: 12px;
`;

export default ReviewEdit;
