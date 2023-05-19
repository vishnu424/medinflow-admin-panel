import { DOCTORS_LOADING, LOAD_DOCTORS } from "./Constants";
import { subjectsService, doctorService } from "../../infrastructure/Services";

const addDoctors = (data) => {
  return async (dispatch) => {
    try {
      const res = await doctorService.addDoctorsData(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

const getDoctorById = (doctorId) => {
  return async (dispatch) => {
    try {
      const res = await doctorService.getDoctorsByIdData(doctorId);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllDoctors = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: DOCTORS_LOADING, payload: true });

      const res = await doctorService.getAllDoctorsData();
      // console.log(res.data);
      dispatch({
        type: LOAD_DOCTORS,
        payload: {
          data: res,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: DOCTORS_LOADING, payload: false });
      return res.list;
    } catch (error) {
      dispatch({ type: DOCTORS_LOADING, payload: true });
      console.log(error);
    }
  };
};

const updateDoctors = (editDoctorsId, data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DOCTORS_LOADING, payload: true });
      const res = await doctorService.updateDoctorsData(editDoctorsId, data);
      dispatch({ type: DOCTORS_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: DOCTORS_LOADING, payload: true });
      console.log(error);
    }
  };
};

const deleteDoctors = (doctorId) => {
  return async (dispatch) => {
    try {
      await doctorService.deleteDoctorsData(doctorId);
      //   dispatch(getAllSubjects());
    } catch (error) {
      console.log(error);
    }
  };
};

export const doctorActions = {
  getDoctorById,
  getAllDoctors,
  addDoctors,
  updateDoctors,
  deleteDoctors,
};
