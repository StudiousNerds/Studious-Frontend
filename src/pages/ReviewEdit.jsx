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
  }, []);

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

const TitleInput = styled.input``;

const ContentInput = styled.textarea``;

const EditButton = styled.button``;

export default ReviewEdit;
