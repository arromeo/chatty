import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

// Selectors
import { selectMessages } from '../message'

const MessageListContainer = styled.div`
  flex: 1 1 auto;
`

// Components
import { Message } from './Message'

function MessageList({ messages }) {
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

const mapStateToProps = (state) => ({
  messages: selectMessages(state)
})

const ConnectedMessageList = connect(mapStateToProps, null)(MessageList)

export { ConnectedMessageList as MessageList }
