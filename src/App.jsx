import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Header from './Header.jsx';
import messages from '../data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    }
    this.socket = '';
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001');
    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      this.displayMessage(newMessage);
    }
  }

  changeCurrentUser(event) {
    const oldName = this.state.currentUser.name;
    const newName = event.target.value;
    this.setState({currentUser: {name: newName}});

    const newMessage = {type: 'incomingNotification', content: `${oldName} changed their name to ${newName}`};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }

  newMessage(event) {
    const newMessage = {type: 'incomingMessage', username: this.state.currentUser.name, content: event.target.value};
    this.socket.send(JSON.stringify(newMessage));
  }

  displayMessage(message) {
    const newMessage = {type: 'incomingMessage', username: message.username, content: message.content, id: message.id};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }

  render() {
      return (
        <div>
          <Header />
          <MessageList messages={ this.state.messages } />
          <ChatBar currentUser={ this.state.currentUser } 
          onUserChange={ this.changeCurrentUser }
          newMessage={ this.newMessage }
          />
        </div>
      );
    }
  }

export default App;
