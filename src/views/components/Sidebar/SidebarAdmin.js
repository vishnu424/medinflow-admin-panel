import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Icon from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      theme="light"
    >
      <div style={{ padding: "10px" }}>
        <h2 style={{ width: "100%", margin: "auto" }}>Flowchart system</h2>
        {/* <img
          style={{ width: '100%', margin: 'auto' }}
          src={require('./logo.png')}
          alt='Crownedge Logo'
        /> */}
      </div>
      <Menu theme="light" defaultSelectedKeys={["0"]} mode="inline">
        <Menu.Item key="0">
          <NavLink to="/">
            <Icon type="home" />
            <span>Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/subjects">
            <Icon type="hdd" />
            <span>Subjects</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/topics">
            <Icon type="read" />
            <span>Topics</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/sub-topics">
            <Icon type="book" />
            <span>Sub-topics</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/doctor">
            <Icon type="user" />
            <span>Doctors</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/add-flowchart">
            <Icon type="key" />
            <span>Flowcharts</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/edit-flowchart">
            <Icon type="key" />
            <span>Edit Flowcharts</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SidebarAdmin;
