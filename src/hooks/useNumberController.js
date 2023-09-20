import { useState } from "react";

export const useNumberController = (minCount, maxCount) => {
  const [userCount, setUserCount] = useState(minCount);
  const handleUserCount = (direction) => {
    if (direction === "minus" && userCount > minCount) {
      setUserCount((userCount) => userCount - 1);
    } else if (direction === "plus" && userCount < maxCount) {
      setUserCount((userCount) => userCount + 1);
    }
  };
  return { userCount, handleUserCount };
};
