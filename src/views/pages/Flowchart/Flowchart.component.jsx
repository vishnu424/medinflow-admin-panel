import React, { useState, useEffect, lazy, Suspense } from "react";
import { UploadOutlined, CaretRightOutlined } from "@ant-design/icons";
import { URL } from "../../../utils/Config";
import { htmlToKatex, processString } from "../../../utils/utils";
import {
  Collapse,
  Spin,
  Layout,
  Breadcrumb,
  message,
  Divider,
  Input,
  Row,
  Col,
  Button,
  InputNumber,
  Select,
  Upload,
  Modal,
  Radio,
} from "antd";
import { useDispatch, connect } from "react-redux";
import { subjectsActions } from "../../../application/Actions/Subjects";
import { topicsActions } from "../../../application/Actions/Topics";
import { flowchartActions } from "../../../application/Actions/Flowchart";
import { subTopicsActions } from "../../../application/Actions/SubTopics";
import { instructorsActions } from "../../../application/Actions/Instructors";
import { colors, types } from "./types";
import Chart from "../../components/Chart/Chart";
import "./Flowchart.component.css";
import { doctorActions } from "../../../application/Actions/Doctor";

const HtmlEditor = lazy(() => import("../../components/HtmlEditor/HtmlEditor"));
const { Panel } = Collapse;
const { Option } = Select;
const { Content } = Layout;

const Flowchart = ({
  topicData,
  subjectData,
  subtopicData,
  subjectDataLoading,
  token,
  doctorsData,
  flowchartDataList,
}) => {
  const [dynamicForm, setDynamicForm] = useState([]);
  const dispatch = useDispatch();

  // Add form data
  const [subject, setSubject] = useState("");
  const [activeCard, setActiveCard] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [sortOrder, setSortOrder] = useState(1);
  const [active, setActive] = useState(true);
  const [parentOptions, setParentOptions] = useState([]);
  // const [datasource, setDatasource] = useState([]);

  const [flowchartData, setFlowchartData] = useState([
    {
      id: "1",
      name: "Root",
      color: "#F5BBBB",
      featured_text: null,
      content: "",
      type: "square",
      parentId: "",
      action: "description",
      formFlowchartId: "",
      label: "",
      displayImage:
        "https://workmacro.com/wp-content/uploads/2018/02/1-by-1.png",
      displayType: "image",
    },
  ]);
  const [editContentVisibility, setEditContentVisibility] = useState(false);
  const [citationModalVisibility, setCitationModalVisibility] = useState(false);
  const [content, setContent] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [currentContentIndex, setCurrentEditId] = useState();
  const [citation, setCitation] = useState("");
  const [citationHtml, setCitationHtml] = useState("");
  const [citationData, setCitationData] = useState({});

  useEffect(() => {
    // console.log(flowchartData);
  }, [flowchartData]);

  // Load Initial Data
  const initialData = async () => {
    try {
      dispatch(subjectsActions.getAllSubjects());
      dispatch(topicsActions.getAllTopics());
      dispatch(subTopicsActions.getAllSubTopics());
      dispatch(doctorActions.getAllDoctors());
      dispatch(flowchartActions.getAllFlowchart());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  const getMaxIdOfFlowchartData = () => {
    return `${
      Math.max.apply(
        Math,
        flowchartData.map((data) => data.id)
      ) + 1
    }`;
  };

  const addNode = (id, type = "square") => {
    setFlowchartData([
      ...flowchartData,
      {
        id: getMaxIdOfFlowchartData(),
        name: getMaxIdOfFlowchartData(),
        color: "#8BCFC8",
        featured_text: "",
        content: "",
        type: type,
        parentId: id,
        action: "description",
        formFlowchartId: "",
        label: "",
        displayType: "title",
      },
    ]);
  };

  const editContent = (i) => {
    setEditContentVisibility(true);
    setContent(flowchartData[i].content);
    setContentHtml(flowchartData[i].content_html);
    setCurrentEditId(i);
  };

  const saveContent = async (i) => {
    const tempData = [...flowchartData];
    tempData[i].content = content;
    tempData[i].content_html = contentHtml;
    setContent();
    setContentHtml();
    setFlowchartData(tempData);
    setEditContentVisibility(false);
    message.success("Content edited");
  };

  const deleteNode = (id) => {
    let filteredData = flowchartData
      .filter((data) => data.parentId !== id)
      .filter((data) => data.id !== id);
    setFlowchartData(filteredData);
  };

  const addCitation = () => {
    setCitationModalVisibility(true);
    setCitation(citationData.content);
    setCitationHtml(citationData.content_html);
    // setCurrentCitationId(i);
  };

  const saveCitation = async (i) => {
    const tempData = { ...citationData };
    tempData.content = citation;
    tempData.content_html = citationHtml;
    // console.log(tempData);
    setCitationData(tempData);
    setCitationModalVisibility(false);
    message.success("Citation Added");
  };

  const deleteCitationNode = (id) => {
    setCitationData({});
  };

  const clearForm = () => {
    setSubject("");
    setTopic("");
    setSubtopic("");
    setName("");
    setSortOrder(1);
    setActive(true);
    setFlowchartData([
      {
        id: "1",
        name: "Root",
        color: "#F5BBBB",
        featured_text: null,
        content: "",
        type: "square",
        parentId: "",
        action: "description",
        formFlowchartId: "",
        label: "",
        displayType: "title",
      },
    ]);
  };

  // Image Upload
  const props = {
    action: "https://api.medinflow.com/api/v1/file/upload/s3",
    name: "file",
    headers: {
      "x-user-token": token,
    },
    // onChange({ file, fileList }) {
    //   console.log(file);
    // },
  };

  const handleSaveKey = async () => {
    let error = false;
    flowchartData.map((flow) => {
      if (
        flow.action == "flowchart" &&
        !flow.formFlowchartId &&
        flow.formFlowchartId == ""
      ) {
        error = true;
        return message.error("Flowchart must be selected");
      }
    });
    const data = {
      flowchartData,
      citationData,
    };

    if (!error) {
      let resp = await dispatch(
        flowchartActions.addFlowchart({
          name: name,
          subject_identifier: subject,
          topic_identifier: topic,
          sub_topic_identifier: subtopic,
          doctor_identifiers: doctor,
          author_identifier: author,
          data: data,
          is_active: active,
          sort_order: sortOrder,
        })
      );
      // console.log(resp);
      if (resp === "success") {
        message.success("Flowchart Added Successfully");
        clearForm();
      } else {
        return message.error("Error while adding flowchart");
      }
    }
  };

  const editFlowchartData = async (data, index, type) => {
    const tempData = [...flowchartData];
    if (type === "name") tempData[index].name = data;
    if (type === "parentId") tempData[index].parentId = data;
    if (type === "color") tempData[index].color = data;
    if (type === "border") tempData[index].border = data;
    if (type === "featured_text") tempData[index].featured_text = data;
    if (type === "content") tempData[index].content = data;
    if (type === "type") tempData[index].type = data;
    if (type === "action") tempData[index].action = data;
    if (type === "formFlowchartId") tempData[index].formFlowchartId = data;
    if (type === "label") tempData[index].label = data;
    if (type === "displayImage") tempData[index].displayImage = data;
    if (type === "displayType") {
      tempData[index].displayType = data;
      data === "title"
        ? delete tempData[index].displayImage
        : delete tempData[index].name;
    }
    setFlowchartData(tempData);
  };

  useEffect(() => {
    dispatch(topicsActions.getAllTopics());
  }, []);

  const subjectOptions = subjectData.map((data) => (
    <Option key={data.subject_identifier} value={data.subject_identifier}>
      {data.name}
    </Option>
  ));
  const topicOptions = topicData.map((data) => (
    <Option key={data.topic_identifier} value={data.topic_identifier}>
      {data.name}
    </Option>
  ));
  const subtopicOptions = subtopicData.map((data) => (
    <Option key={data.sub_topic_identifier} value={data.sub_topic_identifier}>
      {data.name}
    </Option>
  ));
  const authorOptions = doctorsData.map((data) => (
    <Option key={data.doctor_identifier} value={data.doctor_identifier}>
      {data.name}
    </Option>
  ));

  const typeOptions = types.map((data, index) => (
    <Option key={index} value={data.value}>
      {data.name}
    </Option>
  ));

  const colorOptions = colors.map((data, index) => (
    <Option key={index} value={data.value}>
      {data.name}
    </Option>
  ));

  const flowchartOptions = flowchartDataList.map((data, index) => (
    <Option key={index} value={data.flow_chart_identifier}>
      {data.name}
    </Option>
  ));

  const scrollToId = (id) => {
    setActiveCard(id);
    // console.log(id);
    // console.log(document.getElementById(id));
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    let tempData = flowchartData.map((data) => (
      <Option key={data.id} value={data.id}>
        {data.name}
      </Option>
    ));
    setParentOptions(tempData);
  }, [flowchartData]);

  const buttonStyle = {
    width: "100%",
    borderRadius: "0px",
  };
  const panelStyle = {
    background: "#f7f7f7",
    borderRadius: "2px",
    border: "0px",
    overflow: "hidden",
  };

  // View Part
  return (
    <div>
      <Content style={{ margin: "0 16px", minHeight: "100px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Flowcharts</Breadcrumb.Item>
        </Breadcrumb>

        <div
          style={{
            padding: 24,
            background: "#fff",
            margin: "auto",
          }}
        >
          <Row>
            <Col span={14}>
              <div
                style={{
                  width: "100%",
                  minHeight: "800px",
                  background: "rgb(251,251,251)",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <Chart data={flowchartData} clickNode={scrollToId} />
              </div>
            </Col>
            <Col span={10}>
              <div
                style={{
                  width: "100%",
                  minHeight: "800px",
                  maxHeight: "800px",
                  padding: "5px",
                  overflow: "scroll",
                }}
              >
                <div>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["1", "2", "3"]}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel header="Flowchart Info" key="1" style={panelStyle}>
                      <Row>
                        <Col span={4}>Name :</Col>
                        <Col span={20}>
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Flowchart Name"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>Subject :</Col>
                        <Col span={20}>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
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
                      </Row>
                      <Row>
                        <Col span={4}>Topic :</Col>
                        <Col span={20}>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            value={topic}
                            onChange={(e) => setTopic(e)}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {topicOptions}
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>Sub-Topic :</Col>
                        <Col span={20}>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            value={subtopic}
                            onChange={(e) => setSubtopic(e)}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {subtopicOptions}
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>Author :</Col>
                        <Col span={20}>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            value={author}
                            onChange={(e) => setAuthor(e)}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {authorOptions}
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>Verified by :</Col>
                        <Col span={20}>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            value={doctor}
                            mode="multiple"
                            onChange={(e) => setDoctor(e)}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {authorOptions}
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>Status :</Col>
                        <Col span={20}>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            value={active}
                            onChange={(e) => setActive(e)}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option key="active" value={true}>
                              Active
                            </Option>
                            <Option key="inactive" value={false}>
                              Inactive
                            </Option>
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>Sort Number :</Col>
                        <Col span={20}>
                          <InputNumber style={{ width: "100%" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>Citation :</Col>
                        <Col span={16}>
                          <Button
                            type="dashed"
                            onClick={() => addCitation()}
                            style={{ width: "90%", marginTop: "10px" }}
                          >
                            Add Citation
                          </Button>
                        </Col>
                        <Col span={4}>
                          <Button
                            type="danger"
                            onClick={() => deleteCitationNode()}
                            style={{ width: "90%", marginTop: "10px" }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Panel>

                    <Panel header="Flowchart Data" key="3" style={panelStyle}>
                      {flowchartData.map((data, i) => {
                        return (
                          <div
                            key={i}
                            id={data.id}
                            style={{
                              padding: "10px",
                              backgroundColor: "#fff",
                              border:
                                activeCard === data.id
                                  ? "3px solid #000"
                                  : "3px solid #eee",
                              borderRadius: "5px",
                              marginTop: "15px",
                            }}
                          >
                            <Row>
                              <Col span={4}>Display :</Col>
                              <Col span={2}></Col>
                              <Col span={18}>
                                <Radio.Group
                                  value={data.displayType}
                                  onChange={(e) =>
                                    editFlowchartData(
                                      e.target.value,
                                      i,
                                      "displayType"
                                    )
                                  }
                                >
                                  <Radio.Button value="title">
                                    Title
                                  </Radio.Button>
                                  <Radio.Button value="image">
                                    Image
                                  </Radio.Button>
                                </Radio.Group>
                              </Col>
                            </Row>
                            {data.displayType === "title" ||
                            !data.displayType ? (
                              <Row>
                                <Col span={4}>Title :</Col>
                                <Col span={2}></Col>
                                <Col span={18}>
                                  <Input
                                    placeholder="Flowchart Name"
                                    value={data.name}
                                    onChange={(e) =>
                                      editFlowchartData(
                                        e.target.value,
                                        i,
                                        "name"
                                      )
                                    }
                                  />
                                </Col>
                              </Row>
                            ) : (
                              <Row>
                                <Col span={4}>Title Image :</Col>
                                <Col span={2}></Col>
                                <Col span={18}>
                                  <Upload
                                    {...props}
                                    onChange={({ file, fileList }) => {
                                      console.log(file.response);
                                      if (file.response) {
                                        editFlowchartData(
                                          file.response.data.s3FilePath,
                                          i,
                                          "displayImage"
                                        );
                                      }
                                    }}
                                  >
                                    <Button>
                                      <UploadOutlined /> Upload
                                    </Button>
                                  </Upload>
                                </Col>
                              </Row>
                            )}
                            <Row>
                              <Col span={4}>Parent :</Col>
                              <Col span={2}></Col>
                              <Col span={18}>
                                <Select
                                  showSearch
                                  style={{ width: "100%" }}
                                  placeholder="Select Parent"
                                  value={data.parentId}
                                  disabled={data.id === "1" ? true : false}
                                  onChange={(e) =>
                                    editFlowchartData(e, i, "parentId")
                                  }
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {parentOptions}
                                </Select>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={4}>Type :</Col>
                              <Col span={2}></Col>
                              <Col span={18}>
                                <Select
                                  showSearch
                                  style={{ width: "100%" }}
                                  placeholder="Select Type"
                                  value={data.type}
                                  onChange={(e) =>
                                    editFlowchartData(e, i, "type")
                                  }
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {typeOptions}
                                </Select>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={3}>Color :</Col>
                              <Col span={3}>
                                <div
                                  style={{
                                    backgroundColor: `${data.color}`,
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "5px",
                                    margin: "auto",
                                  }}
                                />
                              </Col>
                              <Col span={18}>
                                <Select
                                  showSearch
                                  style={{ width: "100%" }}
                                  value={data.color}
                                  onChange={(e) =>
                                    editFlowchartData(e, i, "color")
                                  }
                                  placeholder="Select Color"
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {colorOptions}
                                </Select>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={4}>Label :</Col>
                              <Col span={2}></Col>
                              <Col span={18}>
                                <Input
                                  placeholder="Enter Label"
                                  value={data.label}
                                  onChange={(e) =>
                                    editFlowchartData(
                                      e.target.value,
                                      i,
                                      "label"
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col span={4}>Action :</Col>
                              <Col span={2}></Col>
                              <Col span={18}>
                                <Select
                                  showSearch
                                  style={{ width: "100%" }}
                                  placeholder="Select Action"
                                  value={data.action}
                                  onChange={(e) =>
                                    editFlowchartData(e, i, "action")
                                  }
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  <Option key={1} value="description">
                                    Description
                                  </Option>
                                  <Option key={2} value="flowchart">
                                    Flowchart
                                  </Option>
                                  <Option key={3} value="none">
                                    None
                                  </Option>
                                </Select>
                              </Col>
                            </Row>
                            {data.action === "flowchart" && (
                              <Row>
                                <Col span={4}>Flowchart :</Col>
                                <Col span={2}></Col>
                                <Col span={18}>
                                  <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="Select Flowchart"
                                    value={data.formFlowchartId}
                                    onChange={(e) =>
                                      editFlowchartData(e, i, "formFlowchartId")
                                    }
                                    filterOption={(input, option) =>
                                      option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    {flowchartOptions}
                                  </Select>
                                </Col>
                              </Row>
                            )}
                            {/* <Row >
                                <Col span={3}>Border :</Col>
                                <Col span={3}>
                                  <div style={{ backgroundColor: `${data.border}`, width: '25px', height: '25px', borderRadius: '5px', margin: 'auto' }} />
                                </Col>
                                <Col span={18}>
                                  <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    value={data.border}
                                    onChange={e => editFlowchartData(e, i, 'border')}
                                    placeholder='Select Border'
                                    filterOption={(input, option) =>
                                      option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    {colorOptions}
                                  </Select>
                                </Col>
                              </Row> */}
                            <Row>
                              <Col span={6}>
                                <Button
                                  type="primary"
                                  onClick={() => addNode(data.id, "square")}
                                  style={{ width: "90%", marginTop: "10px" }}
                                >
                                  + Square
                                </Button>
                              </Col>
                              <Col span={6}>
                                <Button
                                  type="primary"
                                  onClick={() => addNode(data.id, "circle")}
                                  style={{ width: "90%", marginTop: "10px" }}
                                >
                                  + Circle
                                </Button>
                              </Col>
                              <Col span={6}>
                                {data.action === "description" && (
                                  <Button
                                    type="dashed"
                                    onClick={() => editContent(i)}
                                    style={{ width: "90%", marginTop: "10px" }}
                                  >
                                    Edit Content
                                  </Button>
                                )}
                              </Col>
                              <Col span={6}>
                                <Button
                                  type="danger"
                                  onClick={() => deleteNode(data.id)}
                                  style={{ width: "90%", marginTop: "10px" }}
                                >
                                  Delete
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        );
                      })}
                    </Panel>
                  </Collapse>
                </div>
                <div
                  style={{
                    backgroundColor: "white",
                    position: "absolute",
                    width: "100%",
                    bottom: "0px",
                  }}
                >
                  <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        onClick={() => handleSaveKey()}
                        style={{ ...buttonStyle, width: "100%" }}
                      >
                        Save Flowchart
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Modal
        visible={editContentVisibility}
        title="Edit Content"
        width="80%"
        onCancel={() => setEditContentVisibility(false)}
        onOk={() => saveContent(currentContentIndex)}
        zIndex={1200}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <HtmlEditor
            editorCol={16}
            previewCol={8}
            editorName="question"
            setData={setContent}
            content={content}
            setDataHtml={setContentHtml}
            previewContent={contentHtml}
          />
        </Suspense>
      </Modal>
      <Modal
        visible={citationModalVisibility}
        title="Add Citation"
        width="80%"
        onCancel={() => setCitationModalVisibility(false)}
        onOk={() => saveCitation()}
        zIndex={1200}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <HtmlEditor
            editorCol={16}
            previewCol={8}
            editorName="question"
            setData={setCitation}
            content={citation}
            setDataHtml={setCitationHtml}
            previewContent={citationHtml}
          />
        </Suspense>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    topicData: state.topic.topic_data,
    subjectId: state.subject.subjectId,
    token: state.auth.token,
    subjectData: state.subject.data,
    subjectDataLoading: state.subject.isDataLoading,
    subtopicData: state.subtopic.sub_topic_data,
    doctorsData: state.doctor.doctors_data,
    flowchartDataList: state.flowchart.flowchart_data,
  };
};

export default connect(mapStateToProps)(Flowchart);
