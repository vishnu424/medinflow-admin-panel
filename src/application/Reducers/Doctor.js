import { DOCTORS_LOADING, LOAD_DOCTORS } from "../Actions/Constants";

const initialState = {
  doctors_data: [],
  isDoctorsLoading: true,
  updatedOn: "",
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOAD_DOCTORS:
      // console.log(action.payload.data);
      return {
        ...state,
        doctors_data: action.payload.data.list,
      };
    case DOCTORS_LOADING:
      return {
        ...state,
        isDoctorsLoading: action.payload,
      };

    default:
      return state;
  }
};
