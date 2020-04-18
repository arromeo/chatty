import { combineReducers } from 'redux'

// Reducers
import { messageRootReducer } from './features/message'

export const rootReducer = combineReducers({
  messages: messageRootReducer
})
