import { URL } from "../../utils/Config";
import axios from "axios";

const addInstructorsData = (data) => {
  return axios({
    method: "post",
    url: `${URL}/doctor`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: { ...data },
  }).catch((error) => {
    throw error;
  });
};

const deleteInstructorsData = (data) => {
  return axios({
    method: "DELETE",
    url: `${URL}/doctor/${data}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
  }).catch((error) => {
    throw error;
  });
};

const getInstructorsData = () => {
  return axios
    .get(`${URL}/doctor`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data.data.list;
    })
    .catch((error) => {
      throw error;
    });
};

const getInstructorsByIdData = () => {
  return axios
    .get(`${URL}/doctor`, {
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
const getInstructorData = (instructorId) => {
  return axios
    .get(`${URL}/doctor/${instructorId}`, {
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

const updateInstructorsData = (editInstructorsId, data) => {
  return axios({
    method: "put",
    url: `${URL}/instructor/${editInstructorsId}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: { ...data },
  }).catch((error) => {
    throw error;
  });
};

export const instructorService = {
  addInstructorsData,
  deleteInstructorsData,
  getInstructorsData,
  getInstructorsByIdData,
  updateInstructorsData,
  getInstructorData,
};
