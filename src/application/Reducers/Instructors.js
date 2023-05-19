import {
  INSTRUCTORS_LOADING,
  LOAD_INTRUCTORS
} from './../Actions/Constants'

const initialState = {
  instructors_data: [],
  isInstructorsLoading: true,
  updatedOn: ''
}

export default (state = { ...initialState }, action) => {
  
  switch (action.type) {
    case LOAD_INTRUCTORS:
      return {
        ...state,
        instructors_data: action.payload.data,
        updatedOn: action.payload.updatedOn
      }
    case INSTRUCTORS_LOADING:
      return {
        ...state,
        isInstructorsLoading: action.payload
      }
    default:
      return state
  }
}
