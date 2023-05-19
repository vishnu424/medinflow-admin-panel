import React, { useState } from "react";
import "./MobilePreview.css";
import ReactHtmlParser from "html-react-parser";
import Chart from "../Chart/Chart";

const MobilePreview = ({
  content,
  flowchartDataContent,
  loadModal,
  loadCiteModal,
  modalDisplay,
  modalData,
  modalToFullscreen,
  setModalDisplay,
}) => {
  const [darkModeStatus, setDarkModeStatus] = useState(false);
  let dark_mode = darkModeStatus ? "content dark" : "content";
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label style={{ marginBottom: "20px" }}>
        <input
          className="toggle-checkbox"
          type="checkbox"
          checked={darkModeStatus}
          onChange={() => setDarkModeStatus(!darkModeStatus)}
        />
        <div className="toggle-slot">
          <div className="sun-icon-wrapper">
            <div
              className="iconify sun-icon"
              data-icon="feather-sun"
              data-inline="false"
            />
          </div>
          <div className="toggle-button" />
          <div className="moon-icon-wrapper">
            <div
              className="iconify moon-icon"
              data-icon="feather-moon"
              data-inline="false"
            />
          </div>
        </div>
      </label>

      <div className="smartphone">
        <div className={dark_mode}>
          <p onClick={loadCiteModal}>{ReactHtmlParser(unescape(content))}</p>
          {flowchartDataContent && (
            <Chart
              data={flowchartDataContent}
              clickNode={loadModal}
              chartZoom={"65%"}
            />
          )}
          {modalData && (
            <div
              className={modalDisplay}
              style={{ width: "100%", height: "90%" }}
            >
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
          )}
        </div>
      </div>
    </div>
  );
};
export default MobilePreview;
