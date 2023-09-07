import styled from "styled-components";
import theme from "styles/theme";
import Divider from "components/common/Divider";
import { formatNumberWithCommas } from "utils/formatNumber";
import { DarkButton } from "components/common/Button";

const RemoteControl = ({
  date,
  startTime,
  endTime,
  duration,
  headcount,
  selectedConveniences,
  totalPrice,
}) => {
  return (
    <RemoteControlBox>
      <div className="text">
        <RemoteControlInfoBox>
          <div className="info-row">
            <div className="info-row__label">예약날짜</div>
            <div className="info-row__content">{date}</div>
          </div>
          <div className="info-row">
            <div className="info-row__label">예약시간</div>
            <div className="info-row__content">{`${startTime} - ${endTime} (${duration}시간)`}</div>
          </div>
          <div className="info-row">
            <div className="info-row__label">인원수</div>
            <div className="info-row__content">{headcount}</div>
          </div>
        </RemoteControlInfoBox>
        <Divider
          type="horizontal"
          style={{
            backgroundColor: `${({ theme }) => theme.colors.gray500}`,
          }}
        />
        <div className="info-row">
          <div className="info-row__label">추가 내역</div>
          <div className="info-row__content">
            {selectedConveniences.length ? (
              selectedConveniences.map(
                ({ convenienceName, conveniencePrice }) => {
                  return (
                    <div className="info-row__content--row">
                      <span>{convenienceName}</span>
                      <span>{formatNumberWithCommas(conveniencePrice)}</span>
                    </div>
                  );
                }
              )
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
        <Divider
          type="horizontal"
          style={{
            backgroundColor: `${theme.colors.black}`,
          }}
        />
        <TotalPrice>
          <span>총 결제금액</span>
          <span className="totalPrice">
            {formatNumberWithCommas(totalPrice)}원
          </span>
        </TotalPrice>
      </div>
      <div className="button">
        <DarkButton
          text="결제하기"
          width={30}
          height={5}
          style={{ alignItems: "flex-end" }}
        />
      </div>
    </RemoteControlBox>
  );
};

export default RemoteControl;

const LABEL_WIDTH = "30%";
const RemoteControlBox = styled.div`
  width: 35rem;
  margin: 0 auto;
  min-height: 48rem;
  border-radius: 2.5rem;
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.main30}30;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.body2}
  .info-row {
    display: flex;
    gap: 1rem;
    &__label {
      width: ${LABEL_WIDTH};
    }
    &__content {
      width: calc(100% - ${LABEL_WIDTH});
      display: flex;
      flex-direction: column;
      &--row {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

const RemoteControlInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  margin-bottom: 2.5rem;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4.5rem;
  .totalPrice {
    ${({ theme }) => theme.fonts.heading1Bold}
  }
`;
