import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Message } from './Message'

export function MessageList({ messages }) {
  return (
    <main className="message-list">
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </main>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(Message.propTypes)
}
