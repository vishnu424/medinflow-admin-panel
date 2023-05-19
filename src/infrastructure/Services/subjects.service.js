import { URL } from "../../utils/Config";
import axios from "axios";

export const addSubjectData = (data) => {
  return axios({
    method: "post",
    url: `${URL}/subject`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: { ...data },
  }).catch((error) => {
    console.log(error);
    throw error;
  });
};

export const getSubjectIdData = (subId) => {
  return axios
    .get(`${URL}/subject/${subId}`, {
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
export const getAllSubjectsData = () => {
  return axios
    .get(`${URL}/subject`, {
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

export const updateSubjectData = (editSubjectId, data) => {
  return axios({
    method: "put",
    url: `${URL}/subject/${editSubjectId}`,
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

export const deleteSubjectData = (subId) => {
  return axios({
    method: "DELETE",
    url: `${URL}/subject/${subId}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
  }).catch((error) => {
    throw error;
  });
};

export const subjectsService = {
  getAllSubjectsData,
  addSubjectData,
  getSubjectIdData,
  updateSubjectData,
  deleteSubjectData,
};
