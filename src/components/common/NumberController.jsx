import { ReactComponent as MinusIcon } from "assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import { useState } from "react";
import styled from "styled-components";

const NumberController = ({ minCount, maxCount }) => {
  const [userCount, setUserCount] = useState(minCount);
  const handleUserCount = (direction) => {
    if (direction === "minus" && userCount > minCount) {
      setUserCount((userCount) => userCount - 1);
    } else if (direction === "plus" && userCount < maxCount) {
      setUserCount((userCount) => userCount + 1);
    }
  };
  return (
    <NumberControllerLayout>
      <MinusIcon
        onClick={() => handleUserCount("minus")}
        style={{ cursor: "pointer" }}
      />
      {userCount}
      <PlusIcon
        onClick={() => handleUserCount("plus")}
        style={{ cursor: "pointer" }}
      />
    </NumberControllerLayout>
  );
};

export default NumberController;

const NumberControllerLayout = styled.div`
  display: flex;
  gap: 1.5rem;
`;
