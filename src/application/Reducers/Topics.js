import {
  TOPIC_LOADING,
  ADD_TOPIC,
  DELETE_TOPIC,
  LOAD_TOPICS,
} from "./../Actions/Constants";

const initialState = {
  topic_data: [],
  isTopicsLoading: true,
  updatedOn: "",
  subjectId: "",
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOAD_TOPICS:
      return {
        ...state,
        subjectId: action.payload.subjectId,
        topic_data: action.payload.data.list,
        updatedOn: action.payload.updatedOn,
      };
    case TOPIC_LOADING:
      return {
        ...state,
        isTopicsLoading: action.payload,
      };
    case ADD_TOPIC:
      return {
        ...state,
      };
    case DELETE_TOPIC:
      return {
        ...state,
      };
    default:
      return state;
  }
};
