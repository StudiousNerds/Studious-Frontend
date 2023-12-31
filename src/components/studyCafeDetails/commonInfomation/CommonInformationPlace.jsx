import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ToggleBottomIcon } from "assets/icons/toggleBottom.svg";
import { ReactComponent as ToggleUpIcon } from "assets/icons/toggleUp.svg";
import { useRecoilValue } from "recoil";
import { studyCafeDetails } from "recoil/atoms/studyCafeDetails";
import * as ConvenienceIcons from "components/common/convenienceIcons";
import { convenienceDic } from "components/constants/ConvenienceData";

const CommonInformationPlace = () => {
  const commonDetails = useRecoilValue(studyCafeDetails);
  const { introduction, conveniences } = commonDetails;
  const [isUnfold, setIsUnfold] = useState(false);

  const handleToggleFold = () => {
    setIsUnfold(() => !isUnfold);
  };

  return (
    <>
      <TitleBox>공간 소개</TitleBox>
      <PlaceIntroContainer>
        <PlaceIntroTextBox isUnfold={isUnfold}>
          <div>
            <button>
              {isUnfold ? (
                <ToggleUpIcon onClick={handleToggleFold} />
              ) : (
                <ToggleBottomIcon onClick={handleToggleFold} />
              )}
            </button>
            {introduction}
          </div>
        </PlaceIntroTextBox>
        <PlaceIntroIconsContainer>
          {conveniences &&
            conveniences.length > 0 &&
            conveniences.map((convenienceName, index) => {
              return (
                <IconContainer>
                  <IconBox>
                    <img
                      src={ConvenienceIcons[convenienceName]}
                      width={"100%"}
                      height={"100%"}
                      alt="편의시설 아이콘"
                    />
                  </IconBox>
                  <IconLabel>{convenienceDic[convenienceName]}</IconLabel>
                </IconContainer>
              );
            })}
        </PlaceIntroIconsContainer>
      </PlaceIntroContainer>
    </>
  );
};

export default CommonInformationPlace;

const TitleBox = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
`;

const PlaceIntroContainer = styled.div`
  display: flex;
  border: 1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: 2.5rem;
`;

const PlaceIntroTextBox = styled.div`
  width: 50%;
  margin: 2rem 0;
  padding: 3rem 4.3rem;
  border-right: 1px solid;
  ${({ theme }) => theme.fonts.body1};
  ${({ isUnfold }) =>
    isUnfold
      ? `
      div {
        display: block;
        height: 100%;
      }
    `
      : `
      div {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: unset;
        text-overflow: ellipsis;
        height: 100%;
      }
    `}

  button {
    float: right;
    display: flex;
    align-items: flex-end;
    height: 100%;
    padding-bottom: 5px;
    shape-outside: inset(calc(100% - 24px) 0 0 0);
    color: ${({ theme }) => theme.colors.main30};
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
`;
const IconBox = styled.div`
  width: 4rem;
  height: 4rem;
`;

const IconLabel = styled.div``;

const PlaceIntroIconsContainer = styled.div`
  width: 50%;
  padding: 5.1rem 4.3rem;
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;
