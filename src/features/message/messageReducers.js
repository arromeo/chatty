import { ADD_MESSAGE } from './messageActions'

export function messageRootReducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.concat(action.message)
    default:
      return state
  }
}
