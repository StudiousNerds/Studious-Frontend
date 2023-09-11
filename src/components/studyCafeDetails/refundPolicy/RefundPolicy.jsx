import TabContainer from "../TabContainer";
import RefundPolicyBox from "components/common/RefundPolicyBox";
import { useRecoilValue } from "recoil";
import { detailsRefundPolicySelector } from "recoil/selectors/studyCafeDetails";

const RefundPolicy = () => {
  const { refundPolicy } = useRecoilValue(detailsRefundPolicySelector);
  return (
    <TabContainer title="환불 정책">
      <RefundPolicyBox refundPolicy={refundPolicy} />
    </TabContainer>
  );
};

export default RefundPolicy;
