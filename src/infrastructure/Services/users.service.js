import { URL } from "../../utils/Config";
import axios from "axios";

const getAllUsersData = () => {
  return axios
    .get(`${URL}/users`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("user"),
      },
    })
    .then((res) => {
      return res.data.success;
    })
    .catch((error) => {
      throw error;
    });
};

const getUserByIdData = (userId) => {
  return axios
    .get(`${URL}/users/${userId}`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("user"),
      },
    })
    .then((res) => {
      return res.data.success.payload;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateUserProfileData = (userId, data) => {
  return axios({
    method: "post",
    url: `${URL}/user/update-profile`,
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("user"),
      user_id: userId,
    },
    data: { ...data },
  })
    .then((res) => {
      return res.data.success.payload[0];
    })
    .catch((error) => {
      throw error;
    });
};

export const usersService = {
  getAllUsersData,
  getUserByIdData,
  updateUserProfileData,
};
