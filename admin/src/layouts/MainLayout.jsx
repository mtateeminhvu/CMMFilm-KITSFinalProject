import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Col } from "antd";
import React, { useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import HeaderComponent from "../components/Header";
import Footer from "../components/Footer/Footer";

import Sidenav from "../components/Sidenav";

import styled from "styled-components";
import Toast from "components/LoadingError/Toast";
const LayoutContainer = styled.div``;
const SiderWrapper = styled.div`
  .ant-layout-sider::-webkit-scrollbar {
    width: 8px; /* Độ rộng của thanh cuộn */
  }

  .ant-layout-sider::-webkit-scrollbar-thumb {
    background-color: #888; /* Màu của thanh cuộn */
    border-radius: 4px; /* Bo tròn các góc của thanh cuộn */
  }

  .ant-layout-sider::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Màu nền của thanh cuộn */
  }
  .sider-bar {
    background-color: var(--body-light-background);

    padding: 0;
  }
`;
const { Header, Content } = Layout;

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Rating", "2", <DesktopOutlined />),
    // getItem("Comment", "3", <DesktopOutlined />),
    getItem("User", "3", <UserOutlined />),
    getItem("Genre", "sub1", <CodeSandboxOutlined />, [
      getItem("Add Genre", "4"),
      getItem("List Genres", "5"),
    ]),
    getItem("Movie", "sub2", <VideoCameraOutlined />, [
      getItem("Add Movies", "6"),
      getItem("List Movies", "7"),
    ]),

    getItem("Package", "8", <FileOutlined />),
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <LayoutContainer>
      <Layout
        hasSider
        style={{
          backgroundColor: "var(--body-light-background)",
        }}
      >
        <SiderWrapper>
          <Sidenav
            collapsed={collapsed}
            items={items}
            onCollapse={handleCollapse}
          />
        </SiderWrapper>

        <Layout
          className="site-layout"
          style={{
            marginLeft: collapsed ? 80 : 300,
            // backgroundColor: "var(--body-light-background)",
            backgroundColor: "var(--body-dark-background)",
          }}
          // className="site-layout"
          // style={{
          //   marginLeft: collapsed ? 80 : 300,
          //   transition: "margin-left 0.2s",
          //   backgroundColor: "var(--body-light-background)",
          // }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              height: "100px",
              margin: "0",
            }}
          >
            <HeaderComponent />
          </Header>
          <Content
            style={{
              margin: "24px 24px ",
              overflow: "initial",
              minHeight: "1200px",
              // height: "auto",
            }}
          >
            <Outlet />
          </Content>

          <Footer />
        </Layout>
      </Layout>
      {/* <Toast /> */}
    </LayoutContainer>
  );
}

export default MainLayout;
