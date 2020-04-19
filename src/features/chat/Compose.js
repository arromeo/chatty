import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

// Actions
import { changeUsername } from './chatActions'

// Hooks
import { useChattySocket } from './useChattySocket'
import { selectCurrentUsername } from './chatSelectors'

const ComposeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0.5rem;
  flex: 0 1 auto;
  background: #0b2545;
  border-top: 1px solid black;
  padding: 0.25rem 0.5rem;
`

const UsernameField = styled.input`
  padding: 4px;
`
const MessageField = styled.input`
  padding: 4px;
`

export function Compose() {
  const dispatch = useDispatch()
  const { sendUserMessage, sendUsernameChangeMessage } = useChattySocket()
  const currentUsername = useSelector(selectCurrentUsername)
  const [usernameFieldValue, setUsernameFieldValue] = useState(
    () => currentUsername
  )

  const handleUsernameFieldChange = (event) =>
    setUsernameFieldValue(event.target.value)

  const handleUsernameFieldSubmit = () => {
    if (currentUsername !== usernameFieldValue) {
      sendUsernameChangeMessage(usernameFieldValue)
      dispatch(changeUsername(usernameFieldValue))
    }
  }

  const handleUsernameFieldBlur = () => handleUsernameFieldSubmit()

  const handleUsernameKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUsernameFieldSubmit()
    }
  }

  const handleComposeKeypress = (event) => {
    if (event.key === 'Enter') {
      sendUserMessage(event.target.value)
      event.target.value = ''
    }
  }

  return (
    <ComposeContainer>
      <UsernameField
        onChange={handleUsernameFieldChange}
        onBlur={handleUsernameFieldBlur}
        onKeyPress={handleUsernameKeyPress}
        value={usernameFieldValue}
      />
      <MessageField onKeyPress={handleComposeKeypress} />
    </ComposeContainer>
  )
}

Compose.propTypes = {
  newMessage: PropTypes.func,
  onUserChange: PropTypes.func,
  changeName: PropTypes.func,
  currentUser: PropTypes.shape({
    name: PropTypes.string
  })
}
