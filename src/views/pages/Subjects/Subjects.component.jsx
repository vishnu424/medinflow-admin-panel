import React, { useState, useEffect } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Input,
  Row,
  Col,
  Button,
  InputNumber,
  message,
  Divider,
  Upload,
  Radio,
  Modal,
  Select,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import { compareByAlph } from "../../../utils/utils";
import { subjectsActions } from "../../../application/Actions/Subjects";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

const Subjects = ({ token, subjectData, subjectDataLoading, role }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(" ");
  const [datasource, setDatasource] = useState(subjectData);
  const [file, setFile] = useState(" ");

  //Data
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [sort, setSort] = useState(0);
  const [active, setActive] = useState(true);

  // edit data
  const [editsubjectId, setEditSubjectId] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editName, setEditName] = useState("");
  const [editSort, setEditSort] = useState();
  const [editActive, setEditActive] = useState(true);
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editVisibility, setEditVisibility] = useState(false);

  // Get Initial Data
  const initialData = async () => {
    const newData = await dispatch(subjectsActions.getAllSubjects());
    await setDatasource(newData.list);
    setSearchTerm("");
  };

  useEffect(() => {
    initialData();
  }, []);

  const props = {
    action: "https://api.medinflow.com/api/v1/file/upload",
    headers: {
      "x-user-token": token,
    },
    name: "file",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setFile(file.response.data.file_identifier);
      }
    },
  };

  const props2 = {
    action: "https://api.medinflow.com/api/v1/file/upload",
    headers: {
      "x-user-token": token,
    },
    name: "file",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setEditThumbnail(file.response.data.file_identifier);
      }
    },
  };

  useEffect(() => {
    const newData = subjectData.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDatasource(newData);
  }, [searchTerm]);

  const clearForm = () => {
    setName("");
    setSort("");
    setActive("");
    setFile("");
    setEditThumbnail("");
  };

  const addSubject = async () => {
    const resp = await dispatch(
      subjectsActions.addSubject({
        name,
        sort_order: sort,
        is_active: active,
        thumbnail_file_identifier: file,
      })
    );
    // console.log(resp);
    if (resp && resp.data.status == "success") {
      message.success("Subject Added Successfully");
      clearForm();
      initialData();
    } else {
      message.error("Error while adding subject");
    }
  };

  // Edit Actions
  const onCancel = () => {
    setEditVisibility(false);
  };

  const onEdit = async (subjectId) => {
    setEditSubjectId(subjectId);
    setEditVisibility(true);
    // Get current topicc
    const resp = await dispatch(subjectsActions.getSubjectId(subjectId));
    // console.log(resp);
    if (resp) {
      setEditSubject(resp.name);
      setEditSort(resp.sort_order);
      if (resp.is_active == 0) {
        setEditActive(false);
      } else {
        setEditActive(true);
      }
      setEditThumbnail(resp.thumbnail_file_identifier);
    } else {
      message.error("subject not found");
    }
  };

  const editOk = async () => {
    const resp = await dispatch(
      subjectsActions.updateSubject(editsubjectId, {
        name: editSubject,
        sort_order: editSort,
        is_active: editActive,
        thumbnail_file_identifier: editThumbnail,
      })
    );
    if (resp) {
      message.success("Subject Updated Successfully");
      setEditVisibility(false);
      initialData();
    } else {
      message.error("Unable to update Subjects");
    }
  };

  const deleteSubject = async (subId) => {
    await dispatch(subjectsActions.deleteSubject(subId));
    message.success("Subject deleted successfully");
    initialData();
  };

  // Delete Action
  const showDeleteConfirm = (subId) => {
    confirm({
      title: "Are you sure want to delete this Subject?",
      content: `${subId}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteSubject(subId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // Column Data
  const columns = [
    {
      title: "Sort",
      dataIndex: "sort_order",
      sorter: (a, b) => compareByAlph(a.sort_order, b.sort_order),
      sortDirections: ["descend", "ascend"],
      key: "id",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail_url",
      key: "thumbnail_url",
      render: (data) => <img src={data} width="100px" alt="thumbnail" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
          <a onClick={() => onEdit(text.subject_identifier)}>Edit</a>
          <Divider type="vertical" />
          {role === "admin" ? (
            <a
              onClick={() => showDeleteConfirm(text.subject_identifier)}
              style={{ color: "orange" }}
            >
              Delete
            </a>
          ) : null}
        </span>
      ),
    },
    // {
    //   title: 'No.Of Topics',
    //   dataIndex: 'topic_count',
    //   sorter: (a, b) => compareByAlph(a.topicCount, b.topicCount),
    //   sortDirections: ['descend', 'ascend'],
    //   key: 'topicCount'
    // },
    // {
    //   title: 'No.Of Subtopics',
    //   dataIndex: 'sub_topics_count',
    //   sorter: (a, b) => compareByAlph(a.lessonCount, b.lessonCount),
    //   sortDirections: ['descend', 'ascend'],
    //   key: 'numberOfLessons'
    // },
    // {
    //   title: 'No.Of Flowcharts',
    //   dataIndex: 'keys_count',
    //   sorter: (a, b) => compareByAlph(a.keysCount, b.keysCount),
    //   sortDirections: ['descend', 'ascend'],
    //   key: 'keyCount'
    // }
  ];

  // View Part
  return (
    <div>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Subjects</Breadcrumb.Item>
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
              <Col span={9}>
                <span style={{ fontWeight: "bold  " }}>Subject Name</span>
              </Col>
              <Col span={3}>
                <span style={{ fontWeight: "bold  " }}>Sort Order</span>
              </Col>
              <Col span={3}>
                <span style={{ fontWeight: "bold  " }}>Thumbnail</span>
              </Col>
              <Col span={4}>
                <span style={{ fontWeight: "bold  " }}>Active</span>
              </Col>
              <Col span={5} />
            </Row>
            <div style={{ height: 10 }} />
            <Row style={{ textAlign: "center" }}>
              <Col span={9}>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col span={3}>
                <InputNumber
                  min={1}
                  value={sort}
                  onChange={(e) => setSort(e)}
                  defaultValue={1}
                />
              </Col>

              <Col span={3} style={{ textAlign: "center" }}>
                <Upload {...props}>
                  <Button>
                    <UploadOutlined /> Upload
                  </Button>
                </Upload>
              </Col>
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
                <Button
                  type="primary"
                  onClick={addSubject}
                  style={{ width: "100%" }}
                >
                  Add Subject
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
          <div style={{ height: "20px" }} />{" "}
          <Table
            pagination={{ showQuickJumper: true }}
            dataSource={datasource}
            columns={columns}
            rowKey={(record) => record.subject_identifier}
            loading={subjectDataLoading}
          />
        </div>
      </Content>
      <Modal
        width="30%"
        visible={editVisibility}
        title="Update Subject"
        okText="Update"
        onCancel={onCancel}
        onOk={editOk}
      >
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Subject : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}> Order : </Col>
          <Col span={12}>
            <InputNumber
              min={1}
              defaultValue={1}
              value={editSort}
              onChange={(e) => {
                setEditSort(e);
              }}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Thumbnail : </Col>
          <Col span={12}>
            <Upload {...props2}>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
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
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    subjectData: state.subject.data,
    subjectDataLoading: state.subject.isDataLoading,
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(Subjects);
