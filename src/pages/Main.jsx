import SwiperStudyCafeGridItems from "components/SwiperStudyCafeGridItems";
import Loading from "components/common/Loading";
import { useMainStudyCafeItemsQuery } from "hooks/queries/useMainStudyCafeItems";

const Main = () => {
  const { data, isLoading } = useMainStudyCafeItemsQuery();
  if (isLoading) return <Loading />;
  return (
    <>
      <SwiperStudyCafeGridItems items={data} title={"오늘의 추천 스터디카페"} />
      {/* <SwiperStudyCafeGridItems items={data} title={"이벤트 중인 스터디카페"} /> */}
    </>
  );
};

export default Main;
