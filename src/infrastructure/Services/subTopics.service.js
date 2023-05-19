import { URL } from "../../utils/Config";
import axios from "axios";

export const getAllSubTopicsData = () => {
  return axios
    .get(`${URL}/sub-topic`, {
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

export const addSubTopicsData = (data) => {
  return axios({
    method: "post",
    url: `${URL}/sub-topic`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: { ...data },
  }).catch((error) => {
    throw error;
  });
};

export const deleteSubTopicsData = (subTopicId) => {
  return axios({
    method: "DELETE",
    url: `${URL}/sub-topic/${subTopicId}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
  }).catch((error) => {
    throw error;
  });
};

export const getSubTopicByIdData = (subTopicId) => {
  return axios
    .get(`${URL}/sub-topic/${subTopicId}`, {
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

export const updateSubTopicData = (editSubTopicId, data) => {
  return axios({
    method: "put",
    url: `${URL}/sub-topic/${editSubTopicId}`,
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

export const subTopicsService = {
  getAllSubTopicsData,
  deleteSubTopicsData,
  getSubTopicByIdData,
  updateSubTopicData,
  addSubTopicsData,
};
