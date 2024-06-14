import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";
const SideNavWrapper = styled.div`
  /* display: none; */
  .ant-layout-sider-trigger {
    display: none;
  }
  .ant-menu {
    border-inline-end: none !important;
    background-color: var(--body-light-background);
    background-color: var(--body-light-background);

    /* background-color: blue; */
    .ant-menu-submenu-title {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 16px;
      color: var(--text-color) !important;
      svg {
        width: 16px;
        height: 16px;
      }
    }
    .ant-menu-item {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 16px;
      svg {
        fill: var(--text-color) !important;
      }
      .ant-menu-title-content {
        color: var(--text-color) !important;
      }
      svg {
        width: 16px;
        height: 16px;
      }
      &.ant-menu-item-selected {
        a {
          color: var(--text-primary-color) !important;
        }
      }
    }
    /* .ant-menu-submenu-open
     {
      .ant-menu-submenu-title{
        color: var(--text-color) !important;
      }
      }
      & .ant-menu-item-icon {
        svg{
          fill: #ff6f61 ; 
        }
      }
    } */
    .ant-menu-item {
      &.ant-menu-item-selected {
        background-color: white !important;

        svg {
          fill: var(--text-primary-color) !important;
        }
      }
    }
  }
  /* .logo-sidebar {
    color: var(--text-primary-color) !important;
    font-size: 26px;
    font-weight: 600;
    font-family: "Times New Roman", Times, serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding-top: 30px;
    margin-bottom: 60px;
  } */
  .logo-sidebar {
    display: flex;
    align-items: center;
    height: 60px;
    padding-top: 30px;
    margin-bottom: 60px;
    justify-content: center;

    .logo {
      font-family: "Roboto", sans-serif;
      color: var(--text-primary-color) !important;
      font-size: 26px;
      font-weight: 600;
      font-family: "Times New Roman", Times, serif;
      margin-left: 20px;
    }

    .collapse-button {
      margin-left: auto;
      cursor: pointer;
      color: var(--text-primary-color) !important;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .collapse-button-expand {
      svg {
        width: 20px;
        height: 20px;
      }

      cursor: pointer;
      color: var(--text-primary-color) !important;
    }
  }
`;
const Sidenav = ({ collapsed, items, onCollapse }) => {
  const location = useLocation();
  // const [collapsed, setCollapsed] = useState(false);

  const renderMenuItems = (items, parentPath = "") => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        const itemPath = `${parentPath}/${item.label
          .toLowerCase()
          .replace(" ", "-")}`;
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const itemPath =
        parentPath === ""
          ? `/${item.label.toLowerCase().replace(" ", "-")}`
          : `${parentPath}/${item.label.toLowerCase().replace(" ", "-")}`;

      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link
            to={itemPath}
            className={location.pathname === itemPath ? "active" : ""}
          >
            {item.label}
          </Link>
        </Menu.Item>
      );
    });
  };

  return (
    <SideNavWrapper>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className="sider-bar"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          // display: "none",
        }}
        width={300}
        theme="light"
      >
        <div className="logo-sidebar">
          {collapsed ? (
            <div
              className="collapse-button-expand"
              onClick={() => onCollapse(!collapsed)}
            >
              <MenuOutlined />
              {/* {collapsed ? "Expand" : "Collapse"} */}
            </div>
          ) : (
            <>
              <div className="logo">MMoviews</div>
              <div
                className="collapse-button"
                onClick={() => onCollapse(!collapsed)}
              >
                <MenuOutlined />
                {/* {collapsed ? "Expand" : "Collapse"} */}
              </div>
            </>
          )}
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          {renderMenuItems(items)}
        </Menu>
      </Sider>
    </SideNavWrapper>
  );
};

export default Sidenav;
