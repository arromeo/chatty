import { CHANGE_USERNAME } from './chatActions'

const intialState = {
  currentUsername: 'Anon'
}

export function chatRootReducer(state = intialState, action = {}) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        currentUsername: action.newUsername
      }
    default:
      return state
  }
}
