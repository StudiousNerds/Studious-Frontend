const useTimeController = ({ startTime, setStartTime, setEndTime }) => {
  const onSelectTimeBlock = (_e, timeBlock, index) => {
    if (timeBlock === null) return;
    if (startTime === undefined) {
      setStartTime(() => index);
      setEndTime(() => undefined);
    } else {
      setEndTime(() => index);
    }
  };

  return { onSelectTimeBlock };
};

export default useTimeController;
