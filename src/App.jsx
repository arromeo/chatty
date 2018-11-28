import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Header from './Header.jsx';
import messages from '../data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldUser: 'Bob',
      currentUser: {name: 'Bob'},
      userCount: 0,
      messages: []
    }
    this.socket = '';
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.currentNameChange = this.currentNameChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001');
    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      this.displayMessage(newMessage);
    }
  }

  currentNameChange(event) {
    this.setState({currentUser: {name: event.target.value}});
  }

  changeCurrentUser(event) {
    const oldName = this.state.oldUser;
    const newName = this.state.currentUser.name;
    this.setState({currentUser: {name: newName}});

    const newMessage = {type: 'postNotification', content: `${oldName} changed their name to ${newName}`};

    this.setState({oldName: this.state.currentUser.name});
    this.socket.send(JSON.stringify(newMessage));
  }

  newMessage(event) {
    const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: event.target.value};
    this.socket.send(JSON.stringify(newMessage));
  }

  displayMessage(message) {
    let newMessage = {};
    if (message.type === 'incomingMessage') {
      newMessage = {type: 'incomingMessage', username: message.username, content: message.content, id: message.id};
    } else if (message.type === 'incomingNotification') {
      newMessage = {type: 'incomingNotification', content: message.content, id: message.id};
    } else {
      throw new Error('Unknown event type ' + message.type);
    }

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
          changeName={ this.currentNameChange }
          />
        </div>
      );
    }
  }

export default App;
