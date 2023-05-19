import { URL } from "../../utils/Config";
import axios from "axios";

const addFlowchartData = (data) => {
  return axios({
    method: "POST",
    url: `${URL}/flow-chart`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: { ...data },
  })
    .then((res) => {
      return res.data.status;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const getAllFlowchartData = () => {
  return axios
    .get(`${URL}/flow-chart`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      // console.log(res.data.data.list);
      return res.data.data.list;
    })
    .catch((error) => {
      throw error;
    });
};

// const getMcqsbySubjectsIdData = (subid) => {
//   return axios
//     .get(`${URL}/mcqs/subjects/${subid}`, {
//       headers: {
//         Authorization: "Bearer " + window.localStorage.getItem("user"),
//       },
//     })
//     .then((res) => {
//       return res.data.success.payload;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

const getFlowchartData = (flowchartId) => {
  return axios
    .get(`${URL}/flow-chart/${flowchartId}`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

// const updateFlowchartBySubject = (subId) => {
//   return axios
//     .get(`${URL}/Flowchart/subjects/${subId}`, {
//       headers: {
//         Authorization: "Bearer " + window.localStorage.getItem("user"),
//       },
//     })
//     .then((res) => {
//       return res.data.success.payload;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

const deleteFlowchartData = (data) => {
  return axios({
    method: "DELETE",
    url: `${URL}/flow-chart/${data}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
  })
    .then(() => {
      return Promise.resolve;
    })
    .catch((error) => {
      throw error;
    });
};

// const getKeyByIdData = (keyId) => {
//   return axios
//     .get(`${URL}/Flowchart/${keyId}`, {
//       headers: {
//         Authorization: "Bearer " + window.localStorage.getItem("user"),
//       },
//     })
//     .then((res) => {
//       return res.data.success.payload;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

const updateFlowchartData = (selectedFlowchartId, data) => {
  return axios({
    method: "PUT",
    url: `${URL}/flow-chart/${selectedFlowchartId}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: { ...data },
  })
    .then((res) => {
      // console.log(res.data);
      return res.data.status;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

// const getFlowchartByContentIdData = (contentId) => {
//   return axios
//     .get(`${URL}/Flowchart/${contentId}`, {
//       headers: {
//         Authorization: "Bearer " + window.localStorage.getItem("user"),
//       },
//     })
//     .then((res) => {
//       return res.data.success.payload;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

export const flowchartService = {
  // getMcqsbySubjectsIdData,
  getAllFlowchartData,
  getFlowchartData,
  // updateFlowchartBySubject,
  deleteFlowchartData,
  addFlowchartData,
  // getKeyByIdData,
  updateFlowchartData,
  // getFlowchartByContentIdData,
};
