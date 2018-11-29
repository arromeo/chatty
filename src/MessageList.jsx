import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.chatRef = null;
    
    this.setChatRef = element => {
      this.chatRef = element;
    }
  }

  componentDidUpdate() {
    this.chatRef.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    const messages = this.props.messages.map((message) => {
      return (<Message key={ message.id } message={ message } />)
    });

    return (
      <main className="messages">
        { messages }
        <div ref={ this.setChatRef }></div>
      </main>
    );
  }
  
}

export default MessageList;