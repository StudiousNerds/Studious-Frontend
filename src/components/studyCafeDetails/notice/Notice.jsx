import styled from "styled-components";
import TabContainer from "../TabContainer";
import { EditableDiv } from "components/common/Editor";
import { useNotices } from "hooks/queries/useStudyCafeDetails";

const Notice = ({ studyCafeId }) => {
  const { data } = useNotices({ studyCafeId });
  return (
    <TabContainer title="유의사항">
      <EditableDiv readOnly={true}>
        <NoticeLayout>
          {data && data?.length !== 0 ? (
            data.map((noticeItem, index) => {
              return (
                <NoticeRow key={index}>
                  <div className="no">{`${index + 1}.`}</div>
                  <div>{noticeItem}</div>
                </NoticeRow>
              );
            })
          ) : (
            <div>유의사항이 없습니다.</div>
          )}
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
