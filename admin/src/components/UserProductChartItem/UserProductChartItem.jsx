import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .square {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    background-color: red;
  }
`;
const UserProductChartItem = () => {
  return (
    <Wrapper>
      <div className="square"></div>
      <div className="text">
        <span>New</span>
        <br />
        <span>Customers</span>
      </div>
    </Wrapper>
  );
};
export default UserProductChartItem;
