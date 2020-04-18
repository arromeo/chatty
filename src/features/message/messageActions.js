export const ADD_MESSAGE = 'message/add'

export function addMessage(user, message) {
  return { type: ADD_MESSAGE, user, message }
}
