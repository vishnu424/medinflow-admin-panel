import { lessonsService } from "../../infrastructure/Services/lessons.service";
import { LOAD_LESSONS, ADD_LESSON, LESSON_LOADING } from "./Constants";

const deleteLessons = (data) => {
  return async (dispatch) => {
    try {
      await lessonsService.deleteLessonsData(data);
      await dispatch(getAllLessons());
    } catch (error) {
      console.log(error);
    }
  };
};

const addLessons = (data) => {
  return async (dispatch) => {
    try {
      let res = await lessonsService.addLessonsData(data);
      dispatch(getAllLessons());
      return res;
    } catch (error) {
      console.log(error);
      // dispatch({ type: "CRUD_ERRORS",crud_errors:res });
      return error;
    }
  };
};

const getAllLessons = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LESSON_LOADING, payload: true });

      const res = await lessonsService.getAllLessonsData();

      dispatch({
        type: LOAD_LESSONS,
        payload: {
          data: res,
          subjectId: "",
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: LESSON_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: LESSON_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getLessonsBySubjectId = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LESSON_LOADING, payload: true });

      const res = await lessonsService.getLessonsBySubjectIdData(id);

      dispatch({
        type: LOAD_LESSONS,
        payload: {
          data: res,
          subjectId: "",
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: LESSON_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: LESSON_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getLessonsByTopicId = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LESSON_LOADING, payload: true });

      const res = await lessonsService.getLessonsByTopicIdData(id);

      dispatch({
        type: LOAD_LESSONS,
        payload: {
          data: res,
          subjectId: "",
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: LESSON_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: LESSON_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getLessonById = (lessonId) => {
  return async (dispatch) => {
    try {
      const res = await lessonsService.getLessonByIdData(lessonId);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

const updateLessons = (selectedLesson, data) => {
  return async (dispatch) => {
    try {
      const res = await lessonsService.updateLessonsData(selectedLesson, data);
      await dispatch(getAllLessons());
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export const lessonsActions = {
  deleteLessons,
  addLessons,
  getAllLessons,
  getLessonsBySubjectId,
  getLessonsByTopicId,
  getLessonById,
  updateLessons,
};
