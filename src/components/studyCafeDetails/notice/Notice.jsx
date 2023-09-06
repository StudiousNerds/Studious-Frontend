import styled from "styled-components";
import TabContainer from "../TabContainer";
import { EditableDiv } from "components/common/Editor";
import { detailsNoticeSelector } from "recoil/selectors/studyCafeDetails";
import { useRecoilValue } from "recoil";

const Notice = () => {
  const { notice } = useRecoilValue(detailsNoticeSelector);
  return (
    <TabContainer title="유의사항">
      <EditableDiv readOnly={true}>
        <NoticeLayout>
          {notice.map((noticeItem, index) => {
            return (
              <NoticeRow key={index}>
                <div className="no">{`${index + 1}.`}</div>
                <div>{noticeItem}</div>
              </NoticeRow>
            );
          })}
        </NoticeLayout>
      </EditableDiv>
    </TabContainer>
  );
};

export default Notice;

const NoticeLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2rem;
`;
const NoticeRow = styled.div`
  ${({ theme }) => theme.fonts.heading2};
  display: flex;
  gap: 1rem;
  .no {
    font-weight: 700;
  }
`;
