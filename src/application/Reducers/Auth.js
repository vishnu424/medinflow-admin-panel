import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  REMOVE_ERROR,
  LOADING_LOGIN,
  CRUD_ERRORS,
} from "../Actions/Auth";

const initialState = {
  authenticated: false,
  role: "",
  loading: false,
  token: "",
  crud_errors: "",
  user: {},
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        role: "admin",
      };
    case UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        token: "",
        role: "",
      };
    case LOADING_LOGIN:
      return { ...state, loading: action.payload };
    case REMOVE_ERROR:
      return { ...state, error: "" };
    case CRUD_ERRORS:
      return { ...state, crud_errors: action.payload.crud_errors };
    default:
      return state;
  }
};
