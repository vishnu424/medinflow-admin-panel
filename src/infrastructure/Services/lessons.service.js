import { URL } from "../../utils/Config";
import axios from "axios";

export const deleteLessonsData = (data) => {
  return axios({
    method: "DELETE",
    url: `${URL}/lessons/${data}`,
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("user"),
    },
  }).catch((error) => {
    throw error;
  });
};

export const addLessonsData = (data) => {
  return axios({
    method: "POST",
    url: `${URL}/lessons`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
    data: { ...data },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      // console.log(error)
      throw error;
    });
};

export const getAllLessonsData = () => {
  return axios
    .get(`${URL}/lessons`, {
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

export const getLessonsBySubjectIdData = (id) => {
  return axios
    .get(`${URL}/lessons/subjects/${id}`, {
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

export const getLessonsByTopicIdData = (id) => {
  return axios
    .get(`${URL}/lessons/topics/${id}`, {
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

export const getLessonByIdData = (lessonId) => {
  return axios
    .get(`${URL}/lessons/${lessonId}`, {
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

export const updateLessonsData = (selectedLesson, data) => {
  return axios({
    method: "put",
    url: `${URL}/lessons/${selectedLesson}`,
    headers: {
      "x-user-token": window.localStorage.getItem("access_token"),
    },
    data: { ...data },
  })
    .then((res) => {
      return res.data.success.payload;
    })
    .catch((error) => {
      throw error;
    });
};

export const lessonsService = {
  deleteLessonsData,
  addLessonsData,
  getAllLessonsData,
  getLessonsBySubjectIdData,
  getLessonsByTopicIdData,
  getLessonByIdData,
  updateLessonsData,
};
