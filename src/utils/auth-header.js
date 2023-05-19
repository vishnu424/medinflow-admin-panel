export function authHeader () {
  // return authorization header with jwt token
  const token = window.localStorage.getItem('user')

  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  } else {
    return {}
  }
}
