import React from "react";
import { Row, Col, Button } from "antd";
import ReactHtmlParser from "html-react-parser";
import Chart from "../Chart/Chart";

const QuestionView = ({
  content,
  flowchartDataContent,
  loadModal,
  loadCiteModal,
  modalDisplay,
  modalData,
  modalToFullscreen,
  setModalDisplay,
}) => {
  return (
    <>
      <Row
        className="question-content"
        style={{ marginBottom: "20px", paddingTop: "20px" }}
        type="flex"
        align="middle"
      >
        <div style={{ width: "100%" }}>
          <p onClick={loadCiteModal}>{ReactHtmlParser(unescape(content))}</p>

          <Chart data={flowchartDataContent} clickNode={loadModal} />

          <div className={modalDisplay}>
            <div className="modalData">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h2 style={{ color: "#0080AB" }}>{modalData.title}</h2>
                <button
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "f8f8f8",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setModalDisplay("modal hidden")}
                >
                  X
                </button>
              </div>
              <div className="line" />
              <div className="modalContent">
                {ReactHtmlParser(unescape(modalData.body))}
              </div>
              {/* <a
                href="#"
                className="read-more"
                onClick={() => modalToFullscreen()}
              >
                Read more
              </a> */}
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};
export default QuestionView;
