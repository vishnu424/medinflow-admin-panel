import { LOAD_USERS, SET_USERS_LOADING } from '../Actions/Constants'

const initialState = {
  user_data: [],
  userCount: 0,
  isUserDataLoading: true,
  updatedOn: ''
}

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_USERS_LOADING:
      return {
        ...state,
        isUserDataLoading: action.payload
      }
    case LOAD_USERS:
      return {
        ...state,
        user_data: action.payload,
        userCount: action.userCount,
        updatedOn: action.payload.updatedOn
      }
    default:
      return state
  }
}
