import styled from "styled-components";

/**
 * 백분율을 진행바로 표시
 * @param {Object} obj
 * @param {number} obj.width
 * @param {number} obj.percentage 백분율
 * @returns 백분율 만큼의 진행바 컴포넌트
 */
const ProgressBar = ({ width, percentage }) => {
  return (
    <ProgressBarLayout width={width}>
      <BarTrack />
      <BarThumb percentage={percentage} />
    </ProgressBarLayout>
  );
};

export default ProgressBar;

const ProgressBarLayout = styled.div`
  width: ${({ width }) => `${width}rem`};
  height: 2rem;
  position: relative;
`;

const BarTrack = styled.div`
  background-color: ${({ theme }) => theme.colors.main30};
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 1rem;
`;

const BarThumb = styled.div`
  background-color: ${({ theme }) => theme.colors.mainDark};
  width: ${({ percentage }) => `${percentage}%`};
  height: 100%;
  position: absolute;
  border-radius: 1rem;
`;
