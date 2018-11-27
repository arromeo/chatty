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
      messages
    }

    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 8, "type": "incomingMessage", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
