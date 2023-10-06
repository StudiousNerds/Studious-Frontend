import { ReactComponent as MinusIcon } from "assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import styled from "styled-components";

const NumberController = ({ userCount, handleUserCount }) => {
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
