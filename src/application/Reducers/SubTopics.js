import {
  SUB_TOPIC_LOADING,
  ADD_TOPIC,
  DELETE_TOPIC,
  LOAD_SUB_TOPICS,
} from "./../Actions/Constants";

const initialState = {
  sub_topic_data: [],
  isSubTopicsLoading: true,
  updatedOn: "",
  subjectId: "",
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOAD_SUB_TOPICS:
      return {
        ...state,
        subjectId: action.payload.subjectId,
        sub_topic_data: action.payload.data.list,
        updatedOn: action.payload.updatedOn,
      };
    case SUB_TOPIC_LOADING:
      return {
        ...state,
        isSubTopicsLoading: action.payload,
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
