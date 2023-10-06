import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import StudyCafeGridItem from "./StudyCafeGridItem";

const SwiperStudyCafeGridItems = ({ items, title }) => {
  return (
    <SwiperLayout>
      <SwiperTitle>{title}</SwiperTitle>
      <Swiper
        slidesPerView={3.5}
        spaceBetween={10}
        grabCursor={true}
        autoplay={{ delay: 3000 }}
        navigation={true}
        modules={[Navigation]}
      >
        {items?.map((item, itemIndex) => (
          <SwiperSlide key={itemIndex}>
            <StudyCafeGridItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperLayout>
  );
};

export default SwiperStudyCafeGridItems;

const SwiperLayout = styled.section`
  margin-bottom: 5rem;
`;

const SwiperTitle = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold}
  margin-bottom: 1.2rem;
`;
