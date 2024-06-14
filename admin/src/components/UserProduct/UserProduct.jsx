import { Col, Row } from "antd";
import PieChartComponent from "components/PieChart/PieChart";
import UserProductChartItem from "components/UserProductChartItem";
import React from "react";
import styled from "styled-components";
const UserProductWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const rowStyles = {
  marginBottom: "24px", // Add desired margin bottom value
};
const dataChart = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const UserProduct = () => {
  return (
    <UserProductWrapper>
      <h1>User's Of Product</h1>
      <PieChartComponent data={dataChart} colors={COLORS} />
      <Row gutter={24} style={rowStyles}>
        <Col className="gutter-row" span={12}>
          <UserProductChartItem />
        </Col>
        <Col className="gutter-row" span={12}>
          <UserProductChartItem />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col className="gutter-row" span={12}>
          <UserProductChartItem />
        </Col>
        <Col className="gutter-row" span={12}>
          <UserProductChartItem />
        </Col>
      </Row>
    </UserProductWrapper>
  );
};
export default UserProduct;
