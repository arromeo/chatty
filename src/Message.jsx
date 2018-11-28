import React, { Component } from 'react';

class Message extends Component 
{
  render() {
    const { type, content, username, color } = this.props.message;

    const userColor = { color: color }

    return ((type === 'incomingMessage')
      ? (
        <div className="message">
          <span className="message-username" style={ userColor }>{ username }</span>
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