import styled from "styled-components";
import ThumbnailImage from "components/common/ThumbnailImage";

const ReservationInfoSection = ({
  imageSrc,
  cafeName,
  roomName,
  reservationDateTime,
}) => {
  return (
    <Section>
      <ThumbnailImage imageSrc={imageSrc} width={40} height={24} />
      <div className="text-info">
        <span className="title">{cafeName}</span>
        <span>{roomName}</span>
        <span>{reservationDateTime}</span>
      </div>
    </Section>
  );
};

export default ReservationInfoSection;

const Section = styled.section`
  display: flex;
  gap: 20rem;
  div.text-info {
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    ${({ theme }) => theme.fonts.body1};
    .title {
      ${({ theme }) => theme.fonts.heading2Bold};
    }
  }
`;
