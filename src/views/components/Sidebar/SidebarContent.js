import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Icon from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarContent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      theme="light"
    >
      <div style={{ padding: "10px" }}>
        <img
          style={{ width: "100%", margin: "auto" }}
          src={require("./logo.png")}
          alt="Crownedge Logo"
        />
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
          <NavLink to="/lessons">
            <Icon type="book" />
            <span>Lessons</span>
          </NavLink>
        </Menu.Item>
        <SubMenu
          key="wisdom"
          title={
            <span>
              <Icon type="key" />
              <span>Wisdom</span>
            </span>
          }
        >
          <Menu.Item key="4">
            <NavLink to="/wisdom">
              <span>Add</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/edit-wisdom">
              <span>Edit / Delete</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="mcqs"
          title={
            <span>
              <Icon type="question" />
              <span>Mcqs</span>
            </span>
          }
        >
          <Menu.Item key="6">
            <NavLink to="/mcqs">
              <span>Add</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7">
            <NavLink to="/edit-mcqs">
              <span>Edit / Delete</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="practicemcqs"
          title={
            <span>
              <Icon type="question" />
              <span>Practice Tests</span>
            </span>
          }
        >
          <Menu.Item key="8">
            <NavLink to="/practice-tests">
              <span>Practice Tests</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9">
            <NavLink to="/practice-mcqs">
              <span>Add Mcqs</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="10">
            <NavLink to="/edit-practice-mcqs">
              <span>Edit/Delete Mcqs</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="mockmcqs"
          title={
            <span>
              <Icon type="question" />
              <span>Mock Tests </span>
            </span>
          }
        >
          <Menu.Item key="11">
            <NavLink to="/mock-tests">
              <span>Mock Tests</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="12">
            <NavLink to="/mock-mcqs">
              <span>Add Mcqs</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="13">
            <NavLink to="/edit-mock-mcqs">
              <span>Edit/Delete Mcqs</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="14">
          <NavLink to="/references">
            <Icon type="folder" />
            <span>References</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="15">
          <NavLink to="/feedbacks">
            <Icon type="exclamation" />
            <span>Feedbacks</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="16">
          <NavLink to="/carousel">
            <Icon type="star" />
            <span>Carousel</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="17">
          <NavLink to="/today">
            <Icon type="schedule" />
            <span>Today's MCQ</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="18">
          <NavLink to="/faqs">
            <Icon type="question" />
            <span>FAQs</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="19">
          <NavLink to="/hashtags">
            <Icon type="hashtag" />
            <span>Hashtags</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SidebarContent;
