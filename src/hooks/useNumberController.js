import { useState } from "react";

export const useNumberController = (
  minCount,
  maxCount,
  defaultCount = minCount
) => {
  const [userCount, setUserCount] = useState(defaultCount);
  const handleUserCount = (direction) => {
    if (direction === "minus" && userCount > minCount) {
      setUserCount((userCount) => userCount - 1);
    } else if (direction === "plus" && userCount < maxCount) {
      setUserCount((userCount) => userCount + 1);
    }
  };
  return { userCount, handleUserCount };
};
