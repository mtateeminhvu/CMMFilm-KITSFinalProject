import React from "react";
import styled from "styled-components";
import ImageRateItem from "../../assets/images/image-rate-item.jpg";
const TopRateItemWrapper = styled.div`
  background-color: var(--body-light-background);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* Thêm box-shadow cho nền đen */
  margin-right: 20px;
  height: 240px;
  h3 {
    margin-top: 20px;
    height: 60px;
  }
  .image {
    width: 100%;
    img {
      width: 100%;
      object-fit: contain;
    }
    .list-feature {
      background-color: var(--body-dark-background);
    }
  }
  .title,
  .genre {
    padding: 0 20px;
  }
  .touch {
    padding: 0 20px 20px 20px;
  }
`;
const TopRateItem = ({ actor, title, genre }) => {
  return (
    <TopRateItemWrapper>
      <div className="image">
        <img src={ImageRateItem} alt="" />
      </div>
      <div className="list-feature">
        <h3 className="title">{title}</h3>
        <p className="genre">{genre}$</p>
        <div className="touch">{"Hot Movie"}</div>
      </div>
    </TopRateItemWrapper>
  );
};
export default TopRateItem;
