import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MessageListContainer = styled.div`
  flex: 1 1 auto;
`

// Components
import { Message } from './Message'

export function MessageList({ messages }) {
  return (
    <MessageListContainer>
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </MessageListContainer>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(Message.propTypes)
}
