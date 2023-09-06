import { EditableDiv } from "components/common/Editor";
import styled from "styled-components";
import { Fragment } from "react";

const RefundPolicyBox = ({ refundPolicy }) => {
  return (
    <EditableDiv readOnly={true}>
      <div>
        <div style={{ color: "red" }}>
          *이용 당일 이후의 환불 관련 사항은 호스트에게 적접 문의하셔야 합니다.
        </div>
        <div>
          결제 후 2시간 이내에는 100% 환불이 가능합니다. (단, 이용시간 전까지만
          가능)
        </div>
      </div>
      <div>
        <RefundPolicyList>
          {refundPolicy?.length &&
            refundPolicy.map(({ day, rate }, index) => {
              return (
                <Fragment key={index}>
                  <div>{day}</div>
                  <div>{`총 금액의 ${rate} 환불`}</div>
                </Fragment>
              );
            })}
        </RefundPolicyList>
      </div>
    </EditableDiv>
  );
};

export default RefundPolicyBox;

const RefundPolicyList = styled.ul`
  margin-top: 4.5rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  row-gap: 1rem;
`;
