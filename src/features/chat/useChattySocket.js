// Hooks
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../common'

// Actions
import { addMessage } from '../message'

// Selectors
import { selectCurrentUsername } from './chatSelectors'

const WS_SERVER_URL = 'ws:localhost:3001'

const messageType = {
  USER_MESSAGE: 'postMessage',
  CHANGE_USER: 'postNotification'
}

export function useChattySocket() {
  const dispatch = useDispatch()
  const currentUsername = useSelector(selectCurrentUsername)
  const onMessage = (event) => dispatch(addMessage(JSON.parse(event.data)))
  const { send, close } = useSocket(WS_SERVER_URL, onMessage)

  useEffect(() => {
    return () => close()
  }, [])

  const sendUserMessage = (messageContent) => {
    const message = {
      type: messageType.USER_MESSAGE,
      username: currentUsername,
      content: messageContent
    }
    send(message)
  }

  const sendUsernameChangeMessage = (newUsername) => {
    const message = {
      type: messageType.CHANGE_USER,
      username: currentUsername,
      content: `${currentUsername} changed their name to ${newUsername}`
    }
    send(message)
  }

  return { sendUserMessage, sendUsernameChangeMessage }
}
