import { LOAD_SUBJECTS, SET_SUBJECTS_LOADING } from "../Actions/Constants";

const initialState = {
  data: [],
  isDataLoading: true,
  updatedOn: "",
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOAD_SUBJECTS:
      // console.log(action.payload.data);
      return {
        ...state,
        data: action.payload.data.list,
        updatedOn: action.payload.updatedOn,
      };
    case SET_SUBJECTS_LOADING:
      return {
        ...state,
        isDataLoading: action.payload,
      };

    default:
      return state;
  }
};
