import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../utils/Config";
import {
  Layout,
  Breadcrumb,
  Table,
  Input,
  Row,
  Col,
  Button,
  Modal,
  message,
  Divider,
  Upload,
  Select,
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useDispatch, connect } from "react-redux";
import { doctorActions } from "../../../application/Actions/Doctor";
import { subjectsActions } from "../../../application/Actions/Subjects";
import { compareByAlph } from "../../../utils/utils";

const { Option } = Select;
const { confirm } = Modal;
const { Content } = Layout;
const { Search } = Input;

const Doctors = ({
  isLoading,
  token,
  doctorsData,
  subjectData,
  subjectDataLoading,
}) => {
  const dispatch = useDispatch();
  const [editVisibility, setEditVisibility] = useState(false);

  // Add form data
  const [doctorsName, setDoctorsName] = useState("");
  const [editDoctorsId, setEditDoctorsId] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [file, setFile] = useState(" ");
  const [active, setActive] = useState(true);
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  // edit form data
  const [editDoctorsName, setEditDoctorsName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDegree, setEditDegree] = useState("");
  const [editActive, setEditActive] = useState(" ");
  const [editLinkedin, setEditLinkedin] = useState("");
  const [editFacebook, setEditFacebook] = useState("");
  const [editInstagram, setEditInstagram] = useState("");

  const [datasource, setDatasource] = useState(doctorsData);
  const [searchTerm, setSearchTerm] = useState("");

  // Get Initial Data
  useEffect(() => {
    dispatch(subjectsActions.getAllSubjects());
    dispatch(doctorActions.getAllDoctors());
  }, []);

  const clearForm = () => {
    setDoctorsName("");
    setSubjectId("");
    setDegree("");
    setEmail("");
    setFile("");
    setLinkedin("");
    setFacebook("");
    setInstagram("");
  };

  useEffect(() => {
    setDatasource(doctorsData);
    // console.log(doctorsData);
  }, [doctorsData]);

  useEffect(() => {
    const newData = doctorsData.filter((Doctors) =>
      Doctors.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDatasource(newData);
  }, [searchTerm]);

  const subjectOptions = subjectData.map((data) => (
    <Option key={data.id} value={data.id}>
      {data.name}
    </Option>
  ));

  const addDoctorsHandle = () => {
    if (doctorsName === "") {
      return message.error("Enter Doctors Name");
    }
    const resp = dispatch(
      doctorActions.addDoctors({
        name: doctorsName,
        thumbnail_file_identifier: file,
        subjectId: subjectId,
        linkedin_url: linkedin,
        facebook_url: facebook,
        instagram_url: instagram,
        degree,
      })
    );
    // console.log(resp);
    if (resp) {
      clearForm();
      message.success("Doctors Added Successfully");
    } else {
      message.error("Error while adding");
    }
  };

  //Delete Action
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure want to delete this Doctor?",
      content: `${id}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(doctorActions.deleteDoctors(id));
        dispatch(doctorActions.getAllDoctors());
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // Edit Actions
  const onCancel = () => {
    setEditVisibility(false);
  };

  const onEdit = async (DoctorId) => {
    setEditDoctorsId(DoctorId);
    setEditVisibility(true);
    // Get current topicc
    const resp = await dispatch(doctorActions.getDoctorById(DoctorId));
    // console.log(resp);
    if (resp) {
      setEditDoctorsName(resp.name);
      setEditDegree(resp.degree);
      setEditEmail(resp.email);
      if (resp.is_active == 0) {
        setEditActive(false);
      } else {
        setEditActive(true);
      }
      setEditLinkedin(resp.linkedin_url);
      setEditFacebook(resp.facebook_url);
      setEditInstagram(resp.instagram_url);
    } else {
      message.error("Error while getting data");
    }

    // axios
    //   .get(`${URL}/Doctors/${DoctorsId}`, {
    //     headers: {
    //       Authorization: 'Bearer ' + token
    //     }
    //   })
    //   .then(resp => {
    //     setEditDoctorsName(resp.data.success.payload.name)
    //     setEditSubjectId(resp.data.success.payload.subjectId)
    //   })
  };

  const editOk = async () => {
    const resp = await dispatch(
      doctorActions.updateDoctors(editDoctorsId, {
        name: editDoctorsName,
        degree: editDegree,
        email: editEmail,
        linkedin_url: editLinkedin,
        facebook_url: editFacebook,
        instagram_url: editInstagram,
        is_active: editActive,
      })
    );
    if (resp) {
      message.success("Doctors Updated Successfully");
      setEditVisibility(false);
      dispatch(doctorActions.getAllDoctors());
    } else {
      message.error("failed while updating Doctors data");
    }

    // axios({
    //   method: 'put',
    //   url: `/Doctors/${editDoctorsId}`,
    //   headers: {
    //     Authorization: 'Bearer ' + token
    //   },
    //   data: {
    //     name: editDoctorsName,
    //     subjectId: editSubjectId
    //   }
    // })
    //   .then(res => {
    //     message.success('Doctors Updated Successfully')
    //     setEditVisibility(false)
    //     dispatch(doctorActions.getDoctors())
    //   })
    //   .catch(err => {
    //     message.error(err)
    //   })
  };

  // Column Data
  const columns = [
    {
      title: "Doctors Name",
      dataIndex: "name",
      sorter: (a, b) => compareByAlph(a.name, b.name),
      sortDirections: ["descend", "ascend"],
      key: "id",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      sorter: (a, b) => compareByAlph(a.degree, b.degree),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => compareByAlph(a.name, b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Active",
      dataIndex: "is_active",
      sorter: (a, b) => compareByAlph(a.is_active, b.is_active),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (text ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <span>
          <a onClick={() => onEdit(text.doctor_identifier)}>Edit</a>
          <Divider type="vertical" />
          <a
            onClick={() => showDeleteConfirm(text.doctor_identifier)}
            style={{ color: "orange" }}
          >
            Delete
          </a>
        </span>
      ),
    },
  ];

  // View Part
  return (
    <div>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Doctors</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            background: "#fff",
            margin: "auto",
          }}
        >
          <div style={{ margin: "center" }}>
            <Row style={{ textAlign: "center" }}>
              <Col span={8}>
                <span style={{ fontWeight: "bold  " }}>Doctor Name</span>
              </Col>
              <Col span={8}>
                <span style={{ fontWeight: "bold  " }}>Degree</span>
              </Col>
              <Col span={8}>
                <span style={{ fontWeight: "bold  " }}>Email</span>
              </Col>
            </Row>
            <div style={{ height: 10 }} />
            <Row style={{ textAlign: "center" }}>
              <Col span={8}>
                <Input
                  style={{ width: "95%" }}
                  type="text"
                  value={doctorsName}
                  onChange={(e) => setDoctorsName(e.target.value)}
                />
              </Col>
              <Col span={8}>
                <Input
                  style={{ width: "95%" }}
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </Col>
              <Col span={8}>
                <Input
                  style={{ width: "95%" }}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
            <div style={{ height: 10 }} />
            <Row style={{ textAlign: "center" }}>
              <Col span={4}>
                <span style={{ fontWeight: "bold  " }}>Active</span>
              </Col>
              <Col span={5}>
                <span style={{ fontWeight: "bold  " }}>
                  Linkedin Profile URL
                </span>
              </Col>
              <Col span={5}>
                <span style={{ fontWeight: "bold  " }}>
                  Facebook Profile URL
                </span>
              </Col>
              <Col span={5}>
                <span style={{ fontWeight: "bold  " }}>
                  Instagram Profile URL
                </span>
              </Col>
              <Col span={5} />
            </Row>
            <div style={{ height: 10 }} />
            <Row style={{ textAlign: "center" }}>
              <Col span={4}>
                <Radio.Group
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                >
                  <Radio.Button value={true}>Active</Radio.Button>
                  <Radio.Button value={false}>Inactive</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={5}>
                <Input
                  style={{ width: "95%" }}
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </Col>
              <Col span={5}>
                <Input
                  style={{ width: "95%" }}
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </Col>
              <Col span={5}>
                <Input
                  style={{ width: "95%" }}
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </Col>
              <Col span={5}>
                <Button
                  type="primary"
                  onClick={() => addDoctorsHandle()}
                  style={{ width: "100%" }}
                >
                  Add Doctor
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
      <div style={{ height: "20px" }} />
      <Content style={{ margin: "0 16px" }}>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <Search
            placeholder="Input Search Text"
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Table
            pagination={{ showQuickJumper: true }}
            dataSource={datasource}
            columns={columns}
            rowKey={(record) => record.doctor_identifier}
            // loading={isLoading}
          />
        </div>
      </Content>
      <Modal
        width="30%"
        visible={editVisibility}
        title="Update Doctors"
        okText="Update"
        onCancel={onCancel}
        onOk={editOk}
      >
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Doctors Name : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editDoctorsName}
              onChange={(e) => setEditDoctorsName(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Degree : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editDegree}
              onChange={(e) => setEditDegree(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Email : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}> Active : </Col>
          <Col span={4}>
            <Radio.Group
              value={editActive}
              onChange={(e) => setEditActive(e.target.value)}
            >
              <Radio.Button value={true}>Active</Radio.Button>
              <Radio.Button value={false}>Inactive</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>LinkedIn URL : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editLinkedin}
              onChange={(e) => setEditLinkedin(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Facebook URL : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editFacebook}
              onChange={(e) => setEditFacebook(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Instagram URL : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editInstagram}
              onChange={(e) => setEditInstagram(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.doctor.isDoctorsLoading,
    doctorsData: state.doctor.doctors_data,
    subjectData: state.subject.data,
    subjectDataLoading: state.subject.isDataLoading,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Doctors);
