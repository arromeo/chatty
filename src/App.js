import React, { Component } from 'react'
import ChatBar from './ChatBar'
import Header from './Header'

import { MessageList } from './features/message/MessageList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldUser: 'Anon',
      currentUser: { name: 'Anon' },
      userCount: 0,
      messages: []
    }
    this.socket = ''
    this.changeCurrentUser = this.changeCurrentUser.bind(this)
    this.newMessage = this.newMessage.bind(this)
    this.displayMessage = this.displayMessage.bind(this)
    this.currentNameChange = this.currentNameChange.bind(this)
  }

  // Once the main app component mounts, connect to the WS server
  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001')
    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data)
      this.displayMessage(newMessage)
    }
  }

  // Allows the controlled component to be altered.
  currentNameChange(event) {
    this.setState({ currentUser: { name: event.target.value } })
  }

  // Overwrites the previous name with the new name. Beofre it is submitted,
  // the oldUser is the user that displays on messages.
  changeCurrentUser() {
    const oldName = this.state.oldUser
    const newName = this.state.currentUser.name

    // This ensures that the name was actually changed. If the user hits
    // 'Enter' or blurs the username input without changing, this section
    // never happens.
    if (oldName !== newName) {
      const newMessage = {
        type: 'postNotification',
        content: `${oldName} changed their name to ${newName}`,
        user: newName
      }

      this.setState({ oldUser: newName })
      this.socket.send(JSON.stringify(newMessage))
    }
  }

  // Sends a new message to the server to be broadcast to other clients.
  newMessage(event) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: event.target.value
    }
    this.socket.send(JSON.stringify(newMessage))
  }

  // Takes in a message, determines what type of message it is to build the
  // proper object then adds the message to the state for display.
  displayMessage(message) {
    if (message.type === 'userCountChange') {
      message.type = 'incomingNotification'
      this.setState({ userCount: message.userCount })
    }

    const messages = this.state.messages.concat(message)
    this.setState({ messages: messages })
  }

  // Renders the main app and passes state to flow down to descendents.
  render() {
    return (
      <div>
        <Header userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          onUserChange={this.changeCurrentUser}
          newMessage={this.newMessage}
          changeName={this.currentNameChange}
        />
      </div>
    )
  }
}

export default App
