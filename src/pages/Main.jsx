import SwiperStudyCafeGridItems from "components/SwiperStudyCafeGridItems";
import { useMainStudyCafeItemsQuery } from "hooks/queries/useMainStudyCafeItems";

const Main = () => {
  const { data } = useMainStudyCafeItemsQuery();
  return (
    <>
      <SwiperStudyCafeGridItems
        items={data?.recommend}
        title={"오늘의 추천 스터디카페"}
      />
      <SwiperStudyCafeGridItems
        items={data?.event}
        title={"이벤트 중인 스터디카페"}
      />
    </>
  );
};

export default Main;
