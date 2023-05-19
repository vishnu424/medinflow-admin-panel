import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, connect } from "react-redux";

import Card from "antd/es/card";
import Spin from "antd/es/spin";
import Layout from "antd/es/layout";
import Modal from "antd/es/modal";
import message from "antd/es/message";
import Table from "antd/es/table";
import Divider from "antd/es/divider";
import Input from "antd/es/input";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Button from "antd/es/button";
import InputNumber from "antd/es/input-number";
import Select from "antd/es/select";
import Upload from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import { URL } from "../../../utils/Config";
import { htmlToKatex, compareByAlph } from "../../../utils/utils";
import { subjectsActions } from "../../../application/Actions/Subjects";
import { lessonsActions } from "../../../application/Actions/Lessons";
import { topicsActions } from "../../../application/Actions/Topics";
import { flowchartActions } from "../../../application/Actions/Flowchart";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

const HtmlEditor = lazy(() => import("../../components/HtmlEditor/HtmlEditor"));
const MobilePreview = lazy(() =>
  import("../../components/MobilePreview/MobilePreview")
);
const QuestionView = lazy(() =>
  import("../../components/QuestionView/QuestionView")
);

// const { confirm } = Modal
const { Option } = Select;
const { Search } = Input;
const { Content } = Layout;

const EditFlowChart = ({
  isLoading,
  topicData,
  subjectData,
  subjectDataLoading,
  flowchartData,
  token,
  role,
}) => {
  const dispatch = useDispatch();
  let navigate = useHistory();
  const [editFlowchartVisibility, setEditFlowchartVisibility] = useState(false);
  const [editSelectedHashtags, setEditSelectedHashtags] = useState([]);
  const [webFlowchartDataContent, setWebFlowchartDataContent] = useState([
    {
      id: "1",
      name: "Root",
      color: "#EE7977",
      featured_text: null,
      content: "",
      type: "square",
      parentId: "",
      action: "description",
      formFlowchartId: "",
      label: "",
    },
  ]);
  const [flowchartDataContent, setFlowchartDataContent] = useState([
    {
      id: "1",
      name: "Root",
      color: "#EE7977",
      featured_text: null,
      content: "",
      type: "square",
      parentId: "",
      action: "description",
      formFlowchartId: "",
      label: "",
    },
  ]);
  const [flowchartDataContentGlobal, setFlowchartDataContentGlobal] = useState([
    {
      id: "1",
      name: "Root",
      color: "#EE7977",
      featured_text: null,
      content: "",
      type: "square",
      parentId: "",
      action: "description",
      formFlowchartId: "",
      label: "",
    },
  ]);
  const [flowchartWidth, setFlowchartWidth] = useState(0);
  const [flowchartHeight, setFlowchartHeight] = useState(0);
  const [modalDisplay, setModalDisplay] = useState("modal hidden");
  const [modalData, setModalData] = useState({ title: "", body: "" });
  const [webData, setWebData] = useState();
  const [webPreviewVisibility, setWebPreviewVisibility] = useState(false);
  const [citationData, setCitationData] = useState({});

  // Upload
  const [file, setFile] = useState({});

  const [selectedFlowchartId, setSelectedflowchartId] = useState("");
  const [data, setData] = useState("");
  const [subject, setSubject] = useState("");
  const [previewVisibility, setPreviewVisibility] = useState(false);
  const [editLoading, setEditLoading] = useState(true);

  // Edit form data
  const [editSelectedTopic, setEditSelectedTopics] = useState("");
  const [editName, setEditName] = useState("");
  const [editSortOrder, setEditSortOrder] = useState(1);
  const [dynamicForm, setDynamicForm] = useState([]);
  const [datasource, setDatasource] = useState(flowchartData);
  const [searchTerm, setSearchTerm] = useState("");

  const initialData = async () => {
    try {
      dispatch(subjectsActions.getAllSubjects());
      dispatch(lessonsActions.getAllLessons());
      dispatch(topicsActions.getAllTopics());
      const newData = await dispatch(flowchartActions.getAllFlowchart());
      await setDatasource(newData);
      setSearchTerm("");
    } catch (err) {
      console.log(err);
    }
  };

  // Get Initial Data
  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    const newData = flowchartData.filter((flowchart) =>
      flowchart.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDatasource(newData);
  }, [searchTerm]);

  const props = {
    action:
      "https://api.basidialearning.com/api/v1/basidia-learning/contents/upload-image",
    headers: {
      Authorization: "Bearer " + token,
    },
    name: "image",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setFile(file.response.success.payload);
      }
    },
  };

  const clearForm = () => {
    setFile({});
    setEditSelectedTopics("");
    setEditName("");
    setEditSortOrder(1);
  };

  const subjectOptions = subjectData.map((data) => (
    <Option flowchart={data.id} value={data.id}>
      {data.name}
    </Option>
  ));

  // Edit Actions
  const onCancel = () => {
    setEditFlowchartVisibility(false);
    setEditLoading(true);
  };

  const handleImageSave = async (index, url) => {
    // let resp = await contentService.save('image', url)
    // console.log(resp);
    // if (resp) {
    //   const tempData = [...dynamicForm]
    //   tempData[index].id = resp
    //   setDynamicForm(tempData)
    //   message.success('Image Uploaded Successfully')
    // } else {
    //   message.error('Error : Failed')
    // }
  };

  const onEdit = async (flowchartId) => {
    setSelectedflowchartId(flowchartId);
    setEditFlowchartVisibility(true);
    // Get current topic
    let resp = await dispatch(flowchartActions.getFlowchart(flowchartId));
    if (resp) {
      setEditName(resp.name);
      setEditSortOrder(resp.sortOrder);
      setEditSelectedHashtags(resp.hashTag);
      setSubject(resp.subjectId);
      const contentData = await resp.description.map((data) => {
        if (data.contentType === "text") {
          return {
            id: data.id,
            content: data.contentData,
            previewContent: data.contentDataHtml,
            type: "text",
            enabled: true,
            sortOrder: data.sortOrder,
            flowchart: Math.floor(Math.random() * 1000) + 1,
          };
        } else if (data.contentType === "image") {
          return {
            id: data.id,
            content: data.contentData,
            type: "image",
            flowchart: Math.floor(Math.random() * 1000) + 1,
          };
        }
      });
      setDynamicForm(contentData);
      setEditLoading(false);
    } else {
      message.error("Error : Failed");
      setEditLoading(false);
    }
  };

  const editOk = async () => {
    const description = await dynamicForm.map((data) => {
      return data.id;
    });
    let resp = await dispatch(
      flowchartActions.updateFlowchart(selectedFlowchartId, {
        name: editName,
        subjectId: subject,
        sortOrder: editSortOrder,
        description: description,
        hashTag: editSelectedHashtags,
      })
    );
    // console.log(resp);
    if (resp) {
      // dispatch(flowchartActions.getAllFlowchart())
      message.success("Flowchart Updated Successfully");
      setEditFlowchartVisibility(false);
      setEditLoading(true);
      clearForm();
    } else {
      message.error("err while updating flowchart");
    }
  };

  const handleAddHtmlNode = () => {
    setDynamicForm([
      ...dynamicForm,
      {
        id: "",
        content: "",
        previewContent: "",
        type: "text",
        enabled: true,
        flowchart: Math.floor(Math.random() * 1000) + 1,
      },
    ]);
  };

  const handleAddImageNode = (id) => {
    setDynamicForm([
      ...dynamicForm,
      {
        id: "",
        content: "",
        type: "image",
        flowchart: Math.floor(Math.random() * 1000) + 1,
      },
    ]);
  };
  const handleRemoveNode = (flowchart) => {
    setDynamicForm(dynamicForm.filter((data) => data.flowchart !== flowchart));
  };

  const handleEditorChange = async (index, data) => {
    const tempData = [...dynamicForm];
    tempData[index].content = data;
    tempData[index].previewContent = await htmlToKatex(data);
    tempData[index].enabled = false;
    setDynamicForm(tempData);
  };

  const checkEnabled = (index) => {
    return dynamicForm[index].enabled;
  };

  const handleEditorSave = async (index) => {
    // if (dynamicForm[index].id === '') {
    //   try {
    //     const tempData = [...dynamicForm]
    //     tempData[index].id = await contentService.save(
    //       'text',
    //       dynamicForm[index].content
    //     )
    //     tempData[index].enabled = true
    //     setDynamicForm(tempData)
    //     message.success('Content Added Successfully')
    //   } catch (e) {
    //     message.error(e.message)
    //   }
    // } else {
    //   try {
    //     const tempData = [...dynamicForm]
    //     tempData[index].id = await contentService.update(
    //       'text',
    //       dynamicForm[index].content,
    //       dynamicForm[index].id
    //     )
    //     tempData[index].enabled = true
    //     setDynamicForm(tempData)
    //     message.success('Content Update Successfully')
    //   } catch (e) {
    //     message.error(e.message)
    //   }
    // }
  };

  const showDeleteConfirm = (flow_chart_identifier) => {
    Modal.confirm({
      title: "Are you sure delete this Flowchart?",
      content: `${flow_chart_identifier}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(flowchartActions.deleteFlowchart(flow_chart_identifier))
          .then((data) => {
            message.success("Deleted Successfully");
            initialData();
          })
          .catch((e) => console.log(e));
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
      key: "flow_chart_identifier",
    },
    {
      title: "Flowchart Name",
      dataIndex: "name",
      sorter: (a, b) => compareByAlph(a.name, b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail_url",
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
          {/* <a onClick={() => onEdit(text.flow_chart_identifier)}>Edit</a> */}
          <Link to={`edit-flow/${text.flow_chart_identifier}`}>Edit</Link>
          <Divider type="vertical" />
          <a
            onClick={() => showPreview(text.flow_chart_identifier)}
            style={{ color: "blue" }}
          >
            Preview
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => showWebPreview(text.flow_chart_identifier)}
            style={{ color: "orange" }}
          >
            Web Preview
          </a>
          <Divider type="vertical" />
          {role === "admin" ? (
            <a
              onClick={() => showDeleteConfirm(text.flow_chart_identifier)}
              style={{ color: "red" }}
            >
              Delete
            </a>
          ) : null}
        </span>
      ),
    },
  ];

  const loadCiteModal = () => {
    setModalData({
      title: "Citation",
      body: citationData.content_html,
    });
    setModalDisplay("modal");
  };

  const loadModal = (id) => {
    const data = flowchartDataContentGlobal.filter((item) => item.id === id);
    console.log(data[0].action);
    if (data[0].action === "flowchart") {
      return navigate.push(
        `https://www.medinflow.com/flowchart/${data[0].formFlowchartId}`
      );
    }
    if (data[0].action === "description") {
      setModalData({
        title: data[0].name,
        body: data[0].content_html,
      });
    }
    setModalDisplay("modal");
  };

  const modalToFullscreen = () => {
    setModalDisplay("modal fullscreen");
  };

  const onWebPreviewCancel = () => {
    setWebPreviewVisibility(false);
    setModalDisplay("modal hidden");
  };

  const onCancelPreview = () => {
    setPreviewVisibility(false);
    setModalDisplay("modal hidden");
  };

  const showPreview = async (flowchartId) => {
    setSelectedflowchartId(flowchartId);
    setPreviewVisibility(true);
    // get current topic
    let resp = await dispatch(flowchartActions.getFlowchart(flowchartId));
    console.log(resp);
    if (resp) {
      setFlowchartDataContentGlobal(resp.data.flowchartData);
      setFlowchartDataContent(resp.data.flowchartData);
      setFlowchartWidth(resp.data.max_height);
      setFlowchartHeight(resp.data.max_width);
      if (
        resp.data.citationData &&
        Object.keys(resp.data.citationData).length > 1
      ) {
        setCitationData(resp.data.citationData);
        setData(`<div>
          <h3>${resp.name} <sup>
          [cit.]
        </sup></h3>
          </div><br>`);
      } else {
        setData(`<div>
        <h3>${resp.name}</h3>
        </div><br>`);
      }
    } else {
      message.error("Error while getting data");
    }
  };

  const showWebPreview = async (flowchartId) => {
    setSelectedflowchartId(flowchartId);
    setWebPreviewVisibility(true);
    // get current topic
    let resp = await dispatch(flowchartActions.getFlowchart(flowchartId));
    console.log(resp);
    if (resp) {
      setFlowchartDataContentGlobal(resp.data.flowchartData);
      setWebFlowchartDataContent(resp.data.flowchartData);
      setFlowchartWidth(resp.data.max_height);
      setFlowchartHeight(resp.data.max_width);
      if (
        resp.data.citationData &&
        Object.keys(resp.data.citationData).length > 1
      ) {
        setCitationData(resp.data.citationData);
        setWebData(`<div>
      <h3>${resp.name} <sup>
      [cit.]
    </sup></h3>
      </div><br>`);
      } else {
        setWebData(`<div>
        <h3>${resp.name}</h3>
        </div><br>`);
      }
    } else {
      message.error("Error while getting data");
    }
  };

  return (
    <div>
      <div style={{ height: "20px" }} />
      <Content style={{ margin: "0 16px" }}>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <Search
            placeholder="Input Search Text"
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div style={{ height: "20px" }} />
          <Table
            pagination={{ showQuickJumper: true }}
            dataSource={datasource}
            columns={columns}
            rowKey={(record) => record.flow_chart_identifier}
            loading={isLoading}
          />
        </div>
      </Content>
      <Modal
        width="70%"
        visible={editFlowchartVisibility}
        title="Update Flowchart"
        okText="Update"
        onCancel={onCancel}
        onOk={editOk}
      >
        {editLoading ? (
          <Spin style={{ textAlign: "center", width: "100%" }} />
        ) : (
          <>
            <Row style={{ textAlign: "left" }}>
              <Col span={2} style={{ textAlign: "center" }}>
                Subject :{" "}
              </Col>
              <Col span={6}>
                <Select
                  loading={subjectDataLoading}
                  showSearch
                  style={{ width: "75%" }}
                  placeholder="Choose Subject"
                  optionFilterProp="children"
                  value={subject}
                  onChange={(e) => setSubject(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {subjectOptions}
                </Select>
              </Col>
              <Col span={2} style={{ textAlign: "center" }}>
                Flowchart Name :{" "}
              </Col>
              <Col span={8}>
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Col>

              <Col span={4} style={{ textAlign: "center" }}>
                Sort Order :{" "}
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  value={editSortOrder}
                  onChange={(e) => setEditSortOrder(e)}
                />
              </Col>
            </Row>
            <div style={{ height: "20px" }} />
            <Row style={{ textAlign: "left" }}>
              <Col span={4} style={{ textAlign: "center" }}>
                Related Hashtags :{" "}
              </Col>
              <Col span={20}>
                <Select
                  showSearch
                  mode="multiple"
                  style={{ width: "75%" }}
                  placeholder="Select related hashtags"
                  value={editSelectedHashtags}
                  onChange={(e) => setEditSelectedHashtags(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Col>
            </Row>
            <div style={{ height: "20px" }} />
            <Row>
              {dynamicForm.map((objects, index) => {
                if (objects.type === "text") {
                  return (
                    <div flowchart={objects.flowchart}>
                      <Suspense
                        fallback={
                          <Spin
                            style={{ textAlign: "center", width: "100%" }}
                          />
                        }
                      >
                        <HtmlEditor
                          mode={1}
                          dynamicForm={dynamicForm}
                          index={index}
                          handleRemoveNode={handleRemoveNode}
                          handleEditorChange={handleEditorChange}
                          flowchart={objects.flowchart}
                          editorFlowchart={objects.flowchart}
                          content={objects.content}
                          previewContent={objects.previewContent}
                          editorCol={16}
                          previewCol={8}
                        />
                      </Suspense>
                      <Row style={{ padding: "20px" }}>
                        <Button
                          style={{
                            backgroundColor: "#a0d911",
                            width: "100%",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          disabled={checkEnabled(index)}
                          onClick={() => handleEditorSave(index)}
                        >
                          Save
                        </Button>
                      </Row>
                    </div>
                  );
                } else if (objects.type === "image") {
                  return (
                    <Row flowchart={objects.flowchart}>
                      <Col span={24}>
                        <Card
                          size="small"
                          title="Image Content"
                          extra={
                            <Button
                              type="danger"
                              onClick={() =>
                                handleRemoveNode(objects.flowchart)
                              }
                            >
                              Remove Node
                            </Button>
                          }
                        >
                          <img
                            src={objects.content}
                            alt="Upload Image"
                            width="250px"
                          />

                          <Upload
                            {...props}
                            onChange={({ file, fileList }) => {
                              if (file.status !== "uploading") {
                                handleImageSave(
                                  index,
                                  file.response.success.payload
                                );
                              }
                            }}
                          >
                            <Button>
                              <UploadOutlined /> Upload
                            </Button>
                          </Upload>
                        </Card>
                      </Col>
                    </Row>
                  );
                }
              })}
              {
                <div>
                  <Divider dashed />
                  <Row style={{ textAlign: "center" }}>
                    <Col span={12}>
                      <Button onClick={() => handleAddHtmlNode()}>
                        Add HTML
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button onClick={() => handleAddImageNode()}>
                        Add Image
                      </Button>
                    </Col>
                  </Row>
                </div>
              }
            </Row>
          </>
        )}
      </Modal>
      <Modal
        visible={previewVisibility}
        title="Mobile Preview"
        footer={null}
        onCancel={onCancelPreview}
        zIndex={1200}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <MobilePreview
            content={data}
            flowchartDataContent={flowchartDataContent}
            flowchartWidth={flowchartWidth}
            flowchartHeight={flowchartHeight}
            loadModal={loadModal}
            loadCiteModal={loadCiteModal}
            modalDisplay={modalDisplay}
            modalData={modalData}
            modalToFullscreen={modalToFullscreen}
            setModalDisplay={setModalDisplay}
          />
        </Suspense>
      </Modal>
      <Modal
        visible={webPreviewVisibility}
        title="Web Preview"
        footer={null}
        onCancel={onWebPreviewCancel}
        zIndex={1200}
        width="80%"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionView
            content={webData}
            flowchartDataContent={webFlowchartDataContent}
            flowchartWidth={flowchartWidth}
            flowchartHeight={flowchartHeight}
            loadModal={loadModal}
            loadCiteModal={loadCiteModal}
            modalDisplay={modalDisplay}
            modalData={modalData}
            modalToFullscreen={modalToFullscreen}
            setModalDisplay={setModalDisplay}
          />
        </Suspense>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.flowchart.isFlowchartLoading,
    topicData: state.topic.topic_data,
    subjectData: state.subject.data,
    subjectDataLoading: state.subject.isDataLoading,
    flowchartData: state.flowchart.flowchart_data,
    token: state.auth.token,
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(EditFlowChart);
