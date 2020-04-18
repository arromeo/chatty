import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MessageContainer = styled.div`
  display: flex;
  margin: 0.5rem 1rem;
`

const UserName = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${({ color }) => color || 'black'};
  width: 100px;
  margin-right: 1rem;
`

const UserMessage = styled.span``

const SystemMessage = styled.span`
  font-style: italic;
  margin-left: calc(100px + 1rem);
  color: gray;
`

export function Message({ message: { type, content, username, color } }) {
  return (
    <MessageContainer>
      {type === 'incomingNotification' ? (
        <SystemMessage>{content}</SystemMessage>
      ) : (
        <Fragment>
          <UserName color={color}>{username}</UserName>
          <UserMessage>{content}</UserMessage>
        </Fragment>
      )}
    </MessageContainer>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
    username: PropTypes.string,
    color: PropTypes.string
  })
}
