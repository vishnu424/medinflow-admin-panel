import { LOAD_INTRUCTORS, INSTRUCTORS_LOADING } from "./Constants";
import { instructorService } from "../../infrastructure/Services/instructor.service";

const addInstructors = (data) => {
  return async (dispatch) => {
    try {
      await instructorService.addInstructorsData(data);
      await dispatch(getInstructors());
      return Promise.resolve;
    } catch (error) {
      console.log(error);
      return Promise.reject;
    }
  };
};

const deleteInstructors = (data) => {
  return async (dispatch) => {
    try {
      await instructorService.deleteInstructorsData(data);
      await dispatch(getInstructors());
      return Promise.resolve;
    } catch (error) {
      console.log(error);
      return Promise.reject;
    }
  };
};

const getInstructors = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: INSTRUCTORS_LOADING, payload: true });

      const res = await instructorService.getInstructorsData();
      // console.log(res)
      dispatch({
        type: LOAD_INTRUCTORS,
        payload: {
          data: res,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: INSTRUCTORS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: INSTRUCTORS_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getInstructorsById = (subId) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: INSTRUCTORS_LOADING, payload: true });

      const res = await instructorService.getInstructorsByIdData();

      const filteredInstructors = await res.filter((inst) => {
        if (inst.subjectId === subId) {
          return inst;
        }
      });

      dispatch({
        type: LOAD_INTRUCTORS,
        payload: {
          data: filteredInstructors,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: INSTRUCTORS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: INSTRUCTORS_LOADING, payload: true });
      console.log(error);
    }
  };
};

const updateInstructors = (editInstructorsId, data) => {
  return async (dispatch) => {
    try {
      const res = await instructorService.updateInstructorsData(
        editInstructorsId,
        data
      );
      // console.log(res);
      await dispatch(getInstructors());
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

const getInstructor = (instructorId) => {
  return async (dispatch) => {
    try {
      const res = await instructorService.getInstructorData(instructorId);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export const instructorsActions = {
  addInstructors,
  deleteInstructors,
  getInstructors,
  getInstructorsById,
  updateInstructors,
  getInstructor,
};
