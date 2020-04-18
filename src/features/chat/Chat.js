import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

// Components
import { MessageList } from '../message'
import { InfoBar } from './InfoBar'
import { Compose } from './Compose'

// Actions
import { addMessage } from '../message'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
`

function Chat({ addMessage }) {
  const [currentUsername, setCurrentUsername] = useState('Anon')
  const [oldUsername, setOldUsername] = useState('Anon')
  const [userCount, setUserCount] = useState(0)
  const socket = useRef()

  useEffect(() => {
    socket.current = new WebSocket('ws:localhost:3001')

    socket.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data)
      if (newMessage.type === 'userCountChange') {
        newMessage.type = 'incomingNotification'
        setUserCount(newMessage.userCount)
      }
      addMessage(newMessage)
    }

    return () => socket.current.close()
  }, [])

  const currentNameChange = (event) => setCurrentUsername(event.target.value)

  const changeCurrentUser = () => {
    if (oldUsername !== currentUsername) {
      const newMessage = {
        type: 'postNotification',
        content: `${oldUsername} changed their name to ${currentUsername}`,
        user: currentUsername
      }

      setOldUsername(currentUsername)
      socket.current.send(JSON.stringify(newMessage))
    }
  }

  const newMessage = (event) => {
    const newMessage = {
      type: 'postMessage',
      username: currentUsername,
      content: event.target.value
    }
    socket.current.send(JSON.stringify(newMessage))
  }

  return (
    <Layout>
      <InfoBar userCount={userCount} />
      <MessageList />
      <Compose
        currentUser={currentUsername}
        onUserChange={changeCurrentUser}
        newMessage={newMessage}
        changeName={currentNameChange}
      />
    </Layout>
  )
}

Chat.propTypes = {
  addMessage: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  addMessage: (message) => dispatch(addMessage(message))
})

const ConnectedChat = connect(null, mapDispatchToProps)(Chat)

export { ConnectedChat as Chat }
