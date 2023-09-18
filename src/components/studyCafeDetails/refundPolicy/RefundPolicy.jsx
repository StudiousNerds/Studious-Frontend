import TabContainer from "../TabContainer";
import RefundPolicyBox from "components/common/RefundPolicyBox";
import { useRefundPolicy } from "hooks/queries/useStudyCafeDetails";

const RefundPolicy = ({ studyCafeId }) => {
  const { data } = useRefundPolicy({ studyCafeId });
  return (
    <TabContainer title="환불 정책">
      <RefundPolicyBox refundPolicy={data} />
    </TabContainer>
  );
};

export default RefundPolicy;
