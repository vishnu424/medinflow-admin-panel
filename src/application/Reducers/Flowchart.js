import { FLOWCHART_LOADING, LOAD_FLOWCHART } from "../Actions/Constants";

const initialState = {
  flowchart_data: [],
  isFlowchartLoading: true,
  updatedOn: "",
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case FLOWCHART_LOADING:
      return {
        ...state,
        isFlowchartLoading: action.payload,
      };
    case LOAD_FLOWCHART:
      return {
        ...state,
        subjectId: action.payload.subjectId,
        flowchart_data: action.payload.data,
        updatedOn: action.payload.updatedOn,
      };
    default:
      return state;
  }
};
