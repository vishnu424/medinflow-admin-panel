import {
  LOAD_SUBJECTS,
  SET_SUBJECTS_LOADING,
  LOAD_SUBJECT_DATA,
} from "./Constants";
import { subjectsService } from "../../infrastructure/Services";

const addSubject = (data) => {
  return async (dispatch) => {
    try {
      const res = await subjectsService.addSubjectData(data);
      dispatch(getAllSubjects());
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

const getSubjectId = (subId) => {
  return async (dispatch) => {
    try {
      const res = await subjectsService.getSubjectIdData(subId);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllSubjects = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_SUBJECTS_LOADING, payload: true });

      const res = await subjectsService.getAllSubjectsData();
      // console.log(res.data);
      dispatch({
        type: LOAD_SUBJECTS,
        payload: {
          data: res,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: SET_SUBJECTS_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: SET_SUBJECTS_LOADING, payload: true });
      console.log(error);
    }
  };
};

const updateSubject = (subid, data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_SUBJECTS_LOADING, payload: true });
      const res = await subjectsService.updateSubjectData(subid, data);
      dispatch({ type: SET_SUBJECTS_LOADING, payload: false });
      return res;
    } catch (error) {
      // dispatch({ type: SET_SUBJECTS_LOADING, payload: true });
      console.log(error);
    }
  };
};

const deleteSubject = (subId) => {
  return async (dispatch) => {
    try {
      await subjectsService.deleteSubjectData(subId);
      dispatch(getAllSubjects());
    } catch (error) {
      console.log(error);
    }
  };
};

export const subjectsActions = {
  getSubjectId,
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
};
