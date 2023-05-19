import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Table,
  Input,
  Row,
  Col,
  Select,
  Button,
  InputNumber,
  message,
  Divider,
  Upload,
  Modal,
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useDispatch, connect } from "react-redux";
import { compareByAlph } from "../../../utils/utils";
import { subjectsActions } from "../../../application/Actions/Subjects";
import { topicsActions } from "../../../application/Actions/Topics";

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;
const { Content } = Layout;

const Topics = ({
  token,
  subjectData,
  subjectDataLoading,
  topicData,
  topicDataLoading,
  role,
}) => {
  const dispatch = useDispatch();
  const [editVisibility, setEditVisibility] = useState(false);

  // add form data
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [sort, setSort] = useState(1);
  const [active, setActive] = useState(true);

  // edit form data
  const [editTopicId, setEditTopicId] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editName, setEditName] = useState("");
  const [editSort, setEditSort] = useState();
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editActive, setEditActive] = useState(null);

  const [datasource, setDatasource] = useState(topicData);
  const [searchTerm, setSearchTerm] = useState(" ");

  // Get Initial Data
  const initialData = async () => {
    dispatch(subjectsActions.getAllSubjects());
    const newData = await dispatch(topicsActions.getAllTopics());
    await setDatasource(newData);
    setSearchTerm("");
  };

  useEffect(() => {
    initialData();
  }, []);
  const [file, setFile] = useState(" ");

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
    const newData = topicData.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDatasource(newData);
  }, [searchTerm]);

  const subjectOptions = subjectData.map((data) => (
    <Option key={data.subject_identifier} value={data.subject_identifier}>
      {data.name}
    </Option>
  ));

  const clearForm = () => {
    setSubject("");
    setName("");
    setSort(1);
    setActive(true);
    setFile("");
    setEditThumbnail("");
  };

  // Add Action
  const addTopic = async () => {
    const resp = await dispatch(
      topicsActions.addTopics({
        subject_identifier: subject,
        name: name,
        sort_order: sort,
        is_active: active,
        thumbnail_file_identifier: file,
      })
    );
    if (resp && resp.data.status == "success") {
      clearForm();
      message.success("Topic Added Successfully");
      initialData();
    } else {
      message.error("Error while adding Topic");
    }
  };

  // Edit Actions
  const onCancel = () => {
    setEditVisibility(false);
  };

  const onEdit = async (topicId) => {
    setEditTopicId(topicId);
    setEditVisibility(true);
    // Get current topicc
    const resp = await dispatch(topicsActions.getTopicById(topicId));
    // console.log(resp);
    if (resp) {
      setEditSubject(resp.subject_identifier);
      setEditName(resp.name);
      setEditSort(resp.sort_order);
      if (resp.is_active == 0) {
        setEditActive(false);
      } else {
        setEditActive(true);
      }
      setEditThumbnail(resp.thumbnail_file_identifier);
    } else {
      message.error("topic not found");
    }
  };

  const editOk = async () => {
    const resp = await dispatch(
      topicsActions.updateTopic(editTopicId, {
        subject_identifier: editSubject,
        name: editName,
        sort_order: editSort,
        thumbnail_file_identifier: editThumbnail,
        is_active: editActive,
      })
    );
    // console.log(resp);
    if (resp) {
      message.success("Topic Updated Successfully");
      setEditVisibility(false);
      initialData();
    } else {
      message.error("Unable to update topics");
    }
  };

  const deleteTopic = async (id) => {
    await dispatch(topicsActions.deleteTopics(id));
    message.success("Topic deleted successfully");
    initialData();
  };

  // Delete Action
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure want to delete this Topic?",
      content: `${id}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteTopic(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // Column Data
  const columns = [
    {
      title: "Sort Order",
      dataIndex: "sort_order",
      sorter: (a, b) => compareByAlph(a.sort_order, b.sort_order),
      sortDirections: ["descend", "ascend"],
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => compareByAlph(a.name, b.name),
      sortDirections: ["descend", "ascend"],
      key: "title",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail_url",
      key: "thumbnail_url",
      render: (data) => <img src={data} width="100px" alt="thumbnail" />,
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      sorter: (a, b) => compareByAlph(a.subjectName, b.subjectName),
      sortDirections: ["descend", "ascend"],
      filters: subjectData.map((t) => {
        return { text: t.name, value: t.name };
      }),
      onFilter: (value, record) => record.subjectName === value,
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
          <a onClick={() => onEdit(text.topic_identifier)}>Edit</a>
          <Divider type="vertical" />
          {role === "admin" ? (
            <a
              onClick={() => showDeleteConfirm(text.topic_identifier)}
              style={{ color: "orange" }}
            >
              Delete
            </a>
          ) : null}
        </span>
      ),
    },
  ];

  // View Part
  return (
    <div>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Topics</Breadcrumb.Item>
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
              <Col span={4}>
                <span style={{ fontWeight: "bold  ", width: "90%" }}>
                  Subject
                </span>
              </Col>
              <Col span={6}>
                <span style={{ fontWeight: "bold  " }}>Name</span>
              </Col>
              <Col span={2}>
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
              <Col span={4}>
                <Select
                  loading={subjectDataLoading}
                  showSearch
                  style={{ width: "95%" }}
                  placeholder="Choose Subject"
                  optionFilterProp="children"
                  onChange={(e) => setSubject(e)}
                  value={subject}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {subjectOptions}
                </Select>
              </Col>
              <Col span={6}>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col span={2}>
                <InputNumber
                  style={{ width: "80%" }}
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
                  onClick={addTopic}
                  style={{ width: "100%" }}
                >
                  Add Topic
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
            rowKey={(record) => record.topic_identifier}
            loading={topicDataLoading}
          />
        </div>
      </Content>
      <Modal
        width="30%"
        visible={editVisibility}
        title="Update Topic"
        okText="Update"
        onCancel={onCancel}
        onOk={editOk}
      >
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Subject : </Col>
          <Col span={12}>
            <Select
              loading={subjectDataLoading}
              showSearch
              style={{ width: "75%" }}
              placeholder="Choose Subject"
              optionFilterProp="children"
              value={editSubject}
              onChange={(e) => setEditSubject(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {subjectOptions}
            </Select>
          </Col>
        </Row>
        <Row style={{ textAlign: "left" }}>
          <Col span={12}>Name : </Col>
          <Col span={12}>
            <Input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
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
    topicData: state.topic.topic_data,
    topicDataLoading: state.topic.isTopicsLoading,
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(Topics);
