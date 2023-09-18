import styled from "styled-components";
import { ReactComponent as StarGrayIcon } from "assets/icons/starGray.svg";
import { ReactComponent as StarYellowIcon } from "assets/icons/starYellow.svg";

/**
 * 별점 보여주는 컴포넌트 (점수만큼 노란 별로 채워짐)
 * @param {Object} obj
 * @param {number} obj.size 별 하나의 크기
 * @param {number} obj.grade 별점 (5점 만점)
 * @returns grade만큼 채워진 별점 컴포넌트
 */
const StarsGrade = ({ size, grade }) => {
  return (
    <StarsContainer>
      <StarsBackgroundLayout size={size}>
        <div className="stars-container">
          <div className="star">
            <StarGrayIcon />
          </div>
          <div className="star">
            <StarGrayIcon />
          </div>
          <div className="star">
            <StarGrayIcon />
          </div>
          <div className="star">
            <StarGrayIcon />
          </div>
          <div className="star">
            <StarGrayIcon />
          </div>
        </div>
      </StarsBackgroundLayout>
      <StarsLayout size={size} grade={grade}>
        <div className="stars-container">
          <div className="star">
            <StarYellowIcon />
          </div>
          <div className="star">
            <StarYellowIcon />
          </div>
          <div className="star">
            <StarYellowIcon />
          </div>
          <div className="star">
            <StarYellowIcon />
          </div>
          <div className="star">
            <StarYellowIcon />
          </div>
        </div>
      </StarsLayout>
    </StarsContainer>
  );
};

export default StarsGrade;

const StarsContainer = styled.div`
  position: relative;
`;
const StarsBackgroundLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  div.stars-container {
    display: flex;
    gap: 8px;
    z-index: 1;
  }
  div.star {
    flex-shrink: 0;
    width: ${({ size }) => `${size}rem`};
  }
`;

const StarsLayout = styled(StarsBackgroundLayout)`
  div.stars-container {
    width: ${({ grade }) => `${(grade / 5 > 5 ? 5 : grade / 5) * 100}%`};
    overflow: hidden;
    white-space: nowrap;
    z-index: 1;
  }
`;
