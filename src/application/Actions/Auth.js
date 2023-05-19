export const AUTHENTICATED = 'AUTHENTICATED'
export const UNAUTHENTICATED = 'UNAUTHENTICATED'
export const REMOVE_ERROR = 'REMOVE_ERROR'
export const LOADING_LOGIN = 'LOADING_LOGIN'
export const CRUD_ERRORS = 'CRUD_ERRORS'

const signOutAction = history => {
  return async dispatch => {
    try {
      window.localStorage.clear('user')
      dispatch({ type: UNAUTHENTICATED })
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
}

export const authActions = {
  signOutAction
}