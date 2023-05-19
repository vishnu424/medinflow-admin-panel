import React, { useEffect, useState } from "react";
import "./Login.component.css";
import { Input, Button, Row, Col, Card, message } from "antd";
import Icon from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import Background from "./background.png";
import { useSelector, useDispatch } from "react-redux";
import { URL } from "./../../../utils/Config";

export const AUTHENTICATED = "AUTHENTICATED";
export const UNAUTHENTICATED = "UNAUTHENTICATED";
export const REMOVE_ERROR = "REMOVE_ERROR";
export const LOADING_LOGIN = "LOADING_LOGIN";
export const CRUD_ERRORS = "CRUD_ERRORS";

const Login = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const errorMessage = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      dispatch({ type: LOADING_LOGIN, payload: true });
      // const response = await window.fetch(`${URL}/admin/sign-in`, {
      const response = await window.fetch(
        `https://api.medinflow.com/api/v1/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login_identifier: email,
            password,
            grant_type: "PASSWORD",
          }),
        }
      );
      const result = await response.json();

      // console.log(result.data);
      if (result.status === "success") {
        dispatch({
          type: AUTHENTICATED,
          payload: {
            // token: result.data.refresh_token,
            token: result.data.access_token,
            user: result.data,
          },
        });
        window.localStorage.setItem("refresh_token", result.data.refresh_token);
        window.localStorage.setItem("access_token", result.data.access_token);
        window.localStorage.setItem("user", JSON.stringify(result.data));
        dispatch({ type: LOADING_LOGIN, payload: false });
        message.success("Welcome to Admin Panel");
      }
    } catch (err) {
      dispatch({ type: LOADING_LOGIN, payload: false });
      message.error("Check your Email/Password");
    }
  };

  useEffect(() => {
    if (authenticated) {
      navigate.push("/");
    }
  });
  useEffect(() => {
    if (errorMessage !== undefined) {
      message.error(errorMessage);
    } else if (errorMessage === "") {
      message.success("Login Successfully");
    }
  }, [errorMessage]);

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
      }}
    >
      <Card
        style={{
          width: 300,
          boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2)",
        }}
      >
        <Row>
          {/* <Col span={24} style={{ marginBottom: 25 }}>
            <img
              src={require("./Logo.png")}
              alt="Basidia-Logo"
              style={{ width: "100%" }}
            />
          </Col> */}
          <Col span={24}>
            <Input
              placeholder="Enter your username"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Col>
          <Col span={24} style={{ height: 15 }} />
          <Col span={24}>
            <Input
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              prefix={<Icon type="star" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Col>
          <Col span={24} style={{ height: 15 }} />
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => handleLogin()}
              loading={isLoading}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export default Login;
