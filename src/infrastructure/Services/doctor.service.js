import { URL } from "../../utils/Config";
import axios from "axios";

export const addDoctorsData = (data) => {
  return axios({
    method: "post",
    url: `${URL}/doctor`,
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
      throw error;
    });
};

export const getDoctorsByIdData = (doctorId) => {
  return axios
    .get(`${URL}/doctor/${doctorId}`, {
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

export const getAllDoctorsData = () => {
  return axios
    .get(`${URL}/doctor`, {
      headers: {
        "x-user-token": window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const updateDoctorsData = (editDoctorsId, data) => {
  return axios({
    method: "put",
    url: `${URL}/doctor/${editDoctorsId}`,
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

export const deleteDoctorsData = (doctorId) => {
  return axios({
    method: "DELETE",
    url: `${URL}/doctor/${doctorId}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
  }).catch((error) => {
    throw error;
  });
};

export const doctorService = {
  getAllDoctorsData,
  addDoctorsData,
  getDoctorsByIdData,
  updateDoctorsData,
  deleteDoctorsData,
};
