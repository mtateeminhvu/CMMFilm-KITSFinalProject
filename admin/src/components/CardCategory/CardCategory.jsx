import React from "react";
import FilmSvg from "components/SvgComponents/FilmSvg";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  .left-part {
    display: block;
    padding: 0;
    height: 64px;
    width: 8px !important;
    background-color: ${(props) => (props.color ? props.color : "red")};
    border-radius: 16px;
    position: relative;
    margin-right: 20px;
    &-percent {
      position: absolute;
      padding: 0;
      background-color: white;
      border-radius: 16px;
      bottom: 0;
      left: 0;
      height: 23px;
      width: 8px !important;
    }
  }
  .mid-part {
    height: 64px;
    width: 64px;
    border-radius: 20px;
    background-color: ${(props) => (props.color ? props.color : "red")};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    svg {
      height: 30px;
      width: 30px;
      fill: white;
    }
  }
  .right-part {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    padding: 0;
    p {
      margin: 0;
    }
  }
`;

const CardCategory = ({ countMovie, percent, genre, color }) => {
  return (
    <Wrapper color={color}>
      <div className="left-part">
        <div className="left-part-percent"></div>
      </div>
      <div className="mid-part">
        <FilmSvg />
      </div>
      <div className="right-part">
        <p>{genre}</p>
        <p>{countMovie}</p>
      </div>
    </Wrapper>
  );
};
export default CardCategory;
