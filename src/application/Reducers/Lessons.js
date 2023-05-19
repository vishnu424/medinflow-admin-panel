import {
  LESSON_LOADING,
  LOAD_LESSONS,
} from '../Actions/Constants'

const initialState = {
  lesson_data: [],
  isLessonsLoading: true,
  updatedOn: ''
}

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOAD_LESSONS:
      return {
        ...state,
        subjectId: action.payload.subjectId,
        lesson_data: action.payload.data,
        updatedOn: action.payload.updatedOn
      }
    case LESSON_LOADING:
      return {
        ...state,
        isLessonsLoading: action.payload
      }
    default:
      return state
  }
}
