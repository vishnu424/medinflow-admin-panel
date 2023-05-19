import React, { useState, useEffect } from "react";
import axios from "axios";

import Avatar from "antd/es/avatar";
import Layout from "antd/es/layout";
import Modal from "antd/es/modal";
import message from "antd/es/message";
import Table from "antd/es/table";
import Spin from "antd/es/spin";
import Input from "antd/es/input";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import Button from "antd/es/button";

import { useDispatch, connect } from "react-redux";
import { compareByAlph } from "../../../utils/utils";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { URL } from "../../../utils/Config";
import { usersActions } from "../../../application/Actions/Users";

const { Search } = Input;
const { Content } = Layout;
const { Title } = Typography;

const Users = ({ isLoading, userData, token, userCount }) => {
  const dispatch = useDispatch();
  const [datasource, setDatasource] = useState(userData);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibility, setVisibilty] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true);

  const initialData = async () => {
    const newData = await dispatch(await usersActions.getAllUsers());
    await setDatasource(newData);
    setSearchTerm("");
  };

  useEffect(() => {
    const newData = userData.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDatasource(newData);
  }, [searchTerm]);

  // Get Initial Data
  useEffect(() => {
    initialData();
  }, []);

  // View  Functionality

  const onViewCancel = () => {
    setVisibilty(false);
  };

  const OnView = async (userId) => {
    setVisibilty(true);
    try {
      const resp = await dispatch(usersActions.getUserById(userId));
      if (resp) {
        await setSelectedUser(resp);
        setIsUserLoading(false);
      } else {
        message.error("Failed to view user");
      }
      // axios
      //   .get(`${URL}/users/${userId}`, {
      //     headers: {
      //       Authorization: 'Bearer ' + token
      //     }
      //   })
      //   .then(async resp => {
      //     await setSelectedUser(resp.data.success.payload)
      //     setIsUserLoading(false)
      //   })
    } catch (err) {
      message.error("Failed to view user");
      console.log(err);
    }
  };

  const toggleUserBlockedStatus = async (userId, blockedStatus) => {
    setIsUserLoading(true);
    try {
      const resp = await dispatch(
        usersActions.updateUserProfile(userId, {
          blocked: !blockedStatus,
        })
      );
      if (resp) {
        await setSelectedUser(resp);
        setIsUserLoading(false);
      } else {
        message.error("Failed to update user");
      }
      // axios
      //   .post(
      //     `${URL}/user/update-profile`,
      //     {
      //       blocked: !blockedStatus
      //     },
      //     {
      //       headers: {
      //         Authorization: 'Bearer ' + token,
      //         user_id: userId
      //       }
      //     }
      //   )
      //   .then(async resp => {
      //     await setSelectedUser(resp.data.success.payload[0])
      //     setIsUserLoading(false)
      //   })
    } catch (err) {
      message.error("Failed to view user");
      console.log(err);
    }
  };

  const convertDate = (date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      date.getDate() +
      " " +
      monthNames[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  };
  // Column Data
  const columns = [
    {
      title: "Registered At",
      dataIndex: "createdAt",
      sorter: (a, b) => compareByAlph(a.createdAt, b.createdAt),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "ascend",
      render: (text, record) => convertDate(new Date(text)),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a, b) => compareByAlph(a.firstName, b.firstName),
      sortDirections: ["descend", "ascend"],
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a, b) => compareByAlph(a.lastName, b.lastName),
      sortDirections: ["descend", "ascend"],
      key: "lastName",
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => compareByAlph(a.email, b.email),
      sortDirections: ["descend", "ascend"],
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => compareByAlph(a.phoneNumber, b.phoneNumber),
      sortDirections: ["descend", "ascend"],
      key: "phoneNumber",
    },
    {
      title: "User Role",
      dataIndex: "role",
      sorter: (a, b) => compareByAlph(a.role, b.role),
      sortDirections: ["descend", "ascend"],
      key: "role",
    },
    {
      title: "Blocked",
      dataIndex: "blocked",
      sorter: (a, b) => compareByAlph(a.blocked, b.blocked),
      sortDirections: ["descend", "ascend"],
      key: "blocked",
      render: (text, record) => <span> {text ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      render: (text, record) => (
        <span>
          <a onClick={() => OnView(text.id)}>View User</a>
        </span>
      ),
    },
  ];

  // View Part
  return (
    <div>
      <div style={{ height: "20px" }} />
      <Content style={{ margin: "0 16px" }}>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <Row style={{ textAlign: "center" }}>
            <Col span={8} push={8}>
              <Title level={2}>User Count </Title>
              <Title level={3} style={{ fontWeight: "800", color: "green" }}>
                {userCount}
              </Title>
            </Col>
          </Row>
          <Search
            placeholder="Search by email"
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div style={{ height: "20px" }} />
          <Table
            pagination={{ showQuickJumper: true }}
            dataSource={datasource}
            columns={columns}
            rowKey={(record) => record.id}
            loading={isLoading}
          />
        </div>
      </Content>
      <Modal
        width="25%"
        visible={visibility}
        title="View User"
        onCancel={onViewCancel}
        footer={null}
        centered
      >
        {isUserLoading ? (
          <Spin />
        ) : (
          <div>
            <Row style={{ padding: "10px" }}>
              <Col span={24} style={{ textAlign: "center" }}>
                <Avatar
                  src={selectedUser.profilePic}
                  style={{ height: "100px", width: "100px" }}
                />
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              <Col span={12}>
                {" "}
                <strong>First Name : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.firstName}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              <Col span={12}>
                {" "}
                <strong>Last Name : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.lastName}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>Email : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.email}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>Phone Number : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.phoneNumber}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>Class : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.className}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>State : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.stateName}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>City : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.city}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>User Role : </strong>
              </Col>
              <Col span={12}>
                <p>{selectedUser.role}</p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>Phone Number Verified : </strong>
              </Col>
              <Col span={12}>
                <p>
                  {selectedUser.phoneVerified ? (
                    <CheckCircleTwoTone twoToneColor="green" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="red" />
                  )}
                </p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              {" "}
              <Col span={12}>
                {" "}
                <strong>Email Verified : </strong>
              </Col>
              <Col span={12}>
                <p>
                  {selectedUser.emailVerified ? (
                    <CheckCircleTwoTone twoToneColor="green" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="red" />
                  )}
                </p>
              </Col>
            </Row>
            <Row style={{ padding: "5px" }}>
              <Col span={24}>
                <p>
                  {selectedUser.blocked ? (
                    <Button
                      onClick={() =>
                        toggleUserBlockedStatus(
                          selectedUser.id,
                          selectedUser.blocked
                        )
                      }
                      style={{ width: "100%" }}
                    >
                      Unblock User
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        toggleUserBlockedStatus(
                          selectedUser.id,
                          selectedUser.blocked
                        )
                      }
                      style={{ width: "100%" }}
                      type="danger"
                    >
                      Block User
                    </Button>
                  )}
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.isUserDataLoading,
    userData: state.user.user_data,
    token: state.auth.token,
    userCount: state.user.userCount,
  };
};

export default connect(mapStateToProps)(Users);
