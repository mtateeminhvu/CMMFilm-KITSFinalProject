import { Card } from "antd";
import React from "react";
import styled from "styled-components";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
const CardCustom = styled.div`
  background-color: var(--body-light-background);
  color: var(--text-color);
  padding: 12px;
  .bottom-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    span {
      /* margin-right: 10px; */
    }
    .bottom-card-speed {
      span {
        margin: 0;
      }
      color: ${(props) => props.colorCircle};
      svg {
        fill: ${(props) => props.colorCircle};
      }
    }
  }
  .top-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    span {
      font-size: 16px;
    }
    .icon-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props) => props.colorCircle};
      border-radius: 50%;
      width: 40px;
      height: 40px;

      svg {
        fill: white;
        width: 20px;
        height: 30px;
      }
    }
  }
`;
const CardTransfer = ({
  title,
  transfer,
  iconCard,
  children,
  speed,
  colorCircle,
  unit,
}) => {
  return (
    <CardCustom title={title} colorCircle={colorCircle}>
      <div className="top-card">
        <span>{title}</span>
        <div className="icon-circle">{iconCard}</div>
      </div>
      <div className="bottom-card">
        <p>
          +{transfer}
          {unit}
        </p>
        <span>
          <span className="bottom-card-speed">
            {speed > 0 ? (
              <>
                <CaretUpOutlined />
                {Math.abs(speed).toFixed(1)}%
              </>
            ) : (
              <>
                <CaretDownOutlined />
                {Math.abs(speed).toFixed(1)}%
              </>
            )}
          </span>
        </span>
      </div>
    </CardCustom>
  );
};
export default CardTransfer;
