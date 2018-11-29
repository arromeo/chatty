import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.divRef = null;
    
    this.setDivRef = element => {
      this.divRef = element;
    };
  }

  // Keeps scroll at bottom of chat.
  // TODO: Figure out how to conditionally do this so the chat does not snap
  // to bottom when user is trying to view history.
  componentDidUpdate() {
    this.divRef.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    const messages = this.props.messages.map((message) => {
      return (<Message key={ message.id } message={ message } />)
    });

    return (
      <main  className="messages">
        { messages }
        <div ref={ this.setDivRef }></div>
      </main>
    );
  }
  
}

export default MessageList;