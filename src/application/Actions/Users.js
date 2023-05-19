import { LOAD_USERS, SET_USERS_LOADING } from "./Constants";
import { usersService } from "../../infrastructure/Services/users.service";

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_USERS_LOADING, payload: true });
      const res = await usersService.getAllUsersData();
      dispatch({
        type: LOAD_USERS,
        payload: res.payload,
        userCount: res.userCount,
        updatedOn: Date.now(),
      });
      dispatch({ type: SET_USERS_LOADING, payload: false });
      return res.payload;
    } catch (error) {
      dispatch({ type: SET_USERS_LOADING, payload: true });
      console.log(error);
    }
  };
};

export const getUserById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await usersService.getUserByIdData(userId);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

const updateUserProfile = (userId, data) => {
  return async (dispatch) => {
    try {
      const res = await usersService.updateUserProfileData(userId, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export const usersActions = {
  getAllUsers,
  getUserById,
  updateUserProfile,
};
