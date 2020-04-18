export const ADD_MESSAGE = 'message/add'

export function addMessage(message) {
  return { type: ADD_MESSAGE, message }
}
