import styled from "styled-components";
import ThumbnailImage from "components/common/ThumbnailImage";

const ReservationInfoSection = ({
  studycafePhoto,
  studycafeName,
  roomName,
  reservation: { date, startTime, endTime, usingTime },
}) => {
  const startTimeString = startTime.slice(0, startTime.lastIndexOf(":"));
  const endTimeString = endTime.slice(0, endTime.lastIndexOf(":"));
  return (
    <Section>
      <ThumbnailImage imageSrc={studycafePhoto} width={40} height={24} />
      <div className="text-info">
        <span className="title">{studycafeName}</span>
        <span>{roomName}</span>
        <span>{`${date} ${startTimeString} ~ ${endTimeString} (${usingTime}시간)`}</span>
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
