import { combineReducers } from 'redux'

// Reducers
import { messageRootReducer } from './features/message'
import { chatRootReducer } from './features/chat'

export const rootReducer = combineReducers({
  chat: chatRootReducer,
  messages: messageRootReducer
})
