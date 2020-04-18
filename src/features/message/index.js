const ADD_MESSAGE = 'message/adds'

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ADD_MESSAGE:
      return state
    default:
      return state
  }
}

export function addMessage(user, message) {
  return { type: ADD_MESSAGE, user, message }
}
