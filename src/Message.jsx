import React, { Component } from 'react';

class Message extends Component 
{
  render() {
    const { type, content, username } = this.props.message;

    return ((type === 'incomingMessage')
      ? (
        <div className="message">
          <span className="message-username">{ username }</span>
          <span className="message-content">{ content }</span>
        </div>
      ) : (
        <div className="message">
          <span className="message system">{ content }</span>
        </div>
      )
    )
    
  }
}

export default Message;