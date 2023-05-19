import {
  LOAD_SUB_TOPICS,
  LOAD_SUB_TOPIC,
  ADD_SUB_TOPIC,
  EDIT_SUB_TOPIC,
  DELETE_SUB_TOPIC,
  SUB_TOPIC_LOADING,
} from "./Constants";
import { subTopicsService } from "../../infrastructure/Services/subTopics.service";

const getAllSubTopics = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUB_TOPIC_LOADING, payload: true });

      const res = await subTopicsService.getAllSubTopicsData();
      // console.log(res);
      dispatch({
        type: LOAD_SUB_TOPICS,
        payload: {
          data: res,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: SUB_TOPIC_LOADING, payload: false });
      return res.list;
    } catch (error) {
      dispatch({ type: SUB_TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const addSubTopics = (data) => {
  return async (dispatch) => {
    try {
      const res = await subTopicsService.addSubTopicsData(data);
      dispatch(getAllSubTopics());
      return res;
    } catch (error) {
      // dispatch({ type: "CRUD_ERRORS",crud_errors:res });
      console.log(error);
    }
  };
};

const deleteSubTopics = (subTopicId) => {
  return async (dispatch) => {
    try {
      await subTopicsService.deleteSubTopicsData(subTopicId);
      dispatch(getAllSubTopics());
    } catch (error) {
      console.log(error);
    }
  };
};

const getSubTopicById = (subTopicId) => {
  return async (dispatch) => {
    try {
      const res = await subTopicsService.getSubTopicByIdData(subTopicId);
      return res;
    } catch (error) {
      dispatch({ type: SUB_TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const updateSubTopic = (editSubTopicId, data) => {
  return async (dispatch) => {
    try {
      const res = await subTopicsService.updateSubTopicData(
        editSubTopicId,
        data
      );
      dispatch(subTopicsActions.getAllSubTopics());
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export const subTopicsActions = {
  getAllSubTopics,
  deleteSubTopics,
  getSubTopicById,
  updateSubTopic,
  addSubTopics,
};
