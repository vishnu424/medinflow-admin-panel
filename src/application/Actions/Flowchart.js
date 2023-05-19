import { subjectUUID } from "../../utils/Config";

import {
  LOAD_MCQS,
  MCQS_LOADING,
  LOAD_FLOWCHART,
  FLOWCHART_LOADING,
} from "./Constants";
import { flowchartService } from "../../infrastructure/Services";

// const getMcqsbySubjectsId = subid => {
//   return async dispatch => {
//     try {
//       dispatch({ type: MCQS_LOADING, payload: true })

//       const res = await flowchartService.getMcqsbySubjectsIdData(subid)

//       dispatch({
//         type: LOAD_MCQS,
//         payload: {
//           data: res,
//           subjectId: subid,
//           updatedOn: Date.now()
//         }
//       })

//       dispatch({ type: MCQS_LOADING, payload: false })
//     } catch (error) {
//       dispatch({ type: MCQS_LOADING, payload: true })
//       console.log(error)
//     }
//   }
// }

const getAllFlowchart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FLOWCHART_LOADING, payload: true });

      const res = await flowchartService.getAllFlowchartData();

      dispatch({
        type: LOAD_FLOWCHART,
        payload: {
          data: res,
          updatedOn: Date.now(),
        },
      });

      dispatch({ type: FLOWCHART_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: FLOWCHART_LOADING, payload: true });
      console.log(error);
    }
  };
};

const getFlowchart = (flowchartId) => {
  return async (dispatch) => {
    try {
      const res = await flowchartService.getFlowchartData(flowchartId);
      dispatch({ type: FLOWCHART_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: FLOWCHART_LOADING, payload: true });
      console.log(error);
    }
  };
};

// const updateFlowchartBySubject = (subId) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: FLOWCHART_LOADING, payload: true });

//       const res = await flowchartService.updateFlowchartBySubjectData(subId);

//       dispatch({
//         type: LOAD_FLOWCHART,
//         payload: {
//           data: res,
//           subjectId: subId,
//           updatedOn: Date.now(),
//         },
//       });
//       dispatch({ type: FLOWCHART_LOADING, payload: false });
//     } catch (error) {
//       dispatch({ type: FLOWCHART_LOADING, payload: true });
//       console.log(error);
//     }
//   };
// };

const deleteFlowchart = (data) => {
  return async (dispatch) => {
    try {
      await flowchartService.deleteFlowchartData(data);
    } catch (error) {
      console.log(error);
      return Promise.reject;
    }
  };
};

const addFlowchart = (data) => {
  return async (dispatch) => {
    try {
      let res = await flowchartService.addFlowchartData(data);
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      // dispatch({ type: "CRUD_ERRORS",crud_errors:res });
      return error;
    }
  };
};

// const getKeyById = (keyId) => {
//   return async (dispatch) => {
//     try {
//       const res = await flowchartService.getKeyByIdData(keyId);
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

const updateFlowchart = (selectedFlowchartId, data) => {
  return async (dispatch) => {
    try {
      const res = await flowchartService.updateFlowchartData(
        selectedFlowchartId,
        data
      );
      // console.log(res);
      await dispatch(getAllFlowchart());
      return res;
    } catch (error) {
      // dispatch({ type: FLOWCHART_LOADING, payload: true });
      console.log(error);
    }
  };
};

// const getFlowchartByContentId = (contentId) => {
//   return async (dispatch) => {
//     try {
//       const res = await flowchartService.getFlowchartByContentIdData(contentId);
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const flowchartActions = {
  // getMcqsbySubjectsId,
  getAllFlowchart,
  getFlowchart,
  // updateFlowchartBySubject,
  deleteFlowchart,
  addFlowchart,
  // getKeyById,
  updateFlowchart,
  // getFlowchartByContentId,
};
