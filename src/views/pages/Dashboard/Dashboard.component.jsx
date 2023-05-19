import React from "react";
import "./Dashboard.component.css";
import Layout from "antd/es/layout";
import Button from "antd/es/button";
import { Switch, Route } from "react-router-dom";
import { authActions } from "../../../application/Actions/Auth";
import { useDispatch, connect } from "react-redux";
import {
  Home,
  Subjects,
  Topics,
  Flowchart,
  Subtopics,
  Page404,
  EditFlowChart,
  Users,
  Doctors,
} from "./../";
import { SidebarAdmin, SidebarContent } from "../../components/Sidebar";
import axios from "axios";
import EditFlow from "../Flowchart/EditFlow";
const { Header, Footer } = Layout;

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_WITH_RESOURCE;
const Dashboard = ({ role }) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authActions.signOutAction());
  };
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        {role === "content" ? <SidebarContent /> : null}
        {role === "admin" ? <SidebarAdmin /> : null}
        <Layout>
          <Header
            style={{ background: "#fff", padding: 0, textAlign: "right" }}
          >
            <Button style={{ marginRight: "20px" }} onClick={signOut}>
              Logout
            </Button>
          </Header>
          <Switch>
            <Route exact path="/">
              <Flowchart />
            </Route>
            <Route exact path="/subjects">
              <Subjects />
            </Route>
            <Route exact path="/topics">
              <Topics />
            </Route>
            <Route exact path="/sub-topics">
              <Subtopics />
            </Route>
            <Route exact path="/add-flowchart">
              <Flowchart />
            </Route>
            <Route exact path="/edit-flowchart">
              <EditFlowChart />
            </Route>
            <Route exact path="/edit-flow/:flowchartId">
              <EditFlow />
            </Route>
            <Route exact path="/user">
              <Users />
            </Route>
            <Route exact path="/doctor">
              <Doctors />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
          <Footer style={{ textAlign: "center" }}>
            Basidia Learning Pvt Ltd © 2020
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(Dashboard);
