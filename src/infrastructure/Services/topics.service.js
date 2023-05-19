import { URL } from "../../utils/Config";
import axios from "axios";

export const getTopicsData = (subid) => {
  return axios
    .get(`${URL}/topics/subjects/${subid}`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data.success.payload;
    })
    .catch((error) => {
      throw error;
    });
};

export const getTopicsBySubIdData = (subid) => {
  return axios
    .get(`${URL}/topics/subjects/${subid}`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data.success.payload;
    })
    .catch((error) => {
      throw error;
    });
};

export const getAllTopicsData = () => {
  return axios
    .get(`${URL}/topic`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getTopicsBySubjectIdData = (id) => {
  return axios
    .get(`${URL}/topics/subjects/${id}`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data.success.payload;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateTopicsData = (subid) => {
  return axios
    .get(`${URL}/topics/subjects/${subid}`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data.success.payload;
    })
    .catch((error) => {
      throw error;
    });
};

export const addTopicsData = (data) => {
  return axios({
    method: "post",
    url: `${URL}/topic`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: { ...data },
  }).catch((error) => {
    throw error;
  });
};

export const deleteTopicsData = (topicId) => {
  return axios({
    method: "DELETE",
    url: `${URL}/topic/${topicId}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
  }).catch((error) => {
    throw error;
  });
};

export const getTopicByIdData = (topicId) => {
  return axios
    .get(`${URL}/topic/${topicId}`, {
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

export const updateTopicData = (editTopicId, data) => {
  return axios({
    method: "put",
    url: `${URL}/topic/${editTopicId}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
    data: { ...data },
  })
    .then((res) => {
      // console.log(res.data);
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const topicsService = {
  getTopicsData,
  getTopicsBySubIdData,
  getAllTopicsData,
  getTopicsBySubjectIdData,
  updateTopicsData,
  addTopicsData,
  deleteTopicsData,
  getTopicByIdData,
  updateTopicData,
};
