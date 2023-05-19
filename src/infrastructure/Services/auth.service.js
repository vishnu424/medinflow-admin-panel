import axios from "axios";
import localStorageService from "../LocalStorageService";
import { AUTHENTICATED } from "../../application/Actions/Auth";
import { Store } from "../../utils/helpers/Store";

axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  function (error) {
    // console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios({
        method: "post",
        url: `https://api.medinflow.com/api/v1/user/login`,
        data: {
          refresh_token: localStorageService.getRefreshToken(),
          grant_type: "REFRESH_TOKEN",
        },
      }).then((res) => {
        // console.log(res.data.data);
        if (res.status === 200) {
          Store.dispatch({
            type: AUTHENTICATED,
            payload: {
              // token: result.data.refresh_token,
              token: res.data.data.access_token,
              user: res.data.data,
            },
          });
          // 1) put token to LocalStorage
          window.localStorage.setItem(
            "access_token",
            res.data.data.access_token
          );
          window.localStorage.setItem("user", JSON.stringify(res.data.data));

          // 2) Change Authorization header
          axios.defaults.headers.common["x-user-token"] =
            "Bearer " + localStorageService.getAccessToken();

          // 3) return originalRequest object with Axios.
          return axios(originalRequest);
        }
      });
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);
