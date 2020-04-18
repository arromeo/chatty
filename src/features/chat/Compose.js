import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ComposeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0.5rem;
  flex: 0 1 auto;
  background: #0b2545;
  border-top: 1px solid black;
  padding: 0.25rem 0.5rem;
`

const UsernameField = styled.input``
const MessageField = styled.input``

export function Compose({ newMessage, onUserChange, changeName, currentUser }) {
  const handleUsernameFieldBlur = (event) => onUserChange(event)

  const handleUsernameKeyPress = (event) => {
    if (event.key === 'Enter') {
      onUserChange(event)
    }
  }

  const handleComposeKeypress = (event) => {
    if (event.key === 'Enter') {
      newMessage(event)
      event.target.value = ''
    }
  }

  const handleNameChange = (event) => changeName(event)

  return (
    <ComposeContainer>
      <UsernameField
        onChange={handleNameChange}
        onBlur={handleUsernameFieldBlur}
        onKeyPress={handleUsernameKeyPress}
        value={currentUser}
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
