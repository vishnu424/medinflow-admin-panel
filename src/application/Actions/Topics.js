import {
  LOAD_TOPICS,
  LOAD_TOPIC,
  ADD_TOPIC,
  EDIT_TOPIC,
  DELETE_TOPIC,
  TOPIC_LOADING,
} from "./Constants";
import { topicsService } from "../../infrastructure/Services";

const getTopics = (subid) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOPIC_LOADING, payload: true });
      const res = await topicsService.getTopicsData(subid);

      dispatch({
        type: LOAD_TOPICS,
        payload: {
          data: res,
          subjectId: subid,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: TOPIC_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getTopicsBySubId = (subid) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOPIC_LOADING, payload: true });

      const res = await topicsService.getTopicsBySubIdData(subid);

      dispatch({
        type: LOAD_TOPICS,
        payload: {
          data: res,
          subjectId: subid,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: TOPIC_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getAllTopics = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOPIC_LOADING, payload: true });

      const res = await topicsService.getAllTopicsData();
      dispatch({
        type: LOAD_TOPICS,
        payload: {
          data: res,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: TOPIC_LOADING, payload: false });
      return res.list;
    } catch (error) {
      dispatch({ type: TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getTopicsBySubjectId = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOPIC_LOADING, payload: true });

      const res = await topicsService.getTopicsBySubjectIdData(id);
      // console.log(res);
      dispatch({
        type: LOAD_TOPICS,
        payload: {
          data: res,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: TOPIC_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const updateTopics = (subid) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOPIC_LOADING, payload: true });
      const res = await topicsService.updateTopicsData(subid);
      dispatch({
        type: LOAD_TOPICS,
        payload: {
          data: res,
          subjectId: subid,
          updatedOn: Date.now(),
        },
      });
      dispatch({ type: TOPIC_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const addTopics = (data) => {
  return async (dispatch) => {
    try {
      const res = await topicsService.addTopicsData(data);
      dispatch(getAllTopics());
      return res;
    } catch (error) {
      // dispatch({ type: "CRUD_ERRORS",crud_errors:res });
      console.log(error);
    }
  };
};

const deleteTopics = (topicId) => {
  return async (dispatch) => {
    try {
      await topicsService.deleteTopicsData(topicId);
      dispatch(getAllTopics());
    } catch (error) {
      console.log(error);
    }
  };
};

const getTopicById = (topicId) => {
  return async (dispatch) => {
    try {
      const res = await topicsService.getTopicByIdData(topicId);
      return res;
    } catch (error) {
      dispatch({ type: TOPIC_LOADING, payload: true });
      console.log(error);
    }
  };
};

const updateTopic = (editTopicId, data) => {
  return async (dispatch) => {
    try {
      const res = await topicsService.updateTopicData(editTopicId, data);
      dispatch(topicsActions.getAllTopics());
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export const topicsActions = {
  getTopics,
  getTopicsBySubId,
  getAllTopics,
  getTopicsBySubjectId,
  updateTopics,
  addTopics,
  deleteTopics,
  getTopicById,
  updateTopic,
};
