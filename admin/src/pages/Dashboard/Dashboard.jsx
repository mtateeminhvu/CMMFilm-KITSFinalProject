import { Button, Col, Row, Table, message } from "antd";
import CardTransfer from "components/CardTransfer";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EyeOutlined } from "@ant-design/icons";
import TopRate from "components/TopRate";
import UserProduct from "components/UserProduct";
import BarChartComponent from "components/BarChart/BarChart";
import DropDown from "components/Dropdown/Dropdown";
import PieChartComponent from "components/PieChart/PieChart";
import CardCategory from "components/CardCategory";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGenre,
  listGenre,
  updateGenre,
} from "Redux/Actions/GenreActions";
const primaryButtonStyle = { backgroundColor: "#1890ff" };
const dangerButtonStyle = { backgroundColor: "#ff4d4f" };
const customButtonStyle = { backgroundColor: "#fadb14", color: "#000000" };
const DashboardWrapper = styled.div`
  .top-category {
    h1 {
      padding-left: 20px;
      font-size: 20px;
    }
    .top-category-top {
      display: flex;
      justify-content: space-between;
    }
    .top-category-bot {
      display: flex;
      .left {
        flex: 60%;
        padding-left: 20px;
      }
      .right {
        flex: 40%;
      }
    }
  }
  .category {
    h1 {
      padding-left: 20px;
      font-size: 20px;
    }
    height: 400px;
    .recharts-responsive-container {
      margin: none !important;
    }
  }
  .part-one {
    min-height: 500px;
    background-color: var(--body-content-light-background) !important;
    /* margin-right: -12px; */
  }
  .part-two {
    min-height: 400px;
    background-color: var(--body-content-light-background) !important;
    /* margin-right: -12px; */
    .ant-space {
      background-color: var(--body-dark-background);
      padding: 0 20px;
      margin-right: 12px;
      margin-top: 6px;
    }
  }
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 20px;
  margin: 0;
  color: white;
  /* background-color: red; */
  .custom-table .ant-table-wrapper {
    background-color: var(--body-content-light-background);
  }

  .custom-table .ant-table-thead > tr > th {
    background-color: var(--body-content-light-background);
    color: white;
  }

  .custom-table .ant-table-tbody > tr > td {
    background-color: var(--body-content-light-background);
    color: white;
    border-color: darkgray;
  }

  /* .custom-table .ant-table-tbody > tr {
    background-color: black;
    color: white;
  } */

  .custom-table .ant-table-tbody > tr:hover {
    background-color: darkslategray;
  }

  .custom-table .ant-table-tbody > tr:hover td {
    color: red;
    background-color: darkslategray;
  }
  .recent-film {
    display: flex;
    justify-content: space-between !important;
    width: 100%;
    align-items: center;
    .search-input {
      margin-left: auto;
    }
  }
  .btn-users {
    width: 70px;
    height: 40px;
    margin-right: 10px;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
`;

const GridItem = styled.div`
  /* background-color: #f0f0f0; */
  padding: 8px;
`;

// const data = [1, 2, 3, 4, 5, 6];
const style = {
  background: "var(--body-content-light-background)",
  padding: "8px 0",
};
const rowStyles = {
  marginBottom: "24px", // Add desired margin bottom value
  marginLeft: "12px",
  marginTop: "24px",
};
const marginBottom = {
  marginBottom: "24px",
};
const dataChart = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 150 },
  { name: "Group D", value: 350 },
];
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#84b51b",
  "#06aec1",
];
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "100",
  },
  {
    title: "Genre",
    width: 200,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Rating",
    width: 100,
    dataIndex: "countMovies",
    key: "countMovies",
    fixed: "left",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Description",
    dataIndex: "desc",
    key: "1",
  },
  {
    title: "Hot genre",
    dataIndex: "status",
    key: "id",
    render: (status) => <div>Hot Show In Month</div>,
  },

  // {
  //   title: "Action",
  //   key: "operation",
  //   fixed: "right",
  //   width: 200,
  //   render: (_, user) => (
  //     <div>
  //       <Button
  //         className=" btn-delete btn-users"
  //         type="primary"
  //         danger
  //         id={user.id}
  //         onClick={() => {
  //           // handleDeleteUser(user.id);
  //           // console.log(user.key)
  //         }}
  //       >
  //         Xóa
  //       </Button>
  //       <Button
  //         className="btn-users"
  //         // onClick={() => handleUpdateUser(user.id)}
  //         style={customButtonStyle}
  //       >
  //         Sửa
  //       </Button>
  //     </div>
  //   ),
  // },
];
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const items = [
  {
    label: "Today",
    key: "1",
  },
  {
    label: "Last week",
    key: "2",
  },
  {
    label: "Last month",
    key: "3",
  },
];
const dataTable = [
  {
    key: "1",
    name: "John Brown",
    rate: 3.1,
    category: "New York Park",
  },
  {
    key: "2",
    name: "John Brown 2",
    rate: 3.2,
    category: "New York Park",
  },
];
const getRandomColor = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};
const Dashboard = () => {
  const dispatch = useDispatch();
  const genreList = useSelector((state) => state.genreList);
  const { loading, error, genres } = genreList;

  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(listGenre())
      .then((response) => {
        setData(response.data);
        // console.log(response);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }, [dispatch]);
  useEffect(() => {
    if (genres && genres.data) {
      setData(genres.data);

      // console.log(genres.data);
    }
  }, [genres]);
  const onSearch = (value) => console.log(value);
  return (
    <DashboardWrapper>
      <Row gutter={48} style={marginBottom}>
        <Col className="gutter-row part-one" span={16}>
          <Row gutter={24} style={rowStyles}>
            <Col className="gutter-row" span={6}>
              <CardTransfer
                speed={80}
                transfer={55}
                unit={"K"}
                title={"Viewer"}
                colorCircle={"#e7141b"}
                iconCard={<EyeOutlined />}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <CardTransfer
                speed={80}
                transfer={15}
                unit={"K"}
                title={"Payment"}
                colorCircle={"#14E788"}
                iconCard={<EyeOutlined />}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <CardTransfer
                speed={80}
                transfer={15}
                unit={"K"}
                title={"Subcribed"}
                colorCircle={"#e78514"}
                iconCard={<EyeOutlined />}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <CardTransfer
                speed={-8}
                transfer={15}
                unit={"K"}
                title={"Rating"}
                colorCircle={"#1b14e7"}
                iconCard={<EyeOutlined />}
              />
            </Col>
          </Row>
          <Row gutter={0}>
            <Col className="gutter-row" span={24}>
              <div style={style}>
                <TopRate />
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row " span={8}>
          <div className="part-one" style={style}>
            <UserProduct />
          </div>
        </Col>
      </Row>
      <Row gutter={24} style={marginBottom}>
        <Col className="gutter-row " span={8}>
          <div className="part-two">
            <div className="category" style={style}>
              <h1>Architect View With Gender</h1>
              <BarChartComponent />
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className="part-two">
            <div className="top-category" style={style}>
              <div className="top-category-top">
                <h1>Genres</h1>
                {/* <DropDown
                  items={items}
                  // onClick={onClick}
                  defaultValue={"Today"}
                  onChange={(value) => {
                    console.log(value); // In giá trị mới của DropDown khi thay đổi
                  }}
                /> */}
              </div>
              <div className="top-category-bot">
                <div className="left">
                  <GridContainer>
                    {console.log(data)}
                    {data.map((item, index) => (
                      <GridItem key={item.id}>
                        <CardCategory
                          color={getRandomColor()}
                          genre={item.name}
                          countMovie={item.countMovies}
                        />
                      </GridItem>
                    ))}
                  </GridContainer>
                </div>
                <div className="right">
                  <PieChartComponent data={dataChart} colors={COLORS} />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="recent-film">
          <h1>Recently Viewed Film</h1>
          {/* <Search
            // className="search-input "
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          /> */}
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
          className="custom-table"
        />
      </Row>
    </DashboardWrapper>
  );
};

export default Dashboard;
